import { collectDefaultMetrics, Counter, Registry } from "prom-client";

const registry = new Registry();
const requestCounter = new Counter({
  name: "generated_url",
  help: "Total number of generated URLs",
  registers: [registry],
  labelNames: ["short_key"],
});
collectDefaultMetrics({ register: registry });

export const appContext = {
  service: {
    requestCounter,
  },
  registry,
};
