import { FC, useEffect, useState } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import {
  Box,
  Container,
  Divider,
  Image,
  Space,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { isMobile } from "react-device-detect";

import { useFetchLeaderboard, useFetchPlayer } from "../hooks";
import { Loading, Text, Title } from "../components";
import { PlayerStat } from "../types";
import { useViewportSize } from "@mantine/hooks";

export type LeaderboardProps = {};

export const Leaderboard: FC<LeaderboardProps> = (props) => {
  const { loading, player } = useFetchPlayer();
  const { fetch, loading: leaderboardLoading } = useFetchLeaderboard();
  const [leaderboard, setLeaderboard] = useState<Array<PlayerStat>>([]);
  const theme = useMantineTheme();
  const { width } = useViewportSize();

  let orientation: number;
  let isPortrait: boolean;

  if (typeof window !== "undefined") {
    orientation = window.innerWidth > window.innerHeight ? 90 : 0;
    isPortrait = orientation === 0;
  } else {
    isPortrait = false;
  }

  useEffect(() => {
    async function fetchLeaderboard() {
      const results = await fetch();
      setLeaderboard(results);
    }

    player && fetchLeaderboard();
  }, [player]);

  if (loading || leaderboardLoading) return <Loading />;

  if (leaderboard.length === 0) return <Text>No games recorded yet!</Text>;

  if (isMobile && isPortrait && width < 768)
    return (
      <>
        <Box
          sx={(theme) => ({
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          })}
        >
          <Text>Rotate your device to landscape view!</Text>
          <Space h={12} />
          <Image
            src="https://media.giphy.com/media/13aSSyJaI5NkTm/giphy.gif"
            alt="meme"
            radius="md"
          />
        </Box>
      </>
    );

  const sorted =
    leaderboard.length > 1
      ? leaderboard.slice().sort((a, b) => b.playerScore - a.playerScore)
      : leaderboard;

  return (
    <Container>
      <Title order={4}>Leaderboard</Title>
      <Divider />
      <Space h={12} />
      <Table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Games</th>
            <th>Won</th>
            <th>Lost</th>
            <th>Tied</th>
            <th>Scored</th>
            <th>Conceded</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((playerStats) => {
            const isUser = player?.id === playerStats.playerId;

            const playerName = isUser
              ? "You"
              : player?.friends.find(
                  (friend) => friend?.id === playerStats.playerId
                )?.nickname;

            return (
              <tr
                key={playerStats.playerId}
                style={{
                  backgroundColor: isUser ? theme.colors.blue[9] : "initial",
                  color: isUser ? theme.colors.blue[0] : "#f1f1f1",
                }}
              >
                <td>{playerName}</td>
                <td>{playerStats.gamesPlayed}</td>
                <td>{playerStats.gamesWon}</td>
                <td>{playerStats.gamesLost}</td>
                <td>{playerStats.gamesTied}</td>
                <td>{playerStats.goalsScored}</td>
                <td>{playerStats.goalsConceded}</td>
                <td>{playerStats.playerScore}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Leaderboard;

export const getServerSideProps = withPageAuthRequired();
