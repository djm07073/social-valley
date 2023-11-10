/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { IPNSCreateAndUpload } from '../filecoin/IPNSCreateAndUpload';
import useMakeProfile from '../hooks/useMakeProfile';
import { useEffect, useState } from 'react';
import { N } from 'ethers';
import lg_valley from '../assets/lg_valley.png';

import { createClient } from '@connect2ic/core';
import { defaultProviders } from '@connect2ic/core/providers';
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
  useConnect,
} from '@connect2ic/react';
import '@connect2ic/core/style.css';
interface ConnectWalletProps {
  setIcID: (icId: string) => void;
}

export default function ConnectWallet({ setIcID }: ConnectWalletProps) {
  const [name, setName] = useState<string>('');
  const [profile, setProfile] = useState<string>('');
  const { isLoading, makeProfile, chain, switchNetwork, isMakeProfile } =
    useMakeProfile();
  const navigate = useNavigate();
  // const { address, isConnected } = useAccount();
  const { isConnected, principal } = useConnect();

  const handleConnect = async () => {
    if (chain?.id !== 8453) {
      switchNetwork?.(8453);
    }
    // if (address) {
    //   const { nameBytesString, profileNameBytesString } =
    //     await IPNSCreateAndUpload(address);

    //   setName(nameBytesString);
    //   setProfile(profileNameBytesString);
    // }
  };

  useEffect(() => {
    if (isConnected) navigate('/profile');
  }, []);

  const StyledButtonHexagon = css`
    width: 245px;
    height: 42px;
    text-align: center;
    padding: 10px 0px;
    background-color: #338a46;
    font-size: 14px;
    color: white;
    cursor: pointer;
    font-weight: 300;
  `;

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <img
        src={lg_valley}
        width={102}
        alt="valley"
        css={{ marginBottom: 78, marginTop: 100 }}
      />
      {/* {address ? (
        isLoading ? (
          <div> Loading...</div>
        ) : (
          <div
            onClick={async () => {
              await handleConnect();
              console.log('transaction');
              console.log(name);
              console.log(profile);
              makeProfile({ args: [name, profile] });
              if (isConnected && isMakeProfile) navigate('/profile');
            }}
            css={StyledButtonHexagon}
          >
            Make Profile
          </div>
        )
      ) : (
        // <div
        //   onClick={async () => {
        //     await open();
        //   }}
        //   css={StyledButtonHexagon}
        // >
        //   Connect Wallet
        // </div>
        <w3m-button />
      )} */}

      <div className="auth-section">
        <ConnectButton
          onConnect={() => {
            console.log('Connect Successful!');
            setIcID(principal);
            navigate('/profile');
          }}
        />
      </div>
      <ConnectDialog dark={false} />

      <div
        css={{
          position: 'relative',
          left: -112,
          bottom: 43,
          borderTop: '24px solid white',
          borderRight: '24px solid transparent',
        }}
      />

      <div
        css={{
          position: 'relative',
          right: -112,
          bottom: 67,
          borderTop: '24px solid white',
          borderLeft: '24px solid transparent',
        }}
      />
      <div
        css={{
          position: 'relative',
          left: -112,
          bottom: 69,
          borderBottom: '24px solid white',
          borderRight: '24px solid transparent',
        }}
      />
      <div
        css={{
          position: 'relative',
          right: -112,
          bottom: 93,
          borderBottom: '24px solid white',
          borderLeft: '24px solid transparent',
        }}
      />
    </div>
  );
}
