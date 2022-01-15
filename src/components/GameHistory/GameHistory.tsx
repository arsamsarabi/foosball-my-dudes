import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0";

import { Title } from "../Text";

export const GameHistory: FC = () => {
  const { user } = useUser();

  return (
    <>
      <Title order={2}>Game history</Title>
    </>
  );
};
