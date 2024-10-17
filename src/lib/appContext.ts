"use server";

import { collectDefaultMetrics, Counter, Registry } from "prom-client";

const initAppContext = () => {
  const registry = new Registry();
  collectDefaultMetrics({ register: registry });

  const requestCounter = new Counter({
    name: "generated_url",
    help: "Total number of generated URLs",
    registers: [registry], // Registering to your custom registry
  });

  return {
    service: {
      requestCounter,
    },
    registry,
  };
};
declare global {
  // eslint-disable-next-line no-var
  var appContextGlobal: ReturnType<typeof initAppContext> | undefined;
}

export const appContext = globalThis.appContextGlobal ?? initAppContext();
globalThis.appContextGlobal = appContext;
