import { NestFactory } from "@nestjs/core";
import { Logger, LoggerErrorInterceptor } from "nestjs-pino";
import { applyFormats, patchNestJsSwagger } from "nestjs-typebox";

import { _ApiModule } from "./_api/api.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function buildApiApplication() {
  patchNestJsSwagger();

  // provide custom JSON schema string format support
  // currently only "email".
  applyFormats();

  const app = await NestFactory.create(_ApiModule, { bufferLogs: true });
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.enableShutdownHooks();
  app.useLogger(app.get(Logger));
  app.flushLogs();
  (app as any).disable("x-powered-by");

  const config = new DocumentBuilder()
    .setTitle("Treblestreet API")
    .setDescription("Are you a creator with a computer? Here's the API.")
    .setVersion("0.1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  });
  SwaggerModule.setup("api", app, document, {
    jsonDocumentUrl: "/openapi.json",
    yamlDocumentUrl: "/openapi.yaml",
  });

  return { app, document };
}
