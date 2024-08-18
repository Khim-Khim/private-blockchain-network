FROM amd64/ubuntu:20.04

ADD ./geth /app/geth
ADD ./miner/testnet.json /app/genesis.json
ADD ./miner/config.toml /app/config.toml

RUN mkdir -p /app/keystore \
&& mkdir -p /app/data \
&& chmod 755 /app/geth

ARG password
ARG privatekey
RUN echo $password > /app/.accountpassword
RUN echo $privatekey > /app/.privatekey


WORKDIR "/app"

RUN /app/geth init /app/genesis.json
RUN /app/geth account import --password /app/.accountpassword  /app/.privatekey

ENV address=""
ENV bootnodeId=""
ENV bootnodeIp=""

CMD sh -c 'sleep 5; cd /app; ./geth --bootnodes "enode://$bootnodeId@$bootnodeIp:0?discport=30301" --config config.toml --mine --miner.gasprice "50000000000000" --miner.etherbase $address --unlock $address --password /app/.accountpassword'

EXPOSE 8545
