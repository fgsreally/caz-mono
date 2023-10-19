const path = require("path");
const { name, version } = require("./package.json");

module.exports = {
  name,
  version,
  metadata: {
    year: new Date().getFullYear(),
  },
  prompts: [
    {
      name: "name",
      type: "text",
      message: "Project name",
    },

    {
      name: "description",
      type: "text",
      message: "Project description",
      initial: "mono repo",
    },

    {
      name: "lib",
      type: "confirm",
      message: "Use lib mode",
      initial: false,
    },
    {
      name: "e2e",
      type: "confirm",
      message: "Add E2e",
      initial: false,
    },
    {
      name: "test",
      type: "confirm",
      message: "Add unit-test",
      initial: false,
    },
    {
      name: "docs",
      type: "confirm",
      message: "Add docs",
      initial: false,
    },
  ],
  init: true,
  filters: {},

  complete: async (ctx) => {
    console.clear();

    if (ctx.dest !== process.cwd()) {
      console.log(`  $ cd ${path.relative(process.cwd(), ctx.dest)}`);
    }

    console.log("\nHappy hacking :)\n");
  },
};
