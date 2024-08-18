1. Stake from user wallet to contract with params is validator address (stake to validator)
```js
  const Contract = new ethers.Contract(contract_address, abi, _provider);
  let result = await Contract.connect(user).stake(validator2.address, {
    value: '50000000000000000000' // 50
  });
  await result.wait();
  console.log('stake', result.hash);
```
ex: 0x7967919dbca5d511e8b3fae8329fd9d6a96746ec4f3cb4ca556c950473525633

2. 