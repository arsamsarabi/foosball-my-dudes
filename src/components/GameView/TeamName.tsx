import React, { FC } from "react";
import { Box, Text } from "@mantine/core";

import type { Player } from "../../types";
import { Title } from "../Text";

export type TeamNameProps = {
  team: Array<Player>;
  teamNumber: number;
};

export const TeamName: FC<TeamNameProps> = ({ team, teamNumber }) => {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.spacing.md,
      })}
    >
      <Title order={4}>Team {teamNumber}:</Title>
      <Text>{`(${team.length} player${team.length === 1 ? "" : "s"})`}</Text>
    </Box>
  );
};

export default TeamName;
