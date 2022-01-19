"use strict";

const sortAsc = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

const sortKey = (desc) =>
  `${desc.type}:${desc.name || "anonymous"}(${
    desc.inputs ? desc.inputs.map((i) => i.type).join(",") : ""
  })`;

const sortAscByKey = (getKey) => (a, b) => sortAsc(getKey(a), getKey(b));

const sortAbi = (abi) => abi.sort(sortAscByKey(sortKey));

module.exports = sortAbi;
