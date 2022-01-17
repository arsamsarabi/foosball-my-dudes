import { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { CgProfile } from "react-icons/cg";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import type { NextPage } from "next";
import Head from "next/head";

import { Profile, GameHistory, Leaderboard } from "../components";
import { useApolloClient, useQuery } from "@apollo/client";
import { FETCH_PLAYER_BY_ID } from "../gql";
import type { Player } from "../types";

const Home: NextPage = () => {
  const [player, setPlayer] = useState<Player>();
  const [playerLoading, setPlayerLoading] = useState<boolean>(true);
  const { user, error, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState(0);
  const client = useApolloClient();

  useEffect(() => {
    async function fetchPlayer() {
      const {
        data: { fetchPlayer },
        loading,
      } = await client.query({
        query: FETCH_PLAYER_BY_ID,
      });
      setPlayer(fetchPlayer);
      setPlayerLoading(loading);
    }
    if (user) {
      fetchPlayer();
    }
  }, [user, client]);

  if (isLoading || playerLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Foosball Dude</title>
        <meta name="description" content="Foosball Dude score keeper" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Tabs active={activeTab} onTabChange={setActiveTab}>
        <Tabs.Tab label="Profile" icon={<CgProfile size={24} />}>
          <Profile
            player={player}
            setPlayer={(newPlayer) => setPlayer(newPlayer as Player)}
          />
        </Tabs.Tab>
        <Tabs.Tab
          label="History"
          icon={<MdOutlineHistoryToggleOff size={24} />}
        >
          <GameHistory />
        </Tabs.Tab>
        <Tabs.Tab label="Leaderboard" icon={<AiOutlineOrderedList size={24} />}>
          <Leaderboard />
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default Home;

export const getServerSideProps = withPageAuthRequired();
