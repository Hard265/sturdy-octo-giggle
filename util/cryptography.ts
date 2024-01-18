import * as Crypto from "expo-crypto";

export function generateMnemonic(): string {
  const strength = 128;
  const wordList: string[] = require("../assets/wordlist/english.json");
  const initialEntropy: Uint8Array = Crypto.getRandomBytes(strength / 8);

  return entropyToMnemonic(initialEntropy, wordList);
}

function entropyToMnemonic(entropy: Uint8Array, wordList: string[]): string {
  const entropyBits: string = bytesToBinary(Array.from(entropy));
  const checksumBits: Promise<string> = deriveChecksumBits(entropy);

  const bits: string = entropyBits + checksumBits;
  const chunks: RegExpMatchArray | null = bits.match(/(.{1,11})/g);

  if (chunks === null) {
    throw new Error("Invalid entropy");
  }

  const words: string[] = chunks.map((binary: string) => {
    const index: number = binaryToByte(binary);
    return wordList[index];
  });
  return words.join(" ");
}

function bytesToBinary(bytes: number[]): string {
  return bytes
    .map((x: number) => {
      return x.toString(2).padStart(8, "0");
    })
    .join("");
}

function binaryToByte(binary: string): number {
  return parseInt(binary, 2);
}

async function deriveChecksumBits(entropyBuffer: Uint8Array): Promise<string> {
  const hash: string = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    entropyBuffer.toString()
  );
  const hashBits: string = hexToBinary(hash);
  return hashBits.slice(0, entropyBuffer.length / 4);
}

function hexToBinary(hex: string): string {
  return BigInt("0x" + hex).toString(2);
}
