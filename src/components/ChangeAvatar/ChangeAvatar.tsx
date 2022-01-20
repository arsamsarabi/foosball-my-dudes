import React, { FC, useState } from "react";
import {
  Modal,
  Button,
  Group,
  LoadingOverlay,
  Image,
  UnstyledButton,
  Space,
  Box,
  ScrollArea,
} from "@mantine/core";
import { useApolloClient } from "@apollo/client";
import { MdOutlineCancel } from "react-icons/md";
import { BsCheck2All } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { useNotifications } from "@mantine/notifications";

import { UPDATE_PLAYER } from "../../gql";
import { usePlayerContext } from "../../context";
import { avatars } from "../../config";

export type ChangeAvatarProps = {
  open: boolean;
  toggle: () => void;
};

export const ChangeAvatar: FC<ChangeAvatarProps> = ({ open, toggle }) => {
  const { player, setPlayer } = usePlayerContext();
  const [value, setValue] = useState<string | null>(null);
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
          picture: value,
        },
      },
    });
    setLoading(false);
    setPlayer(updatePlayer);
    setValue("");
    toggle();
    notifications.showNotification({
      title: "Success!",
      message: "Oooo a new avatar! So handsome xXx",
      icon: <BsCheck2All />,
      color: "green",
      autoClose: 5000,
    });
  };

  const onCancel = () => {
    setValue("");
    toggle();
  };

  return (
    <Modal
      opened={open}
      onClose={toggle}
      title="Choose a new Avatar!"
      radius="sm"
    >
      <LoadingOverlay visible={loading} />
      <Box
        sx={(theme) => ({
          // position: "fixed",
        })}
      >
        <Group direction="row" align="center" position="apart">
          <Button
            onClick={onSubmit}
            leftIcon={<FiSave />}
            disabled={!value}
            variant="filled"
            color="green"
          >
            Save
          </Button>
          <Button
            onClick={onCancel}
            leftIcon={<MdOutlineCancel />}
            variant="light"
            color="red"
          >
            Nevermind
          </Button>
        </Group>
      </Box>
      <Space h={16} />
      <ScrollArea style={{ height: 400 }}>
        <Group direction="row" align="center" position="center">
          {avatars.map((avatar) => (
            <UnstyledButton key={avatar} onClick={() => setValue(avatar)}>
              <Image
                src={avatar}
                alt="App avatar"
                width={75}
                sx={(theme) => ({
                  border:
                    avatar === value ? `3px solid ${theme.colors.green[7]}` : 0,
                  borderRadius: avatar === value ? "16px" : 0,
                  overflow: "hidden",
                  transition: "0.3s all ease-in-out",
                  boxSizing: "content-box",
                })}
              />
            </UnstyledButton>
          ))}
        </Group>
      </ScrollArea>
    </Modal>
  );
};

export default ChangeAvatar;
