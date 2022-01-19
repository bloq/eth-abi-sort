#!/usr/bin/env node

"use strict";

const fs = require("fs");
const path = require("path");
const stringify = require("json-stable-stringify");

const sortAbi = require(".");

const [filename] = process.argv.slice(2);

const processAbi = (str) => stringify(sortAbi(JSON.parse(str)), { space: 2 });

function sortFile() {
  const filePath = path.resolve(filename);
  fs.writeFileSync(filePath, processAbi(fs.readFileSync(filePath, "utf8")));
}

function readAllFromStdIn(cb) {
  let input = "";
  process.stdin.setEncoding("utf-8");
  process.stdin
    .on("data", function (chunk) {
      input += chunk;
    })
    .on("end", function () {
      cb(null, input);
    })
    .on("error", function (err) {
      cb(err);
    });
  setTimeout(function () {
    if (!input) {
      cb(null);
    }
  }, 100);
}

function sortStdIn() {
  readAllFromStdIn(function (err, input) {
    if (err) {
      throw err;
    }
    if (!input) {
      console.error("Usage:");
      console.error("  abi-sort abi.json");
      console.error("  abi-sort < abi.json > sorted.json");
      process.exit(1);
    }
    process.stdout.write(processAbi(input));
  });
}

if (filename) {
  sortFile();
} else {
  sortStdIn();
}
