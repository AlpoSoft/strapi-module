import { fileURLToPath } from 'url';
import { defu } from 'defu';
import { resolve } from 'pathe';
import { defineNuxtModule, addPlugin, extendViteConfig } from '@nuxt/kit';

const module = defineNuxtModule({
  meta: {
    name: "@nuxtjs/strapi",
    configKey: "strapi",
    compatibility: {
      nuxt: "^3.0.0 || ^2.16.0",
      bridge: true
    }
  },
  defaults: {
    url: process.env.STRAPI_URL || "http://localhost:1337",
    prefix: "/api",
    version: "v4",
    cookie: {}
  },
  setup(options, nuxt) {
    if (!options.url) {
      throw new Error("Missing `STRAPI_URL` in `.env`");
    }
    nuxt.options.runtimeConfig.public.strapi = defu(nuxt.options.runtimeConfig.public.strapi, {
      url: options.url,
      prefix: options.prefix,
      version: options.version,
      cookie: options.cookie,
      token: options.token
    });
    nuxt.options.runtimeConfig.strapi = defu(nuxt.options.runtimeConfig.strapi, {
      url: options.url,
      prefix: options.prefix,
      version: options.version,
      cookie: options.cookie,
      token: options.token
    });
    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.build.transpile.push(runtimeDir);
    addPlugin(resolve(runtimeDir, "strapi.plugin"));
    nuxt.hook("autoImports:dirs", (dirs) => {
      dirs.push(resolve(runtimeDir, "composables"));
    });
    extendViteConfig((config) => {
      config.optimizeDeps = config.optimizeDeps || {};
      config.optimizeDeps.include = config.optimizeDeps.include || [];
      config.optimizeDeps.include.push("qs");
    });
  }
});

export { module as default };
