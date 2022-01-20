import React, { FC } from "react";
import { Box, Image, Space, Text } from "@mantine/core";

import type { Player } from "../../types";

export type PlayerCardProps = {
  player: Player;
};

export const PlayerCard: FC<PlayerCardProps> = ({ player }) => {
  return (
    <Box
      key={player.id}
      sx={(theme) => ({
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "136px",
        borderRadius: theme.radius.sm,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.sm,
      })}
    >
      <Image
        src={player.picture}
        alt={player.nickname}
        width={80}
        radius="sm"
      />
      <Space h={8} />
      <Text color="white" size="lg">
        {player.nickname}
      </Text>
    </Box>
  );
};

export default PlayerCard;
