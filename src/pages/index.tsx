import {
  Button,
  ButtonDropdown,
  Code,
  Input,
  Link,
  Page,
  Tabs,
  Text,
  Textarea,
  useTheme,
} from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const theme = useTheme();

  if (!session) {
    return (
      <Page>
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
            <Textarea placeholder="Biography" height={8} width="100%" />
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
