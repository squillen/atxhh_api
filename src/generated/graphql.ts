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
  restaurants?: Maybe<Restaurants>;
  restaurant?: Maybe<Restaurant>;
  currentUser?: Maybe<User>;
};


export type QueryRestaurantsArgs = {
  whatToGoFor?: Maybe<Array<GoFor>>;
  cuisines?: Maybe<Array<Cuisine>>;
  prices?: Maybe<Array<Scalars['String']>>;
  happyHourDays?: Maybe<Array<Scalars['String']>>;
  rating?: Maybe<Rating>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<RestaurantOrderByInput>;
};


export type QueryRestaurantArgs = {
  id: Scalars['ID'];
};


export type QueryCurrentUserArgs = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Restaurant;
  signup?: Maybe<AuthPayload>;
  updateRestaurant?: Maybe<UpdatePayload>;
  login?: Maybe<AuthPayload>;
  deleteRestaurant?: Maybe<DeletePayload>;
  deleteUser?: Maybe<DeletePayload>;
  vote?: Maybe<Vote>;
};


export type MutationCreateArgs = {
  name: Scalars['String'];
  image: Scalars['String'];
  url: Scalars['String'];
  rating: Rating;
  description: Scalars['String'];
  happyHourDays: Array<Scalars['String']>;
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  cuisine: Array<Cuisine>;
  price: Scalars['String'];
  whatToGoFor: Array<GoFor>;
  when: Scalars['String'];
  menu?: Maybe<Scalars['String']>;
  percentOffDrinks?: Maybe<Scalars['Int']>;
  percentOffFood?: Maybe<Scalars['Int']>;
  coordinates: CoordinatesInput;
  address: Scalars['String'];
  active: Scalars['Boolean'];
  warnings?: Maybe<WarningInput>;
};


export type MutationSignupArgs = {
  role?: Maybe<Role>;
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationUpdateRestaurantArgs = {
  id: Scalars['ID'];
  data: UpdateData;
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeleteRestaurantArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationVoteArgs = {
  restaurantID: Scalars['ID'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  cuisine: Array<Cuisine>;
  name: Scalars['String'];
  rating: Rating;
  warnings?: Maybe<Warning>;
  price: Scalars['String'];
  url: Scalars['String'];
  image: Scalars['String'];
  menu?: Maybe<Scalars['String']>;
  whatToGoFor: Array<GoFor>;
  when: Scalars['String'];
  description: Scalars['String'];
  happyHourDays: Array<Scalars['String']>;
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  percentOffDrinks?: Maybe<Scalars['Int']>;
  percentOffFood?: Maybe<Scalars['Int']>;
  coordinates: Coordinates;
  votes: Array<Vote>;
  address: Scalars['String'];
  active?: Maybe<Scalars['Boolean']>;
  createdBy?: Maybe<User>;
};

export type Restaurants = {
  __typename?: 'Restaurants';
  results?: Maybe<Array<Restaurant>>;
  count: Scalars['Int'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type DeletePayload = {
  __typename?: 'DeletePayload';
  success: Scalars['Boolean'];
};

export type UpdatePayload = {
  __typename?: 'UpdatePayload';
  success: Scalars['Boolean'];
  restaurant?: Maybe<Restaurant>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  role?: Maybe<Role>;
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
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type Warning = {
  __typename?: 'Warning';
  WRONG_TIMES?: Maybe<Scalars['Int']>;
  NO_LONGER_ACTIVE?: Maybe<Scalars['Int']>;
};

export type CoordinatesInput = {
  lat: Scalars['String'];
  lng: Scalars['String'];
};

export type WarningInput = {
  WRONG_TIMES?: Maybe<Scalars['Int']>;
  NO_LONGER_ACTIVE?: Maybe<Scalars['Int']>;
};

export type UpdateData = {
  cuisine?: Maybe<Array<Cuisine>>;
  name?: Maybe<Scalars['String']>;
  rating?: Maybe<Rating>;
  price?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  menu?: Maybe<Scalars['String']>;
  whatToGoFor?: Maybe<Array<GoFor>>;
  when?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  happyHourDays?: Maybe<Array<Scalars['String']>>;
  startTime?: Maybe<Scalars['String']>;
  endTime?: Maybe<Scalars['String']>;
  percentOffDrinks?: Maybe<Scalars['Int']>;
  percentOffFood?: Maybe<Scalars['Int']>;
  coordinates?: Maybe<CoordinatesInput>;
  address?: Maybe<Scalars['String']>;
  warnings?: Maybe<WarningInput>;
  active?: Maybe<Scalars['Boolean']>;
};

export type RestaurantOrderByInput = {
  description?: Maybe<Sort>;
  name?: Maybe<Sort>;
  url?: Maybe<Sort>;
  createdAt?: Maybe<Sort>;
};

export enum GoFor {
  Drinks = 'DRINKS',
  Food = 'FOOD'
}

export enum WarningEnum {
  WrongTimes = 'WRONG_TIMES',
  NoLongerActive = 'NO_LONGER_ACTIVE'
}

export enum Sort {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum Rating {
  One = 'ONE',
  Two = 'TWO',
  Three = 'THREE',
  Four = 'FOUR',
  Five = 'FIVE',
  Six = 'SIX',
  Seven = 'SEVEN',
  Eight = 'EIGHT',
  Nine = 'NINE',
  Ten = 'TEN',
  Na = 'NA'
}

export enum Cuisine {
  Japanese = 'JAPANESE',
  American = 'AMERICAN',
  Chinese = 'CHINESE',
  Indian = 'INDIAN',
  Mexican = 'MEXICAN',
  Italian = 'ITALIAN',
  SteakHouse = 'STEAK_HOUSE',
  Asian = 'ASIAN',
  Southern = 'SOUTHERN',
  Seafood = 'SEAFOOD'
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
  Boolean: ResolverTypeWrapper<any>;
  Restaurant: ResolverTypeWrapper<any>;
  Restaurants: ResolverTypeWrapper<any>;
  AuthPayload: ResolverTypeWrapper<any>;
  DeletePayload: ResolverTypeWrapper<any>;
  UpdatePayload: ResolverTypeWrapper<any>;
  User: ResolverTypeWrapper<any>;
  Subscription: ResolverTypeWrapper<{}>;
  Vote: ResolverTypeWrapper<any>;
  Coordinates: ResolverTypeWrapper<any>;
  Warning: ResolverTypeWrapper<any>;
  CoordinatesInput: ResolverTypeWrapper<any>;
  WarningInput: ResolverTypeWrapper<any>;
  UpdateData: ResolverTypeWrapper<any>;
  RestaurantOrderByInput: ResolverTypeWrapper<any>;
  GoFor: ResolverTypeWrapper<any>;
  WarningEnum: ResolverTypeWrapper<any>;
  Sort: ResolverTypeWrapper<any>;
  Role: ResolverTypeWrapper<any>;
  Rating: ResolverTypeWrapper<any>;
  Cuisine: ResolverTypeWrapper<any>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: any;
  Int: any;
  ID: any;
  Mutation: {};
  Boolean: any;
  Restaurant: any;
  Restaurants: any;
  AuthPayload: any;
  DeletePayload: any;
  UpdatePayload: any;
  User: any;
  Subscription: {};
  Vote: any;
  Coordinates: any;
  Warning: any;
  CoordinatesInput: any;
  WarningInput: any;
  UpdateData: any;
  RestaurantOrderByInput: any;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  restaurants?: Resolver<Maybe<ResolversTypes['Restaurants']>, ParentType, ContextType, RequireFields<QueryRestaurantsArgs, never>>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType, RequireFields<QueryRestaurantArgs, 'id'>>;
  currentUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryCurrentUserArgs, 'id'>>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  create?: Resolver<ResolversTypes['Restaurant'], ParentType, ContextType, RequireFields<MutationCreateArgs, 'name' | 'image' | 'url' | 'rating' | 'description' | 'happyHourDays' | 'startTime' | 'endTime' | 'cuisine' | 'price' | 'whatToGoFor' | 'when' | 'coordinates' | 'address' | 'active'>>;
  signup?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'email' | 'password' | 'name'>>;
  updateRestaurant?: Resolver<Maybe<ResolversTypes['UpdatePayload']>, ParentType, ContextType, RequireFields<MutationUpdateRestaurantArgs, 'id' | 'data'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  deleteRestaurant?: Resolver<Maybe<ResolversTypes['DeletePayload']>, ParentType, ContextType, RequireFields<MutationDeleteRestaurantArgs, 'id'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeletePayload']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  vote?: Resolver<Maybe<ResolversTypes['Vote']>, ParentType, ContextType, RequireFields<MutationVoteArgs, 'restaurantID'>>;
};

export type RestaurantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cuisine?: Resolver<Array<ResolversTypes['Cuisine']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes['Rating'], ParentType, ContextType>;
  warnings?: Resolver<Maybe<ResolversTypes['Warning']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  menu?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  whatToGoFor?: Resolver<Array<ResolversTypes['GoFor']>, ParentType, ContextType>;
  when?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  happyHourDays?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  percentOffDrinks?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  percentOffFood?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  coordinates?: Resolver<ResolversTypes['Coordinates'], ParentType, ContextType>;
  votes?: Resolver<Array<ResolversTypes['Vote']>, ParentType, ContextType>;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  active?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RestaurantsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Restaurants'] = ResolversParentTypes['Restaurants']> = {
  results?: Resolver<Maybe<Array<ResolversTypes['Restaurant']>>, ParentType, ContextType>;
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeletePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeletePayload'] = ResolversParentTypes['DeletePayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdatePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdatePayload'] = ResolversParentTypes['UpdatePayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  restaurant?: Resolver<Maybe<ResolversTypes['Restaurant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
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
  lat?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarningResolvers<ContextType = any, ParentType extends ResolversParentTypes['Warning'] = ResolversParentTypes['Warning']> = {
  WRONG_TIMES?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  NO_LONGER_ACTIVE?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Restaurants?: RestaurantsResolvers<ContextType>;
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  DeletePayload?: DeletePayloadResolvers<ContextType>;
  UpdatePayload?: UpdatePayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  Coordinates?: CoordinatesResolvers<ContextType>;
  Warning?: WarningResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
