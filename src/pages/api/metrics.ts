import { appContext } from "@/lib/appContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", appContext.registry.contentType);
  try {
    const metrics = await appContext.registry.metrics();
    res.status(200).send(metrics);
  } catch (err) {
    res.status(500).send(`Error collecting metrics: ${(err as Error).message}`);
  }
}
