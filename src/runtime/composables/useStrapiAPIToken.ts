import { useState, useRuntimeConfig } from '#app'

export const useStrapiAPIToken = () => {
  const config = useRuntimeConfig()

  const setToken = (value: string | null) => {
    useState<String>('strapi_api_token').value = value
  }

  const getToken = () => {
    const apiToken = useState<String>('strapi_api_token')
    return (apiToken && apiToken.value) ? apiToken.value : config.strapi.token
  }

  return {
    setToken,
    getToken
  }
}
