#!/usr/bin/env node
import { program } from "commander";
import { pushCommand } from "../src/commands/push.js";

program
  .name("envlock")
  .description("Secure your .env file into a single deployable key")
  .version("1.0.0");

program
  .command("push")
  .description("Upload .env and get back an ENVLOCK_KEY")
  .action(pushCommand);

program.parse();