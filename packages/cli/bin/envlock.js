#!/usr/bin/env node
import { program } from "commander";
import { pushCommand } from "../src/commands/push.js";
import { pullCommand } from "../src/commands/pull.js";

program
  .name("keydrop")
  .description("Turn your .env into one deployable key")
  .version("1.0.0");

program
  .command("push")
  .description("Upload .env and get back a KEYDROP_KEY")
  .action(pushCommand);

program
  .command("pull")
  .description("Retrieve your secrets using KEYDROP_KEY from .env")
  .action(pullCommand);

program.parse();