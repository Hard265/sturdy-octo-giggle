import * as Crypto from "expo-crypto";

export function generateMnemonic() {
  const strength = 128;
  const woldList = require("../assets/wordlist/english.json");
  const initialEntropy = Crypto.getRandomBytes(strength / 8);

  const mnemonic = entropyToMnemonic(initialEntropy, woldList);
}

function entropyToMnemonic(entropy, wordList) {
  const entropyBits = bytesToBinary(Array.from(entropy));
  const checksumBits = deriveChecksumBits(entropy);

  const bits = entropyBits + checksumBits;
  const chunks = bits.match(/(.{1,11})/g);

  const words = chunks.map((binary) => {
    const index = binaryToByte(binary);
    return wordList[index];
  });
  return words.join(" ");
}

function bytesToBinary(bytes) {
  return bytes
    .map((x) => {
      return x.toString(2).padStart(8, "0");
    })
    .join("");
}

function binaryToByte(binary) {
  return parseInt(binary, 2);
}

async function deriveChecksumBits(entropyBuffer) {
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    entropyBuffer.toString()
  );
  const hashBits = hexToBinary(hash);
  return hashBits.slice(0, entropyBuffer.length / 4);
}

function hexToBinary(hex) {
  return BigInt("0x" + hex).toString(2);
}
