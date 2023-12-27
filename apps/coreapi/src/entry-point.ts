import 'source-map-support/register';

import { run } from "cmd-ts";
import { ROOT_CLI } from "./_cli/index";

run(ROOT_CLI, process.argv.slice(2));
