import React, { FC } from "react";
import { Avatar, Button, Card, Container, Grid, Group } from "@mantine/core";
import { AiOutlinePlus } from "react-icons/ai";

import { Text } from "../Text";
import { Player } from "../../types";

export type PlayerFoundProps = {
  player: Player;
  addFriend: (id?: string) => void;
};

export const PlayerFound: FC<PlayerFoundProps> = ({ player, addFriend }) => {
  return (
    <Card shadow="md" padding="md" radius="md" withBorder>
      <Group>
        <Group>
          <Avatar
            src={String(player.picture)}
            alt={player.nickname}
            size={64}
          />
        </Group>
        <Group>
          <Text order={3}>{player.nickname}</Text>
        </Group>
        <Group>
          <Button
            variant="filled"
            leftIcon={<AiOutlinePlus />}
            size="sm"
            color="green"
            onClick={() => addFriend(player.id)}
          >
            Add
          </Button>
        </Group>
      </Group>
    </Card>
  );
};

export default PlayerFound;
