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

  let user_wallet = new Wallet(process.env.USER1_KEY);
  let user2_wallet = new Wallet(process.env.USER2_KEY);
  let validator1_wallet = new Wallet(process.env.VALIDATOR1_KEY);
  let validator2_wallet = new Wallet(process.env.VALIDATOR2_KEY);
  let validator3_wallet = new Wallet(process.env.VALIDATOR3_KEY);
  let validator4_wallet = new Wallet(process.env.VALIDATOR4_KEY);
  let validator5_wallet = new Wallet(process.env.VALIDATOR5_KEY);
  let new_validator_wallet = new Wallet(process.env.VALIDATOR_NEW_KEY);

  let validator_addr = process.env.VALIDATOR_ADDRESS;
  let proposal_addr = process.env.PROPOSAL_ADDRESS;

  const user = user_wallet.connect(_provider);
  const user2 = user2_wallet.connect(_provider);
  const validator1 = validator1_wallet.connect(_provider);
  const validator2 = validator2_wallet.connect(_provider);
  const validator3 = validator3_wallet.connect(_provider);
  const validator4 = validator4_wallet.connect(_provider);
  const validator5 = validator5_wallet.connect(_provider);
  const new_validator = new_validator_wallet.connect(_provider);

  const validator_contract = new ethers.Contract(validator_addr, validatorAbi, _provider);

  let abi_proposal = [
    "function createProposal(address dst, string calldata details) external returns (bool)",
    "function voteProposal(bytes32 id, bool auth) external onlyValidator returns (bool)",
    "function setUnpassed(address val) external onlyValidatorsContract returns (bool)"
  ]

  const proposal_contract = new ethers.Contract(proposal_addr, abi_proposal, _provider);

  // 1. createProposal
  // let createProposal = await proposal_contract.connect(new_validator).createProposal(new_validator.address, "test");
  // await createProposal.wait();
  // console.log('createProposal', createProposal);

 // 2.vote
 //  const id = "0x87db676cddb45b11a838e930576cc24f05669bba631a4aa2bff34cfb77fcc8ce"; //get from txn detail (log index 1)
 //  let voteProposal = await proposal_contract.connect(validator3).voteProposal(id, true);
 //  await voteProposal.wait();
 //  console.log('createProposal', voteProposal);

  // let result = await validator_contract.connect(new_validator).createOrEditValidator(new_validator.address, "null", "null", "null", "null","null");
  // console.log('createOrEditValidator', result);
  // await result.wait();
  // console.log('createOrEditValidator', result.hash);

  // 3. create
  // let result = await validator_contract.connect(new_validator).createOrEditValidator(new_validator.address, "null", "null", "null", "null","null");
  // console.log('createOrEditValidator', result);
  // await result.wait();
  // console.log('createOrEditValidator', result.hash);

  // 4.stake
  // let result2 = await validator_contract.connect(user2).stake(new_validator.address, {
  //   value: '50000000000000000000' // 50
  // });
  // await result2.wait();
  // console.log('stake', result2);

  // 5. check
  let result = await validator_contract.connect(new_validator).isActiveValidator(new_validator.address);
  console.log('isActiveValidator', result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
