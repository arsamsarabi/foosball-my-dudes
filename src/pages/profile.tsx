import { FC, useEffect, useState } from "react";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Container,
  Avatar,
  Space,
  ActionIcon,
  Group,
  useMantineTheme,
  UnstyledButton,
} from "@mantine/core";
import dayjs from "dayjs";
import { GrEdit } from "react-icons/gr";

import {
  Text,
  Title,
  EditNickname,
  Loading,
  ChangeAvatar,
} from "../components";
import { useFetchPlayer, useProfilePageData } from "../hooks";
import { usePlayerContext } from "../context";

export const Profile: FC = () => {
  const { user, isLoading, error } = useUser();
  const theme = useMantineTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  const { fetch } = useProfilePageData();
  const { player } = usePlayerContext();

  useEffect(() => {
    async function fetchData() {
      await fetch();
    }
  }, [user]);

  if (isLoading) return <Loading />;
  if (error) return "Error fetching user.";
  if (!user) return "User not found.";

  const lastSeen = user ? user["https://arsam.dev/last_seen"] : "Never";

  return (
    <>
      <Container>
        <Space h={24} />
        {player.picture ? (
          <UnstyledButton onClick={() => setAvatarModalOpen(true)}>
            <Avatar
              src={String(player.picture)}
              alt={player?.nickname}
              size={124}
            />
          </UnstyledButton>
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
        <Text
          variant="gradient"
          gradient={{
            from: theme.colors.primaryLight[0],
            to: theme.colors.accent[0],
            deg: 45,
          }}
        >
          {player?.tag}
        </Text>
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
      <ChangeAvatar
        open={avatarModalOpen}
        toggle={() => setAvatarModalOpen(!avatarModalOpen)}
      />
    </>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired();
