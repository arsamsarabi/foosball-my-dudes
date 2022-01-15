import { FC } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Container, Avatar, Space } from "@mantine/core";
import dayjs from "dayjs";

import { Text, Title } from "../Text";
import { Player } from "../../types";

type Props = {
  player?: Player;
};

export const Profile: FC<Props> = ({ player }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (!user) {
    return null;
  }

  // console.log(player);

  const { name, nickname, email, picture } = user || {};

  const displayName = nickname || name || email;
  const lastSeen = user["https://arsam.dev/last_seen"] || "Never";

  return (
    <Container>
      <Space h={24} />
      {picture && <Avatar src={picture} alt={String(displayName)} size={124} />}
      <Space h={24} />
      <Title order={2}>{displayName}</Title>
      <Text>{email}</Text>
      {lastSeen !== "Never" && (
        <Text>
          Last seen on:{" "}
          {dayjs(new Date(lastSeen as string)).format("DD-MMM-YYYY HH:MM")}
        </Text>
      )}
    </Container>
  );
};
