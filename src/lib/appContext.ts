import { collectDefaultMetrics, Counter, Registry } from "prom-client";

interface AppContext {
  service: {
    requestCounter: Counter;
  };
  registry: Registry;
}
let appContext: AppContext | null = null;

if (!appContext) {
  const registry = new Registry();

  // Collect default metrics
  collectDefaultMetrics({ register: registry });

  // Define your custom counter
  const requestCounter = new Counter({
    name: "generated_url",
    help: "Total number of generated URLs",
    registers: [registry],
    labelNames: ["short_key"],
  });

  appContext = {
    service: {
      requestCounter,
    },
    registry,
  };
}

export { appContext };
