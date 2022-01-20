import React, { FC, useState } from "react";
import { Modal, Button, Group, TextInput, LoadingOverlay } from "@mantine/core";
import { useApolloClient } from "@apollo/client";
import { GiBugleCall } from "react-icons/gi";
import { BsCheck2All } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { useNotifications } from "@mantine/notifications";

import { UPDATE_PLAYER } from "../../gql";
import { usePlayerContext } from "../../context";

export type EditNicknameProps = {
  open: boolean;
  toggle: () => void;
};

export const EditNickname: FC<EditNicknameProps> = ({ open, toggle }) => {
  const { player, setPlayer } = usePlayerContext();
  const [value, setValue] = useState(player?.nickname || "");
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const notifications = useNotifications();

  const onSubmit = async () => {
    setLoading(true);
    const {
      data: { updatePlayer },
    } = await client.mutate({
      mutation: UPDATE_PLAYER,
      variables: {
        input: {
          id: player?.id,
          nickname: value,
        },
      },
    });
    setLoading(false);
    setPlayer(updatePlayer);
    setValue("");
    notifications.showNotification({
      title: "Success!",
      message: "We've changed your nickname!",
      icon: <BsCheck2All />,
      color: "green",
      autoClose: 5000,
    });
    toggle();
  };

  return (
    <Modal
      opened={open}
      onClose={toggle}
      title="Edit player nickname"
      radius="sm"
    >
      <LoadingOverlay visible={loading} />
      <Group direction="column">
        <TextInput
          placeholder="What do we call you?"
          label="nickname"
          required
          onChange={(event) => {
            if (event.currentTarget.value.length <= 12) {
              setValue(event.currentTarget.value);
            }
          }}
          icon={<GiBugleCall />}
          radius="md"
          type="text"
          size="lg"
          value={value}
          autoFocus
        />
        <Button
          variant="outline"
          onClick={onSubmit}
          disabled={value.length < 3}
          radius="md"
          leftIcon={<FiSave />}
        >
          Submit
        </Button>
      </Group>
    </Modal>
  );
};

export default EditNickname;
