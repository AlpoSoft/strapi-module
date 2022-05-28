import * as _nuxt_schema from '@nuxt/schema';
import { CookieOptions } from 'nuxt/dist/app/composables/cookie';

interface ModuleOptions {
    /**
     * Strapi API URL
     * @default process.env.STRAPI_URL
     * @example 'http://localhost:1337'
     * @type string
     */
    url?: string;
    /**
    * Strapi Prefix
    * @default '/api'
    * @type string
    */
    prefix?: string;
    /**
     * Strapi Version
     * @default 'v4'
     * @type string
     * @example 'v3'
     */
    version?: 'v4' | 'v3';
    /**
     * Nuxt Cookie Options
     * @default {}
     * @type CookieOptions
    */
    cookie?: CookieOptions;
    /**
   * Strapi API Token
   * @default process.env.STRAPI_TOKEN
   * @type string
   */
    token?: string;
}
declare const _default: _nuxt_schema.NuxtModule<ModuleOptions>;

declare module '@nuxt/schema' {
    interface ConfigSchema {
        publicRuntimeConfig?: {
            strapi?: ModuleOptions;
        };
    }
}

export { ModuleOptions, _default as default };
