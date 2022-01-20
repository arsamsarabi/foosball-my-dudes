import { fallguys } from "fallguys-names";

import {
  AcceptFriendRequestInput,
  Player as PlayerType,
  RejectFriendRequestInput,
  UpdatePlayerInput,
} from "../../../generated/schema";
import { Player } from "./model";

type FetchPlayer = (args: { id: string }) => Promise<PlayerType>;
export const fetchPlayer: FetchPlayer = async ({ id }) => {
  return await Player.findById(id);
};

type FetchPlayerByEmail = (args: { email: string }) => Promise<PlayerType>;
export const fetchPlayerByEmail: FetchPlayerByEmail = async ({ email }) => {
  return await Player.findOne({ email })
    .populate("friends")
    .populate("friendRequests");
};

type CreatePlayer = (args: {
  nickname?: string;
  picture?: string;
  email: string;
}) => Promise<PlayerType>;
export const createPlayer: CreatePlayer = async ({
  nickname,
  picture,
  email,
}) => {
  const player = new Player();
  player.email = email;
  player.nickname = nickname;
  player.picture = picture;
  player.tag = fallguys();
  player.friends = [];
  player.friendRequests = [];
  return await player.save();
};

type UpdatePlayer = (args: {
  toUpdate: UpdatePlayerInput;
}) => Promise<PlayerType>;
export const updatePlayer: UpdatePlayer = async ({ toUpdate }) => {
  return await Player.findOneAndUpdate({ _id: toUpdate.id }, toUpdate, {
    new: true,
  })
    .populate("friends")
    .populate("friendRequests");
};

type SearchPlayersByTag = (args: { tag: string }) => Promise<PlayerType>;
export const searchPlayersByTag: SearchPlayersByTag = async ({ tag }) => {
  return await Player.findOne({ tag })
    .populate("friends")
    .populate("friendRequests");
};

type SendFriendRequest = (args: {
  myId: string;
  theirId: string;
}) => Promise<string>;
export const sendFriendRequest: SendFriendRequest = async ({
  myId,
  theirId,
}) => {
  try {
    const toUpdate = await Player.findOne({ _id: theirId });
    toUpdate.friendRequests.push(myId);
    await toUpdate.save();
    return "Ok";
  } catch (error) {
    console.log(error);
    return "Not Ok";
  }
};

type AcceptFriendRequest = (args: AcceptFriendRequestInput) => Promise<string>;
export const acceptFriendRequest: AcceptFriendRequest = async ({
  from,
  to,
}) => {
  try {
    const fromToUpdate = await Player.findOne({ _id: from.id });
    fromToUpdate.friends.push(to.id);
    await fromToUpdate.save();

    const toToUpdate = await Player.findOne({ _id: to.id });
    toToUpdate.friends.push(from.id);
    toToUpdate.friendRequests.remove(from.id);
    await toToUpdate.save();

    return "Ok";
  } catch (error) {
    console.log(error);
    return "Not Ok";
  }
};

type RejectFriendRequest = (args: RejectFriendRequestInput) => Promise<string>;
export const rejectFriendRequest: RejectFriendRequest = async ({
  from,
  to,
}) => {
  try {
    const toToUpdate = await Player.findOne({ _id: to.id });
    toToUpdate.friendRequests.remove(from.id);
    await toToUpdate.save();
    return "Ok";
  } catch (error) {
    console.log(error);
    return "Not Ok";
  }
};

export type PlayerProvider = {
  fetchPlayer: FetchPlayer;
  fetchPlayerByEmail: FetchPlayerByEmail;
  createPlayer: CreatePlayer;
  updatePlayer: UpdatePlayer;
  searchPlayersByTag: SearchPlayersByTag;
  sendFriendRequest: SendFriendRequest;
  acceptFriendRequest: AcceptFriendRequest;
  rejectFriendRequest: RejectFriendRequest;
};
