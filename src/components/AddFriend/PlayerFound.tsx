import React, { FC, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Collapse,
  Group,
  Image,
  LoadingOverlay,
  Space,
} from "@mantine/core";
import { AiOutlinePlus } from "react-icons/ai";
import { useNotifications } from "@mantine/notifications";
import { useApolloClient } from "@apollo/client";
import { BiMessageRoundedCheck } from "react-icons/bi";
import { BsCheck2All } from "react-icons/bs";
import { MdOutlineDangerous } from "react-icons/md";
import { FaRegHandshake } from "react-icons/fa";

import { Text } from "../Text";
import { SEND_FRIEND_REQUEST } from "../../gql";
import { usePlayerContext, useSearchPlayerContext } from "../../context";

export type PlayerFoundProps = {
  close: () => void;
};

export const PlayerFound: FC<PlayerFoundProps> = ({ close }) => {
  const { player } = usePlayerContext();
  const [loading, setLoading] = useState(false);
  const notifications = useNotifications();
  const client = useApolloClient();
  const { found, reset } = useSearchPlayerContext();
  const [memeOpen, setMemeOpen] = useState(false);
  const { picture, nickname, id, friendRequests } = found || {};

  const sendRequest = async () => {
    setLoading(true);
    const {
      data: { sendFriendRequest },
    } = await client.query({
      query: SEND_FRIEND_REQUEST,
      variables: { input: { myId: player?.id, theirId: id } },
    });
    client.resetStore();
    setLoading(false);
    if (sendFriendRequest === "Ok") {
      notifications.showNotification({
        title: "Success!",
        message: "You Friend request has been sent!",
        icon: <BsCheck2All />,
        color: "green",
        autoClose: 5000,
      });
      reset();
      close();
    } else {
      notifications.showNotification({
        title: "Oh no!",
        message: "You Friend request failed, try again!",
        icon: <MdOutlineDangerous />,
        color: "red",
        autoClose: 5000,
      });
    }
  };

  const acceptRequest = async () => {};

  const alreadySend = Boolean(
    friendRequests?.filter((p) => p?.id === player?.id).length
  );
  const alreadyReceived = Boolean(
    player?.friendRequests.filter((p) => p?.id === id).length
  );
  const selfAdd = Boolean(found?.id === player?.id);

  const SentButton = () => (
    <Button
      variant="filled"
      leftIcon={<BiMessageRoundedCheck />}
      size="sm"
      color="green"
      disabled={alreadySend}
    >
      Already sent
    </Button>
  );

  const ReceivedButton = () => (
    <Button
      variant="filled"
      leftIcon={<FaRegHandshake />}
      size="sm"
      color="green"
      onClick={acceptRequest}
    >
      Accept Request
    </Button>
  );

  const AddButton = () => (
    <Button
      variant="filled"
      leftIcon={<AiOutlinePlus />}
      size="sm"
      color="green"
      onClick={sendRequest}
    >
      Add
    </Button>
  );

  const SelfButton = () => (
    <Button
      variant="filled"
      leftIcon={!memeOpen ? <AiOutlinePlus /> : null}
      size="sm"
      color="green"
      onClick={() => setMemeOpen(!memeOpen)}
    >
      {!memeOpen ? "Okay!" : "(╯°□°）╯︵ ┻━┻"}
    </Button>
  );

  return (
    <>
      <LoadingOverlay visible={loading} />
      <Card shadow="md" padding="md" radius="md" withBorder>
        <Group>
          <Group>
            <Avatar src={String(picture)} alt={nickname} size={64} />
          </Group>
          <Group>
            <Text order={3}>{nickname}</Text>
          </Group>
          <Group>
            {alreadySend ? (
              <SentButton />
            ) : alreadyReceived ? (
              <ReceivedButton />
            ) : selfAdd ? (
              <SelfButton />
            ) : (
              <AddButton />
            )}
          </Group>
        </Group>
        <Collapse in={memeOpen}>
          <Space h={16} />
          <Image
            src="https://media.giphy.com/media/7nFmRxSw6AmyI/giphy.gif"
            alt="Add yourself as a friend"
          />
        </Collapse>
      </Card>
    </>
  );
};

export default PlayerFound;
