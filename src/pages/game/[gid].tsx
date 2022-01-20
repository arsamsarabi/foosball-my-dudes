import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Anchor, Breadcrumbs, Container, Space } from "@mantine/core";

import { Text, GameView, Loading } from "../../components";
import { usePlayerContext } from "../../context";
import { useFetchGame } from "../../hooks";
import { Game } from "../../types";

const Post: FC = () => {
  const router = useRouter();
  const { player } = usePlayerContext();
  const { loading, fetch } = useFetchGame();
  const [game, setGame] = useState<Game>();

  const { gid, from } = router.query;

  useEffect(() => {
    async function fetchGame() {
      const game = await fetch(String(gid));
      setGame(game);
    }

    fetchGame();
  }, [gid, player]);

  if (loading) return <Loading />;

  return (
    <Container>
      <Breadcrumbs>
        {from === "history" ? (
          <Link href="/history" passHref>
            <Anchor>History</Anchor>
          </Link>
        ) : (
          <Link href="/" passHref>
            <Anchor>{player?.nickname || "Profile"}</Anchor>
          </Link>
        )}

        <Text>Game</Text>
      </Breadcrumbs>
      <Space h={24} />
      {game && <GameView game={game} />}
      <Space h={12} />
    </Container>
  );
};

export default Post;
