import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  restaurants: Restaurants;
  restaurant?: Maybe<Restaurant>;
};


export type QueryRestaurantsArgs = {
  filter?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RestaurantOrderByInput>;
};


export type QueryRestaurantArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Restaurant;
  signup?: Maybe<AuthPayload>;
  login?: Maybe<AuthPayload>;
  vote?: Maybe<Vote>;
};


export type MutationCreateArgs = {
  name: Scalars['String'];
  image: Scalars['String'];
  url: Scalars['String'];
  description: Scalars['String'];
  happyHourDays: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  percentOffDrinks?: Maybe<Scalars['Int']>;
  percentOffFood?: Maybe<Scalars['Int']>;
  coordinates: Array<Scalars['String']>;
  address: Scalars['String'];
};


export type MutationSignupArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  restaurantID: Scalars['ID'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  image: Scalars['String'];
  description: Scalars['String'];
  happyHourDays: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  percentOffDrinks?: Maybe<Scalars['Int']>;
  percentOffFood?: Maybe<Scalars['Int']>;
  coordinates: Coordinates;
  votes: Array<Vote>;
  address: Scalars['String'];
  createdBy?: Maybe<User>;
};

export type Restaurants = {
  __typename?: 'Restaurants';
  restaurants: Array<Restaurant>;
  count: Scalars['Int'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  Role?: Maybe<Roles>;
  restaurants: Array<Restaurant>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newRestaurant?: Maybe<Restaurant>;
  newVote?: Maybe<Vote>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  restaurant: Restaurant;
  user: User;
};

export type Coordinates = {
  __typename?: 'Coordinates';
  lat?: Maybe<Scalars['String']>;
  lng?: Maybe<Scalars['String']>;
};

export type RestaurantOrderByInput = {
  description?: Maybe<Sort>;
  url?: Maybe<Sort>;
  createdAt?: Maybe<Sort>;
};

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Roles {
  User = 'USER',
  Admin = 'ADMIN'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

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
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

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
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<any>;
  Int: ResolverTypeWrapper<any>;
  ID: ResolverTypeWrapper<any>;
  Mutation: ResolverTypeWrapper<{}>;
  Restaurant: ResolverTypeWrapper<any>;
  Restaurants: ResolverTypeWrapper<any>;
  AuthPayload: ResolverTypeWrapper<any>;
  User: ResolverTypeWrapper<any>;
  Subscription: ResolverTypeWrapper<{}>;
  Vote: ResolverTypeWrapper<any>;
  Coordinates: ResolverTypeWrapper<any>;
  RestaurantOrderByInput: ResolverTypeWrapper<any>;
  Sort: ResolverTypeWrapper<any>;
  Roles: ResolverTypeWrapper<any>;
  Boolean: ResolverTypeWrapper<any>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: any;
  Int: any;
  ID: any;
  Mutation: {};
  Restaurant: any;
  Restaurants: any;
  AuthPayload: any;
  User: any;
  Subscription: {};
  Vote: any;
  Coordinates: any;
  RestaurantOrderByInput: any;
  Boolean: any;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  restaurants?: Resolver<ResolversTypes['Restaurants'], ParentType, ContextType, RequireFields<QueryRestaurantsArgs, never>>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType, RequireFields<QueryRestaurantArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  create?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationCreateArgs, 'name' | 'url' | 'description' | 'happyHourDays' | 'startTime' | 'endTime' | 'coordinates' | 'address'>>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password' | 'name'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<MutationVoteArgs, 'restaurantID'>>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  happyHourDays?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  percentOffDrinks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  percentOffFood?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  coordinates?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurants'] = ResolversParentTypes['Restaurants']> = {
  restaurants?: Resolver<Array<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  Role?: Resolver<Maybe<ResolversTypes['Roles']>, ParentType, ContextType>;
  restaurants?: Resolver<Array<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  newRestaurant?: SubscriptionResolver<Maybe<ResolversTypes['Restaurant']>, "newRestaurant", ParentType, ContextType>;
  newVote?: SubscriptionResolver<Maybe<ResolversTypes['Vote']>, "newVote", ParentType, ContextType>;
};

export type VoteResolvers<ContextType = any, ParentType extends ResolversParentTypes['Vote'] = ResolversParentTypes['Vote']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  restaurant?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CoordinatesResolvers<ContextType = any, ParentType extends ResolversParentTypes['Coordinates'] = ResolversParentTypes['Coordinates']> = {
  lat?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lng?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Restaurants?: RestaurantsResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
