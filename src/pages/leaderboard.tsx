import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FC } from "react";

export type LeaderboardProps = {};

export const Leaderboard: FC<LeaderboardProps> = (props) => {
  return (
    <>
      <h1>leaderboard</h1>
    </>
  );
};

export default Leaderboard;

export const getServerSideProps = withPageAuthRequired();
