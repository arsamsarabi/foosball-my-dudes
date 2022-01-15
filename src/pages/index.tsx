import { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { CgProfile } from "react-icons/cg";
import { MdOutlineHistoryToggleOff } from "react-icons/md";
import { AiOutlineOrderedList } from "react-icons/ai";
import type { NextPage } from "next";
import Head from "next/head";

import { Profile, GameHistory, Leaderboard } from "../components";
import { useMutation } from "@apollo/client";
import { FETCH_PLAYER_BY_ID, CREATE_PLAYER } from "../gql";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();
  const [activeTab, setActiveTab] = useState(0);

  const [fetchPlayer, { loading: fetchLoading, data: fetchData }] =
    useMutation(FETCH_PLAYER_BY_ID);

  const [createPlayer, { loading: createLoading, data: createData }] =
    useMutation(CREATE_PLAYER);

  useEffect(() => {
    async function fetchPlayerData() {
      if (user) {
        if (user["https://arsam.dev/player_id"]) {
          await fetchPlayer({
            variables: { input: { id: user["https://arsam.dev/player_id"] } },
          });
        } else {
          await createPlayer({
            variables: {
              input: { nickname: user.nickname || user.name || user.email },
            },
          });
        }
      }
    }
    fetchPlayerData();
  }, [user, fetchPlayer, createPlayer]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <Head>
        <title>Foosball Dude</title>
        <meta name="description" content="Foosball Dude score keeper" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <>
        <Tabs active={activeTab} onTabChange={setActiveTab}>
          <Tabs.Tab label="Profile" icon={<CgProfile size={24} />}>
            <Profile />
          </Tabs.Tab>
          <Tabs.Tab
            label="History"
            icon={<MdOutlineHistoryToggleOff size={24} />}
          >
            <GameHistory />
          </Tabs.Tab>
          <Tabs.Tab
            label="Leaderboard"
            icon={<AiOutlineOrderedList size={24} />}
          >
            <Leaderboard />
          </Tabs.Tab>
        </Tabs>
      </>
    </>
  );
};

export default Home;

export const getServerSideProps = withPageAuthRequired();
