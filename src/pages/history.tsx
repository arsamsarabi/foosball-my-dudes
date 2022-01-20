import { FC, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Box, Container, Space } from "@mantine/core";

import { GameView, Loading, Text, Title } from "../components";
import { usePlayerContext } from "../context";
import { useFetchMyGame, useFetchPlayer } from "../hooks";

export type HistoryProps = {};

export const History: FC<HistoryProps> = (props) => {
  const { loading, player } = useFetchPlayer();
  const { fetch, loading: gamesLoading } = useFetchMyGame();
  const { games } = usePlayerContext();

  useEffect(() => {
    async function fetchMyGames() {
      await fetch();
    }

    player && fetchMyGames();
  }, [player]);

  if (loading || gamesLoading) return <Loading />;

  return (
    <Container>
      <Title order={4}>Most recent games</Title>
      <Space h={24} />

      {games.length ? (
        games.map((game, index) => (
          <Box
            sx={(theme) => ({
              // marginBottom: index === games.length - 1 ? 0 : theme.spacing.md,
              marginBottom: theme.spacing.xl,
            })}
            key={game.id}
          >
            <GameView game={game} hasViewButton />
          </Box>
        ))
      ) : (
        <Text>No games recorded yet!</Text>
      )}
    </Container>
  );
};

export default History;

export const getServerSideProps = withPageAuthRequired();
