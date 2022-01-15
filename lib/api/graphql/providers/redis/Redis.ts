import { Client, Entity, Schema, Repository } from "redis-om";

import { Player as PlayerType } from "../../generated/schema";

const { REDIS_DB_URL, REDIS_DB_USER_NAME, REDIS_DB_USER_PASSWORD } =
  process.env;

const REDIS_URL = `redis://${REDIS_DB_USER_NAME}:${REDIS_DB_USER_PASSWORD}@${REDIS_DB_URL}`;

export const client = new Client();

export const connect = async () => {
  if (client.isOpen()) return;
  await client.open(REDIS_URL);
};

export async function createIndex<T extends Entity>(schema: Schema<T>) {
  await connect();

  const repository = new Repository(schema, client);
  await repository.createIndex();
}

interface Player extends PlayerType {}
class Player extends Entity {}

export const playerSchema = new Schema(
  Player,
  {
    nickname: { type: "string", textSearch: true },
    friends: { type: "array" },
    tag: { type: "string", textSearch: true },
    createdAt: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);
