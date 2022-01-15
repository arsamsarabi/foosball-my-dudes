import { initAuth0 } from "@auth0/nextjs-auth0";

export const { getSession } = initAuth0({
  baseURL: process.env.PUBLIC_URL,
  session: {
    cookie: {
      domain: process.env.TOP_LEVEL_DOMAIN,
    },
  },
});
