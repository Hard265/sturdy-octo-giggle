// import * as Crypto from "expo-crypto";
import { Buffer } from 'buffer';
import secp256k1 from 'secp256k1';
import crypto from 'react-native-crypto';

const MASTER_SECRET = Buffer.from('Bitcoin seed', 'utf-8');

/**
 * Generates an HD key pair from the given seed buffer.
 *
 * @param {Buffer} seedBuffer - The seed buffer used to derive the key pair
 * @return {void} 
 */
async function hdkeyFromSeed(seedBuffer) {
  const hmac = crypto.createHmac('sha512', MASTER_SECRET).update(seedBuffer).digest();
  const privateKey = hmac.slice(0, 32);
  const chainCode = hmac.slice(32);
  const publicKey = makePublicKey(privateKey);
}

/**
 * Generates a public key from a given private key using the secp256k1 algorithm.
 *
 * @param {type} privateKey - the private key used to generate the public key
 * @return {type} the hexadecimal representation of the generated public key
 */
function makePublicKey(privateKey) {
  return secp256k1.publicKeyCreate(privateKey, false).toString('hex');
}
