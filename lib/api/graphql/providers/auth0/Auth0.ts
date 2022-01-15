import { ManagementClient } from "auth0";

const client = new ManagementClient({
  domain: process.env.AUTH0_DOMAIN as string,
  clientId: process.env.AUTH0_FMD_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_FMD_CLIENT_SECRET as string,
  scope: [
    "read:users",
    "update:users",
    "read:users_app_metadata",
    "update:users_app_metadata",
    "create:users_app_metadata",
  ].join(" "),
});

export type UpdateUserAppMetadata = (args: {
  userId: string;
  metadata: { [key: string]: unknown };
}) => Promise<void>;

export const updateUserAppMetadata: UpdateUserAppMetadata = async ({
  userId,
  metadata,
}) => {
  await client.updateAppMetadata({ id: userId }, metadata);
};

export type GetUserAppMetadata = (args: {
  userId: string;
}) => Promise<{ [key: string]: unknown }>;

export const getUserAppMetadata: GetUserAppMetadata = async ({ userId }) => {
  const { app_metadata } = await client.getUser({ id: userId });
  return app_metadata || {};
};

export type Auth0 = {
  updateUserAppMetadata: UpdateUserAppMetadata;
  getUserAppMetadata: GetUserAppMetadata;
};
