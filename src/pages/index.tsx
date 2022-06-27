import { Button, Link, Page, Text } from "@geist-ui/core";
import { Github } from "@geist-ui/icons";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { getSession, signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <Page width={40}>
      <Page.Content>
        <Text h3>My Iota</Text>
        <Text type="secondary" mb={2}>
          <ul>
            <li>
              A minimalist solution for micro-blogging and habit tracking.
            </li>
            <li>
              Built by the creator of{" "}
              <Link href="https://joinpresage.com" target="_blank" color icon>
                joinpresage.com
              </Link>
              .
            </li>
          </ul>
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
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Home;
