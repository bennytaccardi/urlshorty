import { collectDefaultMetrics, Counter, Registry } from "prom-client";

const registry = new Registry();

collectDefaultMetrics({ register: registry });

const requestCounter = new Counter({
  name: "generated_url",
  help: "Total number of generated URLs",
  registers: [registry],
  labelNames: ["short_key"],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  requestCounter.labels("test").inc();
  res.setHeader("Content-Type", registry.contentType);
  res.send(await registry.metrics());
}
