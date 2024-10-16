import { collectDefaultMetrics, Counter, Registry } from "prom-client";

const registry = new Registry();
collectDefaultMetrics({ register: registry });

// Define a custom Counter metric for counting generated URLs
const requestCounter = new Counter({
  name: "generated_url",
  help: "Total number of generated URLs",
  registers: [registry], // Registering to your custom registry
});
requestCounter.inc(10);
// Exporting appContext with the requestCounter and registry for external use
export const appContext = {
  service: {
    requestCounter,
  },
  registry,
};
