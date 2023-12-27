import { MiddlewareConsumer, Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

import { MetaModule } from "./meta/meta.module";

@Module({
  imports: [
    (() => {
      // attempted debugging output; didn't help much
      const m = LoggerModule.forRootAsync({
        inject: [],
        useFactory: () => ({
          pinoHttp: {
            level: "info",
            name: "coreapi",
            redact: {
              remove: true,
              paths: [
                "req.headers.authorization",
                "req.headers.cookie",
                'req.headers["set-cookie"]',
                "res.headers.authorization",
                "res.headers.cookie",
                'res.headers["set-cookie"]',

                "req.body.password",

                'req.headers["sec-fetch-dest"]',
                'req.headers["sec-fetch-mode"]',
                'req.headers["sec-fetch-site"]',
                'req.headers["sec-fetch-user"]',

                "req.query",
                "req.url",
                "req.remotePort",
              ],
            },
          },
        }),
      });
      console.log(m);

      return m;
    })(),

    MetaModule,
  ],
  providers: [],
  controllers: [],
})
export class _ApiModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestLoggingMiddleware).forRoutes("*");
  }
}
