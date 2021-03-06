import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { IoIosLogIn } from "react-icons/io";
import Link from "next/link";
import { Container, Button, Box, Space, Image } from "@mantine/core";

import { routes } from "../config";
import { Loading } from "../components";

export const Home: FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  if (isLoading) return <Loading />;

  if (!user)
    return (
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50%",
          padding: 0 + theme.spacing.lg,
        })}
      >
        <Link href={routes.login} passHref>
          <Button
            color="blue"
            variant="filled"
            size="lg"
            leftIcon={<IoIosLogIn />}
          >
            Login
          </Button>
        </Link>
        <Space h={32} />
        <Image
          src="https://media.giphy.com/media/YpTY9LCVbHSWVezitp/giphy.gif"
          alt="meme"
          radius="md"
        />
      </Box>
    );

  router.push(routes.profile);
  return null;
};

export default Home;
