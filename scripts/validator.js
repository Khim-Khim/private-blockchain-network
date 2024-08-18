import { ethers, Wallet } from 'ethers';
import 'dotenv/config'

async function main() {
  const MAX_GAS_LIMIT = 2000000000;
  const options = {
    // gasPrice,
    gasLimit: MAX_GAS_LIMIT,
    nonce: 45,
  };

  const _provider = ethers.providers.getDefaultProvider(
    'http://54.255.212.178:8546',
    options,
  );


  let user_wallet = new Wallet('9f8e8caa15dae65c00813284733ac353537fe345998fd403b783a13f86be6a65');
  let user2_wallet = new Wallet('67079653e1d4da8dda14e9c6409407dac26dd5b99c437085eb266bee381d0d03');
  let validator2_wallet = new Wallet('e8b805a8cf9394ff77d37db3f05d0219e90b84d569ae0096d2e7d5ca8975c633');
  let new_validator_wallet = new Wallet('67a4e99a3dac5b3e4a9fd6d57fb0138b5a1c2246b847412b7fa93209343df731');
  let contract_address = "0x000000000000000000000000000000000000f000";

  const user = user_wallet.connect(_provider);
  const user2 = user2_wallet.connect(_provider);
  const validator2 = validator2_wallet.connect(_provider);
  const new_validator = new_validator_wallet.connect(_provider);

  let abi = [
    "function distributeBlockReward() external payable",
    "function stake(address validator) external payable returns(bool)",
    "function getActiveValidators() public view returns (address[] memory)",
    "function withdrawProfits(address validator) external returns (bool)",
    "function getTotalStakeOfActiveValidators()",
    "function createOrEditValidator(address payable feeAddr, string calldata moniker, string calldata identity, string calldata website, string calldata email, string calldata details ) external onlyInitialized returns (bool)"
  ]

  const Contract = new ethers.Contract(contract_address, abi, _provider);


  let result = await Contract.connect(new_validator).createOrEditValidator(new_validator.address, "null", "null", "null", "null","null");
  console.log('createOrEditValidator', result);
  await result.wait();
  console.log('createOrEditValidator', result.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
