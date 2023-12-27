import { INestApplication } from "@nestjs/common";
import { command, boolean, flag } from "cmd-ts";

export const runCommand = command({
  name: "run",
  args: {
    runApi: flag({
      type: boolean,
      long: "run-api",
    }),
  },
  handler: async (args) => {
    const { runApi } = args;
    const apps: Array<INestApplication> = [];
    const runners: Array<Promise<any>> = [];

    if (runApi) {
      const { buildApiApplication } = await import("../main-api");
      const { app: apiApp } = await buildApiApplication();
      apps.push(apiApp);

      runners.push(apiApp.listen(5000));
    }

    if (apps.length === 0) {
      console.log("Nothing to run");
      return;
    }

    // catch signals and gracefully-ish terminate
    const signals = ["SIGINT", "SIGTERM"];
    for (const signal of signals) {
      process.on(signal, async () => {
        await Promise.all(apps.map((app) => app.close()));
        process.exit(0);
      });
    }

    await Promise.all(runners);
  },
});
