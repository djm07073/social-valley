// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;
import {SocialChainLeader} from "./SocialChainLeader.sol";
import {IFriend3V1} from "./friend3/IFriend3V1.sol";

contract BNB_SocialChainLeader is SocialChainLeader {
    struct AccountState {
        uint256 buyPrice;
        uint256 sellPrice;
        uint256 sharesSupply;
    }
    mapping(address => AccountState) public lastAccountUpdate;

    constructor(address _socialFi) SocialChainLeader(_socialFi) {}

    function _checkAccountChange(
        address account
    ) internal virtual override returns (bool isChanged) {
        uint256 _buyPrice = IFriend3V1(socialFi).getBuyPrice(account, 1);
        uint256 _sellPrice = IFriend3V1(socialFi).getSellPrice(account, 1);
        uint256 _sharesSupply = IFriend3V1(socialFi).ticketsSupply(account);

        isChanged =
            _buyPrice != lastAccountUpdate[account].buyPrice ||
            _sellPrice != lastAccountUpdate[account].sellPrice ||
            _sharesSupply != lastAccountUpdate[account].sharesSupply;
        if (isChanged) {
            lastAccountUpdate[account].buyPrice = _buyPrice;
            lastAccountUpdate[account].sellPrice = _sellPrice;
            lastAccountUpdate[account].sharesSupply = _sharesSupply;
        }
    }
}
