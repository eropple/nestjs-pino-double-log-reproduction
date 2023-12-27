import { Module } from "@nestjs/common";
import { MetaController } from "./meta.controller";
import { LoggerModule } from "nestjs-pino";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [TerminusModule, LoggerModule, HttpModule],
  controllers: [MetaController],
  providers: [],
})
export class MetaModule {}
