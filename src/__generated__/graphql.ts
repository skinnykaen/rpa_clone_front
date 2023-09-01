/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Timestamp: { input: any; output: any; }
};

export type AbsoluteMediaHttp = {
  __typename?: 'AbsoluteMediaHttp';
  id: Scalars['ID']['output'];
  uri: Scalars['String']['output'];
  uri_absolute: Scalars['String']['output'];
};

export type CourseApiMediaCollectionHttp = {
  __typename?: 'CourseAPIMediaCollectionHttp';
  banner_image?: Maybe<AbsoluteMediaHttp>;
  course_image?: Maybe<MediaHttp>;
  course_video?: Maybe<MediaHttp>;
  id: Scalars['ID']['output'];
  image?: Maybe<ImageHttp>;
};

export type CourseHttp = {
  __typename?: 'CourseHttp';
  blocks_url: Scalars['String']['output'];
  course_id: Scalars['String']['output'];
  effort: Scalars['String']['output'];
  end: Scalars['Timestamp']['output'];
  enrollment_end: Scalars['Timestamp']['output'];
  enrollment_start: Scalars['Timestamp']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  invitation_only: Scalars['Boolean']['output'];
  media: CourseApiMediaCollectionHttp;
  mobile_available: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  number: Scalars['String']['output'];
  org: Scalars['String']['output'];
  overview?: Maybe<Scalars['String']['output']>;
  pacing: Scalars['String']['output'];
  short_description: Scalars['String']['output'];
  start: Scalars['Timestamp']['output'];
  start_display: Scalars['String']['output'];
  start_type: Scalars['String']['output'];
};

export type CoursesListHttp = {
  __typename?: 'CoursesListHttp';
  countRows: Scalars['Int']['output'];
  courses: Array<CourseHttp>;
};

export type ImageHttp = {
  __typename?: 'ImageHttp';
  id: Scalars['ID']['output'];
  large: Scalars['String']['output'];
  raw: Scalars['String']['output'];
  small: Scalars['String']['output'];
};

export type MediaHttp = {
  __typename?: 'MediaHttp';
  id: Scalars['ID']['output'];
  uri: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  ConfirmActivation: SignInResponse;
  CreateParentRel: Response;
  CreateProjectPage: ProjectPageHttp;
  CreateRobboGroup: RobboGroupHttp;
  CreateRobboGroupRel: Response;
  CreateRobboUnit: RobboUnitHttp;
  CreateRobboUnitRel: Response;
  CreateUser: UserHttp;
  DeleteParentRel: Response;
  DeleteProjectPage: Response;
  DeleteRobboGroup: Response;
  DeleteRobboGroupRel: Response;
  DeleteRobboUnit: Response;
  DeleteRobboUnitRel: Response;
  DeleteUser: Response;
  RefreshToken: SignInResponse;
  SearchUsersByEmail: UsersList;
  SetActivationByLink: Response;
  SetIsBanned: Response;
  SetUserIsActive: Response;
  SignIn: SignInResponse;
  SignUp: Response;
  UpdateProjectPage: ProjectPageHttp;
  UpdateRobboGroup: RobboGroupHttp;
  UpdateRobboUnit: RobboUnitHttp;
  UpdateUser: UserHttp;
};


export type MutationConfirmActivationArgs = {
  activationLink: Scalars['String']['input'];
};


export type MutationCreateParentRelArgs = {
  coreRelId: Scalars['ID']['input'];
  targetRelId: Scalars['ID']['input'];
};


export type MutationCreateRobboGroupArgs = {
  input: NewRobboGroup;
};


export type MutationCreateRobboGroupRelArgs = {
  coreRelId: Scalars['ID']['input'];
  targetRelId: Scalars['ID']['input'];
};


export type MutationCreateRobboUnitArgs = {
  input: NewRobboUnit;
};


export type MutationCreateRobboUnitRelArgs = {
  coreRelId: Scalars['ID']['input'];
  targetRelId: Scalars['ID']['input'];
};


export type MutationCreateUserArgs = {
  input: NewUser;
};


export type MutationDeleteParentRelArgs = {
  childId: Scalars['ID']['input'];
  parentId: Scalars['ID']['input'];
};


export type MutationDeleteProjectPageArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRobboGroupArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRobboGroupRelArgs = {
  robboGroupId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationDeleteRobboUnitArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteRobboUnitRelArgs = {
  robboUnitId: Scalars['ID']['input'];
  unitAdminId: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']['input'];
};


export type MutationSearchUsersByEmailArgs = {
  email: Scalars['String']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  roles: Array<Role>;
};


export type MutationSetActivationByLinkArgs = {
  activationByLink: Scalars['Boolean']['input'];
};


export type MutationSetIsBannedArgs = {
  isBanned: Scalars['Boolean']['input'];
  projectPageId: Scalars['ID']['input'];
};


export type MutationSetUserIsActiveArgs = {
  id: Scalars['ID']['input'];
  isActive: Scalars['Boolean']['input'];
};


export type MutationSignInArgs = {
  input: SignIn;
};


export type MutationSignUpArgs = {
  input: SignUp;
};


export type MutationUpdateProjectPageArgs = {
  input: UpdateProjectPage;
};


export type MutationUpdateRobboGroupArgs = {
  input: UpdateRobboGroup;
};


export type MutationUpdateRobboUnitArgs = {
  input: UpdateRobboUnit;
};


export type MutationUpdateUserArgs = {
  input: UpdateUser;
};

export type NewRobboGroup = {
  name: Scalars['String']['input'];
  robboUnitId: Scalars['ID']['input'];
};

export type NewRobboUnit = {
  city: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type NewUser = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  middlename?: InputMaybe<Scalars['String']['input']>;
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
  role: Role;
};

export type NewUserResponse = {
  __typename?: 'NewUserResponse';
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastname: Scalars['String']['output'];
  middlename: Scalars['String']['output'];
  role: Scalars['Int']['output'];
};

export type ProjectPageHttp = {
  __typename?: 'ProjectPageHttp';
  authorId: Scalars['ID']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  instruction: Scalars['String']['output'];
  isBanned: Scalars['Boolean']['output'];
  isShared: Scalars['Boolean']['output'];
  linkToScratch: Scalars['String']['output'];
  notes: Scalars['String']['output'];
  projectId: Scalars['ID']['output'];
  projectUpdatedAt: Scalars['Timestamp']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type ProjectPageHttpList = {
  __typename?: 'ProjectPageHttpList';
  countRows: Scalars['Int']['output'];
  projectPages: Array<ProjectPageHttp>;
};

export type Query = {
  __typename?: 'Query';
  GetAllProjectPagesByAccessToken: ProjectPageHttpList;
  GetAllProjectPagesByAuthorId: ProjectPageHttpList;
  GetAllRobboGroupByAccessToken: RobboGroupHttpList;
  GetAllRobboUnitByAccessToken: RobboUnitHttpList;
  GetAllUsers: UsersList;
  GetChildrenByParent: UsersList;
  GetCourseById: CourseHttp;
  GetCoursesByUser: CoursesListHttp;
  GetParentsByChild: UsersList;
  GetProjectPageById: ProjectPageHttp;
  GetRobboGroupById?: Maybe<RobboGroupHttp>;
  GetRobboGroupsByRobboUnitId: RobboGroupHttpList;
  GetRobboGroupsByUserId: RobboGroupHttpList;
  GetRobboUnitById?: Maybe<RobboUnitHttp>;
  GetRobboUnitsByUnitAdmin: RobboUnitHttpList;
  GetSettings: Settings;
  GetStudentsByRobboGroupId: UsersList;
  GetStudentsByRobboUnitId: UsersList;
  GetStudentsByTeacherId: UsersList;
  GetTeachersByRobboGroupId: UsersList;
  GetUnitAdminByRobboUnitId: UsersList;
  GetUserByAccessToken: UserHttp;
  GetUserById: UserHttp;
  Me: UserHttp;
};


export type QueryGetAllProjectPagesByAccessTokenArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllProjectPagesByAuthorIdArgs = {
  id: Scalars['ID']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllRobboGroupByAccessTokenArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllRobboUnitByAccessTokenArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllUsersArgs = {
  active: Scalars['Boolean']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  roles: Array<Role>;
};


export type QueryGetChildrenByParentArgs = {
  parentId: Scalars['ID']['input'];
};


export type QueryGetCourseByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetParentsByChildArgs = {
  childId: Scalars['ID']['input'];
};


export type QueryGetProjectPageByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRobboGroupByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRobboGroupsByRobboUnitIdArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  robboUnitId: Scalars['ID']['input'];
};


export type QueryGetRobboGroupsByUserIdArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryGetRobboUnitByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRobboUnitsByUnitAdminArgs = {
  unitAdminId: Scalars['ID']['input'];
};


export type QueryGetStudentsByRobboGroupIdArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  robboGroupId: Scalars['ID']['input'];
};


export type QueryGetStudentsByRobboUnitIdArgs = {
  robboUnitId: Scalars['ID']['input'];
};


export type QueryGetStudentsByTeacherIdArgs = {
  teacherId: Scalars['ID']['input'];
};


export type QueryGetTeachersByRobboGroupIdArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  robboGroupId: Scalars['ID']['input'];
};


export type QueryGetUnitAdminByRobboUnitIdArgs = {
  robboUnitId: Scalars['ID']['input'];
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type Response = {
  __typename?: 'Response';
  ok: Scalars['Boolean']['output'];
};

export type RobboGroupHttp = {
  __typename?: 'RobboGroupHttp';
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  robboUnit: RobboUnitHttp;
  updatedAt: Scalars['Timestamp']['output'];
};

export type RobboGroupHttpList = {
  __typename?: 'RobboGroupHttpList';
  countRows: Scalars['Int']['output'];
  robboGroups: Array<RobboGroupHttp>;
};

export type RobboUnitHttp = {
  __typename?: 'RobboUnitHttp';
  city: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['Timestamp']['output'];
};

export type RobboUnitHttpList = {
  __typename?: 'RobboUnitHttpList';
  countRows: Scalars['Int']['output'];
  robboUnits: Array<RobboUnitHttp>;
};

export enum Role {
  Anonymous = 'Anonymous',
  Parent = 'Parent',
  Student = 'Student',
  SuperAdmin = 'SuperAdmin',
  Teacher = 'Teacher',
  UnitAdmin = 'UnitAdmin'
}

export type Settings = {
  __typename?: 'Settings';
  activationByLink: Scalars['Boolean']['output'];
};

export type SignIn = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  accessToken: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
};

export type SignUp = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  middlename?: InputMaybe<Scalars['String']['input']>;
  nickname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdateProjectPage = {
  id: Scalars['ID']['input'];
  instruction: Scalars['String']['input'];
  isShared: Scalars['Boolean']['input'];
  notes: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UpdateRobboGroup = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateRobboUnit = {
  city: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type UpdateUser = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastname: Scalars['String']['input'];
  middlename: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
};

export type UserHttp = {
  __typename?: 'UserHttp';
  activationLink: Scalars['String']['output'];
  createdAt: Scalars['Timestamp']['output'];
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastname: Scalars['String']['output'];
  middlename: Scalars['String']['output'];
  nickname: Scalars['String']['output'];
  password: Scalars['String']['output'];
  role: Role;
  updatedAt: Scalars['Timestamp']['output'];
};

export type UsersList = {
  __typename?: 'UsersList';
  countRows: Scalars['Int']['output'];
  users: Array<UserHttp>;
};
