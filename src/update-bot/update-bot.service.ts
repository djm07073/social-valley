import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateBotService {
  eventListening() {
    console.log('ChainLeader Contract Event Listening');
    console.log('multicall');
    console.log('push to web3storage');
  }
}
