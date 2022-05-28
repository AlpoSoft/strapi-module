import { useRuntimeConfig } from "#app";
import { useStrapiClient } from "./useStrapiClient.mjs";
export const useStrapiGraphQL = () => {
  const client = useStrapiClient();
  const config = useRuntimeConfig();
  return (query) => {
    return client("/graphql", {
      method: "POST",
      body: { query },
      headers: {
        accept: "application/json"
      },
      baseURL: config.strapi.url
    });
  };
};
