import { NextApiRequest, NextApiResponse } from "next";

import {
  createIndex,
  playerSchema,
} from "../../../lib/api/graphql/providers/redis/Redis";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await createIndex(playerSchema);
  res.status(200).send("OK");
}
