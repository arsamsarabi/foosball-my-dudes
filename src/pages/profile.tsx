import { FC, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
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

import { Text, Title, EditNickname, Loading } from "../components";
import { useFetchPlayer } from "../hooks";

export const Profile: FC = () => {
  const { user, error, isLoading } = useUser();
  const { player, loading } = useFetchPlayer();
  const theme = useMantineTheme();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading || loading) return <Loading />;
  if (error || !player)
    return <div>{error?.message || "Player not found!"}</div>;
  if (!user) {
    return null;
  }

  const { picture } = user || {};

  const lastSeen = user["https://arsam.dev/last_seen"] || "Never";

  return (
    <>
      <Container>
        <Space h={24} />
        {picture || player.picture ? (
          <Avatar
            src={picture || player.picture}
            alt={player?.nickname}
            size={124}
          />
        ) : null}
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
      <EditNickname open={modalOpen} toggle={() => setModalOpen(!modalOpen)} />
    </>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired();
