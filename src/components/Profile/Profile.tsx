import { FC, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import {
  Container,
  Avatar,
  Space,
  ActionIcon,
  Group,
  useMantineTheme,
} from "@mantine/core";
import dayjs from "dayjs";
import { GrEdit } from "react-icons/gr";

import { Text, Title } from "../Text";
import { Player } from "../../types";
import { EditNickname } from "./EditNickname";

type Props = {
  player?: Player;
  setPlayer: (player: Partial<Player>) => void;
};

export const Profile: FC<Props> = ({ player, setPlayer }) => {
  const [modalOpne, setModalOpen] = useState(false);
  const { user } = useUser();
  const theme = useMantineTheme();
  if (!user) {
    return null;
  }

  console.log("user", user);
  console.log("player", player);
  console.log("theme", theme);

  const { picture } = user || {};

  const lastSeen = user["https://arsam.dev/last_seen"] || "Never";

  return (
    <>
      <Container>
        <Space h={24} />
        {picture && <Avatar src={picture} alt={player?.nickname} size={124} />}
        <Space h={24} />
        <Group>
          <Title order={2}>{player?.nickname}</Title>
          <ActionIcon
            variant="filled"
            color={theme.colors.primaryLight[0]}
            onClick={() => setModalOpen(true)}
          >
            <GrEdit />
          </ActionIcon>
        </Group>
        <Text>{player?.tag}</Text>
        <Space h={12} />
        <Text>
          Member since: {dayjs(player?.createdAt).format("DD-MMM-YYYY")}
        </Text>
        <Space h={4} />
        {lastSeen !== "Never" && (
          <Text>
            Last seen on:{" "}
            {dayjs(new Date(lastSeen as string)).format("DD-MMM-YYYY HH:MM")}
          </Text>
        )}
      </Container>
      <EditNickname
        nickname={String(player?.nickname)}
        open={modalOpne}
        toggle={() => setModalOpen(!modalOpne)}
        setPlayer={setPlayer}
      />
    </>
  );
};
