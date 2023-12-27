import { Controller, Get } from "@nestjs/common";
import { HttpEndpoint } from "nestjs-typebox";
import { Type } from "@sinclair/typebox";

import { PingDto } from "./ping.dto";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Controller("/meta")
export class MetaController {
  constructor(
    @InjectPinoLogger(MetaController.name) private readonly logger: PinoLogger,
  ) {}

  @HttpEndpoint({
    method: "GET",
    path: "/ping/:count",
    description: "Returns a greeting",
    summary: "Greeting",
    tags: ["meta"],
    responseCode: 200,
    validate: {
      request: [{ name: "count", type: "param", schema: Type.Integer() }],
      response: PingDto,
    },
    security: [],
  })
  ping(count: number): PingDto {
    this.logger.info({ count }, "Ping!");
    return { pong: Array.from({ length: count }, () => "Pong!") };
  }
}
