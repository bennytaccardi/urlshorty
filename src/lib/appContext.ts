import { collectDefaultMetrics, Counter, Registry } from "prom-client";

const registry = new Registry();
collectDefaultMetrics({ register: registry });

const requestCounter = new Counter({
  name: "generated_url",
  help: "Total number of generated URLs",
  registers: [registry],
  labelNames: ["short_key"],
});
registry.registerMetric(requestCounter);
export const appContext = {
  service: {
    requestCounter,
  },
  registry,
};
