import React, { FC } from "react";
import {
  Box,
  Divider,
  Group,
  Image,
  MediaQuery,
  Space,
  useMantineTheme,
} from "@mantine/core";

import { Text } from "../Text";

import type { Player } from "../../types";
import { PlayerCard } from "./PlayerCard";
import TeamName from "./TeamName";

export type TeamCardProps = {
  team: Array<Player>;
  score: number;
  teamNumber: number;
  result: "win" | "lose" | "draw";
};

export const TeamCard: FC<TeamCardProps> = ({
  team,
  score,
  teamNumber,
  result,
}) => {
  const theme = useMantineTheme();

  const teamColor =
    teamNumber === 1 ? theme.colors.teamOne[0] : theme.colors.teamTwo[0];

  return (
    <MediaQuery
      largerThan="sm"
      styles={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={(theme) => ({
          padding: theme.spacing.md,
          borderRadius: theme.radius.sm,
          border: `2px dotted ${teamColor}`,
        })}
      >
        <TeamName team={team} teamNumber={teamNumber} />
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <Text align="center" size="xl">
            Score:
          </Text>
          <Text
            bold
            style={{
              fontSize: "40px",
              color: teamColor,
              marginTop: "-12px",
              marginLeft: "8px",
            }}
          >
            {score}
          </Text>
        </Box>
        <Space h={12} />
        <Box
          sx={(theme) => ({
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          })}
        >
          {team.map((player) => (
            <PlayerCard player={player} key={player.id} />
          ))}
        </Box>
      </Box>
    </MediaQuery>
  );
};
