import { useState, useRuntimeConfig } from "#app";
export const useStrapiAPIToken = () => {
  const config = useRuntimeConfig();
  const setToken = (value) => {
    useState("strapi_api_token").value = value;
  };
  const getToken = () => {
    const apiToken = useState("strapi_api_token");
    return apiToken && apiToken.value ? apiToken.value : config.strapi.token;
  };
  return {
    setToken,
    getToken
  };
};
