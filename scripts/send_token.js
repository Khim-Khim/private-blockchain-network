import { ethers, Wallet } from 'ethers';
import 'dotenv/config'

async function main() {
  console.log('send txn', (new Date()).toString());
  const MAX_GAS_LIMIT = 1000000000;
  const options = {
    // gasPrice,
    gasLimit: MAX_GAS_LIMIT,
    nonce: 45,
  };

  const _provider = ethers.providers.getDefaultProvider(
    process.env.RPC_URL,
    options,
  );


  let wallet1 = new Wallet(process.env.USER1_KEY);
  let wallet2 = new Wallet(process.env.USER2_KEY);

  const sender = wallet1.connect(_provider);
  const receiver = wallet2.connect(_provider);

  const tx1 = {
    from: sender.address,
    to: receiver.address,
    value: '0x1B1AE4D6E2EF500000',
    nonce: _provider.getTransactionCount(sender.address, "latest"),
  }

  let trans = await sender.sendTransaction(tx1);
  await trans.wait();
  console.log('txn_id', trans.hash)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

