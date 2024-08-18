import { ethers, Wallet } from 'ethers';
import { readFile } from 'fs/promises';
const validatorAbi = JSON.parse(
  await readFile(
    new URL('./abi/validator-abi.json', import.meta.url)
  )
);
import 'dotenv/config'

async function main() {
  const MAX_GAS_LIMIT = 2000000000;
  const options = {
    // gasPrice,
    gasLimit: MAX_GAS_LIMIT,
    nonce: 45,
  };

  const _provider = ethers.providers.getDefaultProvider(
    process.env.RPC_URL,
    options,
  );

  let signer = new Wallet(process.env.USER1_KEY);
  let contract_address = process.env.VALIDATOR_ADDRESS;

  const owner = signer.connect(_provider);

  const Contract = new ethers.Contract(contract_address, validatorAbi, _provider);

  let list_validator = await Contract.connect(owner).getActiveValidators();
  console.log("list_validator: ", list_validator);

  let top_validator = await Contract.connect(owner).getTopValidators();
  console.log("top_validator: ", top_validator);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
