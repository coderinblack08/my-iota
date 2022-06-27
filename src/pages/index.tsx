import {
  Button,
  ButtonDropdown,
  Code,
  Divider,
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
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const theme = useTheme();

  if (!session) {
    return (
      <Page width={40}>
        <Page.Content>
          <Text h3>My Iota</Text>
          <Text type="secondary" mb={2}>
            A minimalist solution for micro-blogging and habit tracking. <br />{" "}
            Built by the creator of{" "}
            <Link href="https://joinpresage.com" target="_blank" color icon>
              joinpresage.com
            </Link>
            .
          </Text>
          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            icon={<Github size={16} />}
            auto
          >
            Authenticate with GitHub
          </Button>
        </Page.Content>
      </Page>
    );
  }

  return (
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
          <ButtonDropdown.Item main>{session.user.name}</ButtonDropdown.Item>
          <ButtonDropdown.Item onClick={() => signOut()}>
            Sign Out
          </ButtonDropdown.Item>
        </ButtonDropdown>
      </div>
      <Tabs initialValue="1" mt={1.5}>
        <Tabs.Item label="Blog" value="1">
          <Textarea
            height={8}
            placeholder="What's on your mind?"
            // style={{ fontFamily: theme.font.mono }}
            width="100%"
          />
          <Button mt={1} type="success" w="100%">
            Create Iota
          </Button>
          <Text type="secondary" small style={{ display: "block" }} mt={1}>
            Use <Code>markdown</Code> to format your Iota. Keep them short!
          </Text>
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
            <Button type="success" w="100%">
              Update Profile
            </Button>
          </div>
        </Tabs.Item>
      </Tabs>
    </Page>
  );
};

export default Home;
