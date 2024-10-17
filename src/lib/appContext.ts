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
const globalContext = globalThis as unknown as {
  appContextGlobal?: ReturnType<typeof initAppContext>;
};

if (!globalContext.appContextGlobal) {
  globalContext.appContextGlobal = initAppContext();
}

export const appContext = globalContext.appContextGlobal;
