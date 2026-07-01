import 'dotenv/config';
import * as sphere from '@unicitylabs/sphere-sdk';

export function getDirectId() {
  const identity = sphere.identityFromMnemonicSync(
    process.env.SPHERE_MNEMONIC
  );

  const account = sphere.generateAddressFromMasterKey(
    identity.privateKey,
    0
  );

  return sphere.getAddressId(account.publicKey);
}

console.log(getDirectId());