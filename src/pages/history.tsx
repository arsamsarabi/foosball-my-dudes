import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { FC } from "react";

export type HistoryProps = {};

export const History: FC<HistoryProps> = (props) => {
  return (
    <>
      <h1>History</h1>
    </>
  );
};

export default History;

export const getServerSideProps = withPageAuthRequired();
