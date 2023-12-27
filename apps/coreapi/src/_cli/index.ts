import { subcommands } from "cmd-ts";
import { runCommand } from "./run";

const subs = [runCommand].sort((a, b) =>
a.name.localeCompare(b.name),
);;

export const ROOT_CLI = subcommands({
  name: "treblestreet-core",
  cmds: Object.fromEntries(subs.map((cmd) => [cmd.name, cmd])),
});
