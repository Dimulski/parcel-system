import { createSSRApp, createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

const isSSR = typeof window === "undefined"; // process.env.SSR

export default function buildApp() {
  const app = isSSR ? createSSRApp(App) : createApp(App);

  app.use(router);
  app.use(store);

  return { app, router, store };
}
