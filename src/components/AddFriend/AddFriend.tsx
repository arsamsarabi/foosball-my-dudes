import React, { FC, useState } from "react";
import {
  Modal,
  Button,
  Group,
  TextInput,
  LoadingOverlay,
  Space,
} from "@mantine/core";
import { GiBugleCall } from "react-icons/gi";
import { FiSave } from "react-icons/fi";

import { PlayerFound } from "./PlayerFound";
import { useSearchPlayerContext } from "../../context";

export type AddFriendProps = {
  open: boolean;
  toggle: () => void;
};

export const AddFriend: FC<AddFriendProps> = ({ open, toggle }) => {
  const [value, setValue] = useState("");
  const { found, reset, searchPlayerByTag, loading } = useSearchPlayerContext();

  const onSearch = async () => {
    await searchPlayerByTag(value);
  };

  return (
    <Modal
      opened={open}
      onClose={async () => {
        setValue("");
        reset();
        toggle();
      }}
      title="Find a player"
      radius="sm"
    >
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
      {found && (
        <>
          <Space h={12} />
          <PlayerFound close={toggle} />
        </>
      )}
    </Modal>
  );
};

export default AddFriend;
