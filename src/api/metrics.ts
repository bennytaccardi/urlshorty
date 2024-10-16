import { appContext } from "@/lib/appContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function handler(req: any, res: any) {
  res.setHeader("Content-Type", appContext.registry.contentType);
  res.send(await appContext.registry.metrics());
}
