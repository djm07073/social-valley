import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateBotService {
  eventListening() {
    //이 함수가 15분마다 돌아감
    // 1. ChainLeader Contract Event Listening 해서 계정 상태가 변한 유저의 address들을 받아옴.
    // 2. 받아온 유저들에 대해서 ChainLeader multicall해서 유저 정보 가져오기
    // 3. 가져온 유저정보를 web3 storage에 저장
    console.log('ChainLeader Contract Event Listening');
    console.log('multicall');
    console.log('push to web3storage');
  }
}
