import { DeepPartial } from 'utility-types';
import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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

export interface CreatePlayerInput {
  nickname: Scalars['String'];
}

export interface FetchPlayerByIdInput {
  id: Scalars['String'];
}

export interface Game {
  __typename?: 'Game';
  createdAt: Scalars['String'];
  teamOne: Array<Player>;
  teamOneScore: Scalars['Int'];
  teamTwo: Array<Player>;
  teamTwoScore: Scalars['Int'];
}

export interface Mutation {
  __typename?: 'Mutation';
  createPlayer?: Maybe<Player>;
  fetchPlayerById?: Maybe<Player>;
}


export interface MutationCreatePlayerArgs {
  input: CreatePlayerInput;
}


export interface MutationFetchPlayerByIdArgs {
  input: FetchPlayerByIdInput;
}

export interface Player {
  __typename?: 'Player';
  createdAt: Scalars['String'];
  friends: Array<Maybe<Player>>;
  nickname: Scalars['String'];
  tag: Scalars['String'];
}

export interface Query {
  __typename?: 'Query';
  ping: Scalars['String'];
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
  Boolean: ResolverTypeWrapper<DeepPartial<Scalars['Boolean']>>;
  CreatePlayerInput: ResolverTypeWrapper<DeepPartial<CreatePlayerInput>>;
  FetchPlayerByIdInput: ResolverTypeWrapper<DeepPartial<FetchPlayerByIdInput>>;
  Game: ResolverTypeWrapper<DeepPartial<Game>>;
  Int: ResolverTypeWrapper<DeepPartial<Scalars['Int']>>;
  Mutation: ResolverTypeWrapper<{}>;
  Player: ResolverTypeWrapper<DeepPartial<Player>>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<DeepPartial<Scalars['String']>>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: DeepPartial<Scalars['Boolean']>;
  CreatePlayerInput: DeepPartial<CreatePlayerInput>;
  FetchPlayerByIdInput: DeepPartial<FetchPlayerByIdInput>;
  Game: DeepPartial<Game>;
  Int: DeepPartial<Scalars['Int']>;
  Mutation: {};
  Player: DeepPartial<Player>;
  Query: {};
  String: DeepPartial<Scalars['String']>;
}>;

export type GameResolvers<ContextType = any, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  teamOne?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  teamOneScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  teamTwo?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  teamTwoScore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createPlayer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationCreatePlayerArgs, 'input'>>;
  fetchPlayerById?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationFetchPlayerByIdArgs, 'input'>>;
}>;

export type PlayerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friends?: Resolver<Array<Maybe<ResolversTypes['Player']>>, ParentType, ContextType>;
  nickname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tag?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  ping?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

