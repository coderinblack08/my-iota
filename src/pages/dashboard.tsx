import {
  Avatar,
  Button,
  ButtonDropdown,
  Card,
  Code,
  Fieldset,
  Input,
  Link,
  Page,
  Select,
  Snippet,
  Tabs,
  Text,
  Textarea,
  useTheme,
} from "@geist-ui/core";
import { Github, Instagram, Twitter } from "@geist-ui/icons";
import DOMPurify from "dompurify";
import { Field, Form, Formik } from "formik";
import { marked } from "marked";
import { GetServerSideProps, NextPage } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

const Dashboard: NextPage = () => {
  const { data: session } = useSession();
  const theme = useTheme();
  const utils = trpc.useContext();
  const createIota = trpc.useMutation(["iota.add"]);
  const { data: iotas } = trpc.useQuery(["iota.all"]);

  return (
    <>
      <Page width={40}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <div>
            <Text h3>My Content</Text>
            <Link color icon>
              View Page
            </Link>
          </div>
          <ButtonDropdown auto>
            <ButtonDropdown.Item main>{session?.user.name}</ButtonDropdown.Item>
            <ButtonDropdown.Item onClick={() => signOut()}>
              Sign Out
            </ButtonDropdown.Item>
          </ButtonDropdown>
        </div>
        <Tabs initialValue="1" mt={1.5}>
          <Tabs.Item label="Blog" value="1">
            <Formik
              initialValues={{ message: "" }}
              onSubmit={(values, { resetForm }) => {
                createIota.mutate(values, {
                  onSuccess: (data) => {
                    resetForm();
                    utils.setQueryData(["iota.all"], (old) => {
                      if (!old) return [];
                      if (old[0])
                        return [{ ...data, user: old[0].user }, ...old];
                      utils.refetchQueries(["iota.all"]);
                      return [];
                    });
                  },
                });
              }}
            >
              {() => (
                <Form>
                  <Field
                    name="message"
                    as={Textarea}
                    height={8}
                    placeholder="What's on your mind?"
                    // style={{ fontFamily: theme.font.mono }}
                    width="100%"
                  />
                  <Button htmlType="submit" mt={1} type="secondary" w="100%">
                    Create Iota
                  </Button>
                  <Text
                    type="secondary"
                    small
                    style={{ display: "block" }}
                    mt={1}
                  >
                    Use <Code>markdown</Code> to format your Iota. Keep them
                    short!
                  </Text>
                </Form>
              )}
            </Formik>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.layout.gap,
                marginTop: theme.layout.gap,
              }}
            >
              {iotas?.map((iota) => (
                <Card key={iota.id} hoverable>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Avatar src={iota.user.image ?? ""} mr={0.75} scale={1.5} />
                    <div style={{ width: "100%", marginTop: -2 }}>
                      <Text type="secondary" small>
                        {iota.user.name}
                      </Text>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: (() => {
                            const renderer = new marked.Renderer();
                            renderer.heading = (text, level) => {
                              const escapedText = text
                                .toLowerCase()
                                .replace(/[^\w]+/g, "-");
                              return (
                                "<h3><a name=" +
                                escapedText +
                                '" class="anchor" href="#' +
                                escapedText +
                                '"><span class="header-link"></span></a>' +
                                text +
                                "</h3>"
                              );
                            };
                            return DOMPurify.sanitize(
                              marked(iota.message, { renderer })
                            );
                          })(),
                        }}
                      />
                      {/* <pre
                        style={{
                          margin: 0,
                          padding: 0,
                          border: "none",
                          borderRadius: 0,
                        }}
                      >
                        <Text my={0}>{iota.message}</Text>
                      </pre> */}
                    </div>
                  </div>
                  <Card.Footer>
                    <Button auto scale={1 / 3} font="12px">
                      0 Likes
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </Tabs.Item>
          <Tabs.Item label="Profile" value="2">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: theme.layout.gapHalf,
              }}
            >
              <Input placeholder="Name" width="100%" />
              <Select placeholder="Choose one privacy setting">
                <Select.Option value="public">Public</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
              <Textarea placeholder="Biography" height={8} width="100%" />
              <Input
                placeholder="Twitter username"
                icon={<Twitter size={16} color={theme.palette.accents_4} />}
                width="100%"
              />
              <Input
                placeholder="GitHub username"
                icon={<Github size={16} color={theme.palette.accents_4} />}
                width="100%"
              />
              <Input
                placeholder="Instagram username"
                icon={<Instagram size={16} color={theme.palette.accents_4} />}
                width="100%"
              />
              <Fieldset>
                <Fieldset.Title>Headless API Access</Fieldset.Title>
                <Fieldset.Subtitle>
                  Use the access token with our API to access your iota content.
                  <Snippet text="yarn add iota-client" width="100%" mt={1} />
                  <Link icon color mt={1}>
                    View Documentation
                  </Link>
                  {/* <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: theme.layout.gap,
                  }}
                >
                  <Input.Password
                    w="100%"
                    placeholder="Generate a key first!"
                    disabled
                  />
                  <Button type="secondary" ml={1} scale={2 / 3}>
                    Generate Key
                  </Button>
                </div> */}
                </Fieldset.Subtitle>
                <Fieldset.Footer>Iota Client API</Fieldset.Footer>
              </Fieldset>
              <Button type="secondary" w="100%">
                Update Profile
              </Button>
            </div>
          </Tabs.Item>
        </Tabs>
      </Page>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Dashboard;
