import { DeepPartial } from 'utility-types';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
}

export interface AcceptFriendRequestInput {
  from: FriendRequestsPlayerInput;
  to: FriendRequestsPlayerInput;
}

export interface CreateGameInput {
  creator: Scalars['String'];
  teamOne: Array<Scalars['String']>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Scalars['String']>;
  teamTwoScore: Scalars['Int'];
}

export interface CreateNotificationInput {
  context: NotificationContext;
  from: Scalars['String'];
  notificationType: NotificationType;
  resourceId?: InputMaybe<Scalars['String']>;
  to: Scalars['String'];
}

export interface CreatePlayerInput {
  email: Scalars['String'];
  nickname: Scalars['String'];
  picture?: InputMaybe<Scalars['String']>;
}

export interface FetchGameInput {
  id: Scalars['String'];
}

export interface FetchLeaderboardInput {
  players: Array<Scalars['String']>;
}

export interface FetchMyGamesInput {
  limit: Scalars['Int'];
  playerId: Scalars['String'];
  skip: Scalars['Int'];
}

export interface FetchMyNotificationsInput {
  id: Scalars['String'];
  includeDone?: InputMaybe<Scalars['Boolean']>;
}

export interface FetchPlayerInput {
  id: Scalars['String'];
}

export interface FriendRequestsPlayerInput {
  friendRequests: Array<InputMaybe<Scalars['String']>>;
  friends: Array<InputMaybe<Scalars['String']>>;
  id: Scalars['String'];
}

export interface Game {
  __typename?: 'Game';
  createdAt: Scalars['String'];
  creator: Player;
  id?: Maybe<Scalars['String']>;
  teamOne: Array<Player>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Player>;
  teamTwoScore: Scalars['Int'];
  updatedAt: Scalars['String'];
}

export interface MarkNotificationAsDoneInput {
  id: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  acceptFriendRequest?: Maybe<Scalars['String']>;
  createGame?: Maybe<Game>;
  createNotification?: Maybe<Notification>;
  createPlayer?: Maybe<Player>;
  markNotificationAsDone?: Maybe<Notification>;
  rejectFriendRequest?: Maybe<Scalars['String']>;
  updatePlayer?: Maybe<Player>;
}


export interface MutationAcceptFriendRequestArgs {
  input: AcceptFriendRequestInput;
}


export interface MutationCreateGameArgs {
  input: CreateGameInput;
}


export interface MutationCreateNotificationArgs {
  input: CreateNotificationInput;
}


export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
}


export interface MutationMarkNotificationAsDoneArgs {
  input: MarkNotificationAsDoneInput;
}


export interface MutationRejectFriendRequestArgs {
  input: RejectFriendRequestInput;
}


export interface MutationUpdatePlayerArgs {
  input: UpdatePlayerInput;
}

export interface Notification {
  __typename?: 'Notification';
  context: NotificationContext;
  done?: Maybe<Scalars['Boolean']>;
  from: Player;
  id?: Maybe<Scalars['String']>;
  notificationType: NotificationType;
  resourceId?: Maybe<Scalars['String']>;
  to: Player;
}

export type NotificationContext =
  | 'Comment'
  | 'Game'
  | 'Player';

export type NotificationType =
  | 'COMMENT_RECEIVED'
  | 'FRIEND_REQUEST'
  | 'GAME_RECORDED';

export interface Player {
  __typename?: 'Player';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  friendRequests: Array<Maybe<Player>>;
  friends: Array<Maybe<Player>>;
  id?: Maybe<Scalars['String']>;
  nickname: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
  updatedAt: Scalars['String'];
}

export interface PlayerStat {
  __typename?: 'PlayerStat';
  gamesLost: Scalars['Int'];
  gamesPlayed: Scalars['Int'];
  gamesTied: Scalars['Int'];
  gamesWon: Scalars['Int'];
  goalsConceded: Scalars['Int'];
  goalsScored: Scalars['Int'];
  playerId: Scalars['String'];
  playerScore: Scalars['Int'];
}

export interface Query {
  __typename?: 'Query';
  fetchGame?: Maybe<Game>;
  fetchLeaderboard: Array<Maybe<PlayerStat>>;
  fetchMyGames: Array<Maybe<Game>>;
  fetchMyNotifications: Array<Maybe<Notification>>;
  fetchPlayer?: Maybe<Player>;
  fetchPlayerByEmail?: Maybe<Player>;
  ping: Scalars['String'];
  searchPlayersByTag?: Maybe<Player>;
  sendFriendRequest?: Maybe<Scalars['String']>;
}


export interface QueryFetchGameArgs {
  input: FetchGameInput;
}


export interface QueryFetchLeaderboardArgs {
  input: FetchLeaderboardInput;
}


export interface QueryFetchMyGamesArgs {
  input: FetchMyGamesInput;
}


export interface QueryFetchMyNotificationsArgs {
  input: FetchMyNotificationsInput;
}


export interface QueryFetchPlayerArgs {
  input: FetchPlayerInput;
}


export interface QuerySearchPlayersByTagArgs {
  input: SearchPlayersByTagInput;
}


export interface QuerySendFriendRequestArgs {
  input: SendFriendRequestInput;
}

export interface RejectFriendRequestInput {
  from: FriendRequestsPlayerInput;
  to: FriendRequestsPlayerInput;
}

export interface SearchPlayersByTagInput {
  tag: Scalars['String'];
}

export interface SendFriendRequestInput {
  myId: Scalars['String'];
  theirId: Scalars['String'];
}

export interface UpdatePlayerInput {
  friendRequests?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  friends?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  id: Scalars['String'];
  nickname?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  tag?: InputMaybe<Scalars['String']>;
}

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AcceptFriendRequestInput: ResolverTypeWrapper<DeepPartial<AcceptFriendRequestInput>>;
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  CreateGameInput: ResolverTypeWrapper<DeepPartial<CreateGameInput>>;
  CreateNotificationInput: ResolverTypeWrapper<DeepPartial<CreateNotificationInput>>;
  CreatePlayerInput: ResolverTypeWrapper<DeepPartial<CreatePlayerInput>>;
  FetchGameInput: ResolverTypeWrapper<DeepPartial<FetchGameInput>>;
  FetchLeaderboardInput: ResolverTypeWrapper<DeepPartial<FetchLeaderboardInput>>;
  FetchMyGamesInput: ResolverTypeWrapper<DeepPartial<FetchMyGamesInput>>;
  FetchMyNotificationsInput: ResolverTypeWrapper<DeepPartial<FetchMyNotificationsInput>>;
  FetchPlayerInput: ResolverTypeWrapper<DeepPartial<FetchPlayerInput>>;
  FriendRequestsPlayerInput: ResolverTypeWrapper<DeepPartial<FriendRequestsPlayerInput>>;
  Game: ResolverTypeWrapper<DeepPartial<Game>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
  MarkNotificationAsDoneInput: ResolverTypeWrapper<DeepPartial<MarkNotificationAsDoneInput>>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<DeepPartial<Notification>>;
  NotificationContext: ResolverTypeWrapper<DeepPartial<NotificationContext>>;
  NotificationType: ResolverTypeWrapper<DeepPartial<NotificationType>>;
  Player: ResolverTypeWrapper<DeepPartial<Player>>;
  PlayerStat: ResolverTypeWrapper<DeepPartial<PlayerStat>>;
  Query: ResolverTypeWrapper<{}>;
  RejectFriendRequestInput: ResolverTypeWrapper<DeepPartial<RejectFriendRequestInput>>;
  SearchPlayersByTagInput: ResolverTypeWrapper<DeepPartial<SearchPlayersByTagInput>>;
  SendFriendRequestInput: ResolverTypeWrapper<DeepPartial<SendFriendRequestInput>>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
  UpdatePlayerInput: ResolverTypeWrapper<DeepPartial<UpdatePlayerInput>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AcceptFriendRequestInput: DeepPartial<AcceptFriendRequestInput>;
  Boolean: DeepPartial<Scalars['Boolean']>;
  CreateGameInput: DeepPartial<CreateGameInput>;
  CreateNotificationInput: DeepPartial<CreateNotificationInput>;
  CreatePlayerInput: DeepPartial<CreatePlayerInput>;
  FetchGameInput: DeepPartial<FetchGameInput>;
  FetchLeaderboardInput: DeepPartial<FetchLeaderboardInput>;
  FetchMyGamesInput: DeepPartial<FetchMyGamesInput>;
  FetchMyNotificationsInput: DeepPartial<FetchMyNotificationsInput>;
  FetchPlayerInput: DeepPartial<FetchPlayerInput>;
  FriendRequestsPlayerInput: DeepPartial<FriendRequestsPlayerInput>;
  Game: DeepPartial<Game>;
  Int: DeepPartial<Scalars['Int']>;
  MarkNotificationAsDoneInput: DeepPartial<MarkNotificationAsDoneInput>;
  Mutation: {};
  Notification: DeepPartial<Notification>;
  Player: DeepPartial<Player>;
  PlayerStat: DeepPartial<PlayerStat>;
  Query: {};
  RejectFriendRequestInput: DeepPartial<RejectFriendRequestInput>;
  SearchPlayersByTagInput: DeepPartial<SearchPlayersByTagInput>;
  SendFriendRequestInput: DeepPartial<SendFriendRequestInput>;
  String: DeepPartial<Scalars['String']>;
  UpdatePlayerInput: DeepPartial<UpdatePlayerInput>;
}>;

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  teamOne?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  teamOneScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  teamTwo?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  teamTwoScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  acceptFriendRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'input'>>;
  createGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationCreateGameArgs, 'input'>>;
  createNotification?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationCreateNotificationArgs, 'input'>>;
  createPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationCreatePlayerArgs, 'input'>>;
  markNotificationAsDone?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationMarkNotificationAsDoneArgs, 'input'>>;
  rejectFriendRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<MutationRejectFriendRequestArgs, 'input'>>;
  updatePlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationUpdatePlayerArgs, 'input'>>;
}>;

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = ResolversObject<{
  context?: Resolver<ResolversTypes['NotificationContext'], ParentType, ContextType>;
  done?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  from?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  notificationType?: Resolver<ResolversTypes['NotificationType'], ParentType, ContextType>;
  resourceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  to?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friendRequests?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  friends?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picture?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PlayerStatResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlayerStat'] = ResolversParentTypes['PlayerStat']> = ResolversObject<{
  gamesLost?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gamesPlayed?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gamesTied?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  gamesWon?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  goalsConceded?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  goalsScored?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  playerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  playerScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  fetchGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryFetchGameArgs, 'input'>>;
  fetchLeaderboard?: Resolver<Array<Maybe<ResolversTypes['PlayerStat']>>, ParentType, ContextType, RequireFields<QueryFetchLeaderboardArgs, 'input'>>;
  fetchMyGames?: Resolver<Array<Maybe<ResolversTypes['Game']>>, ParentType, ContextType, RequireFields<QueryFetchMyGamesArgs, 'input'>>;
  fetchMyNotifications?: Resolver<Array<Maybe<ResolversTypes['Notification']>>, ParentType, ContextType, RequireFields<QueryFetchMyNotificationsArgs, 'input'>>;
  fetchPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QueryFetchPlayerArgs, 'input'>>;
  fetchPlayerByEmail?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType>;
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchPlayersByTag?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<QuerySearchPlayersByTagArgs, 'input'>>;
  sendFriendRequest?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QuerySendFriendRequestArgs, 'input'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerStat?: PlayerStatResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

