import pino from "pino";

export const API_ROOT_LOGGER = pino({
  name: "coreapi",
  level: "info",
});
