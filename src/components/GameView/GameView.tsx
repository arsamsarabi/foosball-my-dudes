import React, { FC } from "react";
import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Image,
  MediaQuery,
  Space,
} from "@mantine/core";
import dayjs from "dayjs";
import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";

import { Text } from "../Text";
import type { Game } from "../../types";
import { TeamCard } from "./TeamCard";

export type GameViewProps = {
  game: Game;
  hasViewButton?: boolean;
};

export const GameView: FC<GameViewProps> = ({
  game,
  hasViewButton = false,
}) => {
  const {
    id,
    teamOne,
    teamTwo,
    teamOneScore,
    teamTwoScore,
    creator,
    createdAt,
  } = game;

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[7],
        padding: theme.spacing.md,
      })}
    >
      <Group>
        <Text>{`Recorded on ${dayjs(createdAt).format("DD MMM")} by ${
          creator.nickname
        }`}</Text>
      </Group>
      <Divider />
      <Space h={16} />
      <TeamCard
        team={teamOne}
        score={teamOneScore}
        teamNumber={1}
        result={
          teamOneScore > teamTwoScore
            ? "win"
              ? teamTwoScore > teamOneScore
                ? "lose"
                : "win"
              : "lose"
            : "draw"
        }
      />
      <Space h={16} />
      <TeamCard
        team={teamTwo}
        score={teamTwoScore}
        teamNumber={2}
        result={
          teamOneScore < teamTwoScore
            ? "win"
              ? teamTwoScore < teamOneScore
                ? "lose"
                : "win"
              : "lose"
            : "draw"
        }
      />
      {hasViewButton && (
        <>
          <Space h={16} />
          <Box
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            })}
          >
            <Link href={`/game/${id}?from=history`} passHref>
              <Button leftIcon={<MdOutlineArrowForward />}>Go to game</Button>
            </Link>
          </Box>
        </>
      )}
    </Box>
  );
};

export default GameView;
