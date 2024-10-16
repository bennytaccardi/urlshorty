// appContext.ts
import { collectDefaultMetrics, Counter, Registry } from "prom-client";

class AppContext {
  private static instance: AppContext;
  public service: {
    requestCounter: Counter;
  };
  public registry: Registry;

  private constructor() {
    this.registry = new Registry();

    // Collect default metrics
    collectDefaultMetrics({ register: this.registry });

    // Define the custom counter
    this.service = {
      requestCounter: new Counter({
        name: "generated_url",
        help: "Total number of generated URLs",
        registers: [this.registry],
        labelNames: ["short_key"],
      }),
    };
  }

  public static getInstance(): AppContext {
    if (!AppContext.instance) {
      AppContext.instance = new AppContext();
    }
    return AppContext.instance;
  }
}

export const appContext = AppContext.getInstance();
