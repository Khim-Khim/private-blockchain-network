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

CMD sh -c 'sleep 10; cd /app; ./geth --bootnodes "enode://$bootnodeId@$bootnodeIp:0?discport=30301" --config config.toml'

EXPOSE 8545
EXPOSE 8646
EXPOSE 30303
