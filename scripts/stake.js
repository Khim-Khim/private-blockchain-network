import {BigNumber, ethers, Wallet} from 'ethers';
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
    gasLimit: MAX_GAS_LIMIT,
    nonce: 45,
  };

  const _provider = ethers.providers.getDefaultProvider(
    process.env.RPC_URL,
    options,
  );


  let validator_wallet = new Wallet(process.env.VALIDATOR1_KEY);
  let user_wallet = new Wallet(process.env.USER1_KEY);
  let user2_wallet = new Wallet(process.env.USER2_KEY);
  let contract_address = process.env.VALIDATOR_ADDRESS;

  const validator = validator_wallet.connect(_provider);
  const user = user_wallet.connect(_provider);
  const user2 = user2_wallet.connect(_provider);

  const Contract = new ethers.Contract(contract_address, validatorAbi, _provider);
  // let result = await Contract.connect(user).stake(validator.address, {
  //   value: '50000000000000000000' // 50
  // });
  // await result.wait();
  // console.log('stake to', validator.address);
  // console.log('stake txn', result.hash);
  //
  // let result2 = await Contract.connect(user2).stake(validator.address, {
  //   value: '100000000000000000000' // 50
  // });
  // await result2.wait();

  let validatorInfo = await Contract.connect(validator).getValidatorInfo(validator.address);
  console.log('validatorInfo feeAddr', validatorInfo[0]);
  console.log('validatorInfo status', validatorInfo[1]);
  console.log('validatorInfo coins', BigNumber.from(validatorInfo[2]).toString());
  console.log('validatorInfo hbIncoming', BigNumber.from(validatorInfo[3]).toString());
  console.log('validatorInfo totalJailedHB', BigNumber.from(validatorInfo[4]).toString());
  console.log('validatorInfo lastWithdrawProfitsBlock', BigNumber.from(validatorInfo[5]).toString());
  console.log('validatorInfo stakers', validatorInfo[6]);

  // let getValidatorDescription = await Contract.connect(validator).getValidatorDescription(validator.address);
  // console.log('getValidatorDescription', getValidatorDescription);

  // let stakeInfo = await Contract.connect(user2).getStakingInfo(user.address, validator.address);
  // console.log('stakeInfo coins =', BigNumber.from(stakeInfo[0]).toString())
  // console.log('stakeInfo unstakeBlock =', BigNumber.from(stakeInfo[1]).toString())
  // console.log('stakeInfo index =', BigNumber.from(stakeInfo[2]).toString())

  // let getTotalStakeOfActiveValidators = await Contract.connect(user).getTotalStakeOfActiveValidators();
  // await getTotalStakeOfActiveValidators.wait();
  // console.log('getTotalStakeOfActiveValidators', getTotalStakeOfActiveValidators);

  // let distributeBlockReward = await Contract.connect(user).distributeBlockReward({
  //   value: '10000000000'
  // });
  // await distributeBlockReward.wait();
  // console.log('distributeBlockReward', distributeBlockReward);

//   let withdrawProfits = await Contract.connect(user2).withdrawProfits(validator.address);
//   await withdrawProfits.wait();
//   console.log('withdrawProfits', withdrawProfits);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
