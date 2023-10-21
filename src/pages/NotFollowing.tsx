/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import axios from "axios";
import { ParamToValley } from "../filecoin/ParamToValley";
import { CONFIG } from "../config/chainleader";
import { useContractRead } from "wagmi";

interface NotFollowingProps {
  groupId: string;
  checkChain: string;
}

export default function NotFollowing({
  groupId,
  checkChain,
}: NotFollowingProps) {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("groupId");
  const [valley_address, setValley_address] = useState<`0x${string}`>("0x");
  const { data: valley_reputation_data } = useContractRead({
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "getReputation",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    address: CONFIG.base.valley_profile as `0x${string}`,
    functionName: "getReputation",
    args: [valley_address],
  });

  const [vely, setVely] = useState(0);

  const handleMaskClick = async () => {
    // try {
    //   const response = await axios.get('/web3bio/getNextID');
    //   const responseData = response.data;
    //   if (responseData && responseData.next_id) {
    //     const { next_id } = responseData;
    //     getBioData(next_id);
    //     console.log(next_id);
    //   } else {
    //     console.error('서버 응답에 유효한 데이터가 없습니다.');
    //   }
    // } catch (error) {
    //   console.error('에러 발생:', error);
    // }
  };

  const handleStorage = async () => {
    console.log("Updating Profile");
    let checkChainNum: number = 0;
    if (checkChain === "MASK") {
      checkChainNum = 0;
    } else if (checkChain === "POST") {
      checkChainNum = 1;
    }
    const valley_address = await ParamToValley(checkChainNum, groupId);
    console.log("valley_address found!", valley_address);
    console.log("Updating Profile...");

    setValley_address(valley_address);
  };

  // const response = await axios.get(`https://api.web3.bio/profile/${nextId}`);

  // const getBioData = async (nextId: string) => {
  const getBioData = async () => {
    try {
      const response = await axios.get(
        "https://api.web3.bio/profile/0x0332a5c1b5b32d42be0fc5342c26c8e538701392e4405a430d2bfb16d89f366b0d"
      );
      const bioData = response.data;

      for (let i = 0; i < bioData.length; i++) {
        console.log(bioData[i].address);
        console.log(bioData[i].identity);
        console.log(bioData[i].platform);
        console.log(bioData[i].displayName);
      }
    } catch (error) {
      console.error("에러 발생:", error);
    }
  };

  const StyledButtonHexagon = css`
    margin-top: 10px;
    width: 236px;
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/assets/img_valley_2.png"}
        width={78}
        alt="valley_2"
        css={{ marginBottom: 15 }}
      />
      <div css={{ fontSize: 12, fontWeight: 400, marginBottom: 3 }}>
        {groupId}
      </div>
      <div
        css={{
          fontSize: 18,
          fontWeight: 500,
          marginBottom: 43,
          color: "#338A46",
        }}
      >
        {vely} vely
      </div>
      <div css={{ fontSize: 12, fontWeight: 300, marginBottom: 2 }}>
        Check this user
      </div>
      <div css={StyledButtonHexagon}>Web3 storage</div>
      <div onClick={getBioData} css={StyledButtonHexagon}>
        Mask network
      </div>
    </div>
  );
}
