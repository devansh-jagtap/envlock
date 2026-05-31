#!/usr/bin/env node
import { program } from "commander";
import { pushCommand } from "../src/commands/push.js";
import { pullCommand } from "../src/commands/pull.js";
import { loginCommand, logoutCommand } from "../src/commands/auth.js";

program
  .name("keydrop")
  .description("Turn your .env into one deployable key")
  .version("1.1.0");

program
  .command("login")
  .description("Login to KeyDrop")
  .action(loginCommand);

program
  .command("logout")
  .description("Logout from KeyDrop")
  .action(logoutCommand);

program
  .command("push")
  .description("Upload .env and get back a KEYDROP_KEY")
  .action(pushCommand);

program
  .command("pull")
  .description("Restore secrets from KEYDROP_KEY")
  .action(pullCommand);

program.parse();