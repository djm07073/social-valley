import { ethers } from 'ethers';
import { Injectable } from '@nestjs/common';
import { CONFIG } from 'src/config/chainleader';
import {
  Chainleader,
  Chainleader__factory,
  Multicall__factory,
} from 'src/typechain';
type State = {
  epoch: string;
  buyPrice: string;
  sellPrice: string;
  sharesSupply: string;
};

function splitAndFormatHexString(
  hexString: string,
  chunkSize: number,
): string[] {
  if (hexString.startsWith('0x')) {
    hexString = hexString.substring(2);
  }
  if (hexString.length % chunkSize !== 0) {
    throw new Error('Invalid chunkSize');
  }

  const result: string[] = [];
  for (let i = 0; i < hexString.length; i += chunkSize) {
    const chunk = hexString.substr(i, chunkSize);
    result.push('0x' + chunk);
  }

  return result;
}
@Injectable()
export class UpdateBotService {
  async eventListening() {
    const base_provider = new ethers.WebSocketProvider(
      `wss://base-mainnet.g.alchemy.com/v2/${process.env.BASE}`,
    );
    const arbi_provider = new ethers.WebSocketProvider(
      `wss://arb-mainnet.g.alchemy.com/v2/${process.env.ARBI}`,
    );
    const chainleader_base: Chainleader = Chainleader__factory.connect(
      CONFIG.base.chainLeader,
      base_provider,
    );

    const chainleader_arbi: Chainleader = Chainleader__factory.connect(
      CONFIG.arbitrum.chainLeader,
      arbi_provider,
    );
    const multicall_base = Multicall__factory.connect(
      CONFIG.base.multicall,
      base_provider,
    );
    const multicall_arbi = Multicall__factory.connect(
      CONFIG.arbitrum.multicall,
      arbi_provider,
    );

    //이 함수가 15분마다 돌아감
    const base_blocktime = await base_provider.getBlockNumber();
    // const base_blocktime = await base_provider.getBlockNumber();
    const arbi_blocktime = await arbi_provider.getBlockNumber();
    // 1. ChainLeader Contract Event Listening 해서 계정 상태가 변한 유저의 address들을 받아옴.
    const post_tech_events = await chainleader_arbi.queryFilter(
      chainleader_arbi.getEvent('ChangeAccount'),
      arbi_blocktime - 40 * 240,
      arbi_blocktime,
    );

    // const post_tech_accounts = splitAndFormatHexString(
    //   post_tech_events[0].args[2],
    //   64,
    // );
    // console.log(post_tech_accounts);
    const friend_tech_events = await chainleader_base.queryFilter(
      chainleader_base.getEvent('ChangeAccount'),
      base_blocktime - 40 * 300,
      base_blocktime,
    );
    const friend_tech_accounts = splitAndFormatHexString(
      friend_tech_events[0].args[2],
      64,
    );

    const base_epoch = friend_tech_events[0].topics[1];

    const chainleaderInterface = Chainleader__factory.createInterface();
    const multicall_base_data = [];
    friend_tech_accounts.map((item) => {
      const account = '0x' + item.substring(26);
      multicall_base_data.push({
        target: CONFIG.base.chainLeader,
        callData: chainleaderInterface.encodeFunctionData('lastAccountUpdate', [
          account,
        ]),
      });
    });

    const baseData =
      await multicall_base.aggregate.staticCall(multicall_base_data);
    const states: State[] = [];
    baseData.returnData.map((datas) => {
      const split_datas = splitAndFormatHexString(datas, 64);

      states.push({
        epoch: base_epoch,
        buyPrice: split_datas[0],
        sellPrice: split_datas[1],
        sharesSupply: split_datas[2],
      });
    });
    console.log('ipns에 올릴 정보:', states);
    const multicall_arbi_data = [];
    // post_tech_accounts.map((item) => {
    //   const account = '0x' + item.substring(26);
    //   multicall_arbi_data.push({
    //     target: CONFIG.arbitrum.chainLeader,
    //     callData: chainleaderInterface.encodeFunctionData('lastAccountUpdate', [
    //       account,
    //     ]),
    //   });
    // });
    const arbiData =
      await multicall_arbi.aggregate.staticCall(multicall_arbi_data);

    // 3. 가져온 유저정보를 web3 storage에 저장
  }
}
