import React, { FC, useState } from "react";
import {
  Modal,
  Button,
  Group,
  TextInput,
  LoadingOverlay,
  Space,
} from "@mantine/core";
import { useApolloClient } from "@apollo/client";
import { GiBugleCall } from "react-icons/gi";
import { BsCheck2All } from "react-icons/bs";
import { FiSave } from "react-icons/fi";
import { useNotifications } from "@mantine/notifications";

import { SEARCH_PLAYERS_BY_TAG } from "../../gql";
import { PlayerFound } from "./PlayerFound";
import { Player } from "../../types";

export type AddFriendModalProps = {
  open: boolean;
  toggle: () => void;
};

export const AddFriendModal: FC<AddFriendModalProps> = ({ open, toggle }) => {
  const [result, setResult] = useState<Player | null>(null);
  const [value, setValue] = useState("Secret Dreaming Superhero");
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();
  const notifications = useNotifications();

  const onSearch = async () => {
    setLoading(true);
    const {
      data: { searchPlayersByTag },
    } = await client.query({
      query: SEARCH_PLAYERS_BY_TAG,
      variables: { input: { tag: value } },
    });
    setLoading(false);

    setResult(searchPlayersByTag);
  };

  const onSubmit = async () => {
    setLoading(true);
    const {
      data: { searchPlayersByTag },
    } = await client.mutate({
      mutation: SEARCH_PLAYERS_BY_TAG,
      variables: { input: { tag: value } },
    });
    setLoading(false);
    setValue("");
    notifications.showNotification({
      title: "Success!",
      message: "You Friend request has been sent!",
      icon: <BsCheck2All />,
      color: "green",
      autoClose: 3000,
    });
    toggle();
  };

  return (
    <Modal opened={open} onClose={toggle} title="Find a player">
      <LoadingOverlay visible={loading} />
      <Group direction="column">
        <TextInput
          placeholder="Enter your friends tag"
          label="Tag name"
          required
          onChange={(event) => setValue(event.currentTarget.value)}
          icon={<GiBugleCall />}
          radius="md"
          type="text"
          size="lg"
          value={value}
        />
        <Button
          variant="outline"
          onClick={onSearch}
          disabled={value.length < 10}
          radius="md"
          leftIcon={<FiSave />}
        >
          Search
        </Button>
      </Group>
      {result && (
        <>
          <Space h={12} />

          <PlayerFound player={result} addPlayer={} />
        </>
      )}
    </Modal>
  );
};

export default AddFriendModal;
