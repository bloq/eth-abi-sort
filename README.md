# eth-abi-sort

Sort an Ethereum ABI definition for easier comparison

## Installation

```sh
npm install --global eth-abi-sort
```

## Usage

Sort ABI files in place:

```sh
abi-sort abi.json
```

Or pipe an ABI into the command and redirect the output to a new file:

```sh
abi-sort < abi.json > sorted.json
```

It can also be used programatically:

```js
const sortAbi = require("eth-sort-abi");
const abi = [
  // the ABI of a contract
];
const sortedAbi = sortAbi(abi);
```

## How it works

The tool will place the events first, then the functions. Each group is sorted by signature, ascending. The signature is computed as "name(type,...)".

## Motivation

When EVM contracts are compiled, the ABIs can be obtained.
But the order of the descriptors inside the ABI and the order of the properties cannot be guaranteed.
Depending on the contract code, compiler and versions used, the ABIs can be created with a different order.

To make comparisons easier, this tool can be used to deterministically sort ABIs.

## License

MIT
