import React, { FC, useState } from "react";
import {
  Modal,
  LoadingOverlay,
  Space,
  SelectItem,
  Button,
  Group,
} from "@mantine/core";
import { useApolloClient } from "@apollo/client";
import { MdOutlineCancel, MdOutlineDangerous } from "react-icons/md";
import { useNotifications } from "@mantine/notifications";

import { usePlayerContext } from "../../context";
import type { CreateGameInput } from "../../types";
import { Text } from "../Text";
import { FiSave } from "react-icons/fi";
import { RiGameLine } from "react-icons/ri";

import { TeamMultiSelect, TeamScore } from "../Form";
import { CREATE_GAME } from "../../gql";

export type NewGameProps = {
  open: boolean;
  toggle: () => void;
};

export const NewGame: FC<NewGameProps> = ({ open, toggle }) => {
  const { player } = usePlayerContext();
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const notifications = useNotifications();
  const initialState: CreateGameInput = {
    teamOne: [],
    teamTwo: [],
    teamOneScore: 0,
    teamTwoScore: 0,
    creator: "",
  };
  const [formState, setFormState] = useState<CreateGameInput>(initialState);

  const handleSubmit = async () => {
    setLoading(true);
    const {
      data: { createGame },
    } = await client.mutate({
      mutation: CREATE_GAME,
      variables: {
        input: {
          ...formState,
          creator: player?.id,
        },
      },
    });
    setLoading(false);
    toggle();
    if (createGame.id) {
      notifications.showNotification({
        title: "Success!",
        message: "You've recorded a new game!",
        icon: <RiGameLine />,
        color: "green",
        autoClose: 5000,
      });
    } else {
      notifications.showNotification({
        title: "Dang!",
        message: "Something went wrong, try again!",
        icon: <MdOutlineDangerous />,
        color: "red",
        autoClose: 5000,
      });
    }
  };

  const onCancel = () => {
    setFormState(initialState);
    toggle();
  };

  const data: Array<SelectItem> = player?.friends.map((f) => ({
    value: String(f?.id),
    label: f?.nickname,
    tag: f?.tag,
    picture: f?.picture,
  })) || [
    {
      value: "",
      label: "No friends found!",
      tag: ":(",
      disabled: true,
    },
  ];
  data.unshift({
    value: String(player?.id),
    label: player?.nickname,
    tag: "This is you!",
    picture: player?.picture,
  });

  return (
    <Modal opened={open} onClose={toggle} title="Record a new game" radius="sm">
      <LoadingOverlay visible={loading} />
      {player?.friends.length ? (
        <>
          <TeamMultiSelect
            data={data}
            teamNumber={1}
            onChange={(val: string[]) => {
              setFormState({
                ...formState,
                teamOne: val,
              });
            }}
            value={formState.teamOne}
            opponents={formState.teamTwo}
          />
          <Space h={24} />
          <TeamScore
            teamNumber={1}
            value={formState.teamOneScore}
            onChange={(val: number) => {
              setFormState({
                ...formState,
                teamOneScore: val,
              });
            }}
          />
          <Space h={24} />
          <TeamMultiSelect
            data={data}
            teamNumber={2}
            onChange={(val: string[]) => {
              setFormState({
                ...formState,
                teamTwo: val,
              });
            }}
            value={formState.teamTwo}
            opponents={formState.teamOne}
          />
          <Space h={24} />
          <TeamScore
            teamNumber={2}
            value={formState.teamTwoScore}
            onChange={(val: number) => {
              setFormState({
                ...formState,
                teamTwoScore: val,
              });
            }}
          />
          <Space h={24} />
          <Group align="row">
            <Button
              leftIcon={<FiSave />}
              loading={loading}
              color="green"
              variant="filled"
              onClick={handleSubmit}
              disabled={
                formState.teamOne.length === 0 || formState.teamTwo.length === 0
              }
            >
              Save
            </Button>
            <Button
              leftIcon={<MdOutlineCancel />}
              color="red"
              variant="light"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Group>
        </>
      ) : (
        <Text>But you don&apos;t have any friends ... :(</Text>
      )}
    </Modal>
  );
};

export default NewGame;
