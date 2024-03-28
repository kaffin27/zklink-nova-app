import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem,
  Avatar,
} from "@nextui-org/react";
import styled from "styled-components";

import {
  useAccount,
  useSwitchChain,
  useBalance,
  usePublicClient,
  useWalletClient,
} from "wagmi";
import BigNumber from "bignumber.js";
import { useQueryClient } from "@tanstack/react-query";
import { config } from "@/constants/networks";
import { NOVA_CHAIN_ID, WETH_CONTRACT } from "@/constants";
import { formatBalance } from "@/utils";
const wethIcon =
  "https://assets.coingecko.com/coins/images/2518/large/weth.png?169650333";
import ETHIcon from "@/assets/img/eth.svg";
import { BgBox } from "@/pages/Bridge";
import { SelectBox } from "@/components/Bridge";
import WETHAbi from "@/constants/abi/weth.json";
import { Hash, parseUnits, getContract } from "viem";
import toast from "react-hot-toast";
export default function Swap() {
  const resultModal = useDisclosure();
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState<"ETH" | "wETH">("ETH");
  const { address, chainId } = useAccount();
  const queryClient = useQueryClient();
  const inputRef1 = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const { switchChainAsync } = useSwitchChain();
  const publicClient = usePublicClient({ config, chainId });
  const { data: walletClient } = useWalletClient();
  const wethContract = useMemo(() => {
    if (!publicClient) return null;
    return getContract({
      address: WETH_CONTRACT as Hash,
      abi: WETHAbi,
      client: {
        public: publicClient,
        wallet: walletClient,
      },
    });
  }, [publicClient, walletClient]);

  const { data: nativeTokenBalance } = useBalance({
    config: config,
    address: address as `0x${string}`,
    chainId: NOVA_CHAIN_ID,
    token: undefined,
    query: { queryClient: queryClient },
  });

  const ethBalance = useMemo(() => {
    if (nativeTokenBalance) {
      return formatBalance(nativeTokenBalance?.value ?? 0n, 18);
    }
    return 0;
  }, [nativeTokenBalance]);

  const { data: wethBalanceData } = useBalance({
    config: config,
    address: address as `0x${string}`,
    chainId: NOVA_CHAIN_ID,
    token: WETH_CONTRACT as `0x${string}`,
    query: { queryClient: queryClient },
  });
  //   console.log("nativeBalance: ", nativeTokenBalance);
  const wethBalance = useMemo(() => {
    if (wethBalanceData) {
      return formatBalance(wethBalanceData?.value ?? 0n, 18);
    }
    return 0;
  }, [wethBalanceData]);

  const handleInputValue = (v: string) => {
    if (!v) {
      setAmount(v);
    } else if (/^[0-9]*\.?[0-9]*$/.test(v)) {
      setAmount(v);
    }
  };

  const invalidChain = useMemo(() => {
    return chainId !== NOVA_CHAIN_ID;
  }, [chainId]);

  const actionBtnDisabled = useMemo(() => {
    if (
      !nativeTokenBalance ||
      new BigNumber(nativeTokenBalance.toString()).eq(0)
    ) {
      return true;
    } else if (
      !invalidChain &&
      ((fromToken === "ETH" && ethBalance < Number(amount)) ||
        (fromToken === "wETH" && wethBalance < Number(amount)) ||
        Number(amount) <= 0)
    ) {
      return true;
    }
  }, [
    amount,
    ethBalance,
    fromToken,
    invalidChain,
    nativeTokenBalance,
    wethBalance,
  ]);

  const btnText = useMemo(() => {
    if (invalidChain) {
      return "Switch Network";
    }
    return "Continue";
  }, [invalidChain]);

  const handleAction = useCallback(async () => {
    if (!address || !nativeTokenBalance || !wethContract) return;
    if (invalidChain) {
      try {
        await switchChainAsync({ chainId: NOVA_CHAIN_ID });
        return;
      } catch (e: any) {
        console.log(e);
      }
      return;
    }
    if (!amount) {
      return;
    }
    try {
      setLoading(true);
      const value = parseUnits(String(amount), 18);
      if (fromToken === "ETH") {
        const hash = await wethContract.write.deposit([], { value });
        await publicClient?.waitForTransactionReceipt({ hash });
      } else {
        const hash = await wethContract.write.withdraw([value]);
        await publicClient?.waitForTransactionReceipt({ hash });
      }
      toast.success(
        fromToken === "ETH"
          ? "Wrap ETH successfully!"
          : "Unwrap ETH successfully!"
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [
    address,
    amount,
    fromToken,
    invalidChain,
    nativeTokenBalance,
    publicClient,
    switchChainAsync,
    wethContract,
  ]);

  return (
    <BgBox>
      <div className="my-10 mx-auto w-[40rem]">
        <SelectBox className="px-6 py-6 md:px-6 mb-6">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[24px]">From</span>

            <div className="ml-auto">
              Balance:{" "}
              <span>{fromToken === "ETH" ? ethBalance : wethBalance}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Input
              ref={inputRef1}
              classNames={{ input: "text-4xl" }}
              size="lg"
              // type="number"
              placeholder="0"
              variant={"underlined"}
              value={String(amount)}
              onValueChange={handleInputValue}
            />
            <Select
              items={["ETH", "wETH"].map((item) => ({
                label: item,
                value: item,
              }))}
              classNames={{ base: "w-[200px]", trigger: "h-[58px]" }}
              variant="bordered"
              onChange={(e) => setFromToken(e.target.value as "ETH" | "wETH")}
              selectedKeys={[fromToken]}
              renderValue={(items) => {
                return items.map((item) => (
                  <div className="flex gap-2 items-center">
                    <Avatar
                      src={item.data?.value === "ETH" ? ETHIcon : wethIcon}
                    ></Avatar>
                    <span className="text-[#fff]">{item.data?.label}</span>
                  </div>
                ));
              }}
            >
              {(item) => (
                <SelectItem key={item.value} textValue={item.label}>
                  <div className="flex gap-2 items-center">
                    <Avatar
                      src={item.value === "ETH" ? ETHIcon : wethIcon}
                    ></Avatar>
                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              )}
            </Select>
          </div>
        </SelectBox>
        <SelectBox className="px-6 py-6 md:px-6">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[24px]">To</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Input
              ref={inputRef1}
              classNames={{ input: "text-4xl" }}
              size="lg"
              // type="number"
              placeholder="0"
              variant={"underlined"}
              value={String(amount)}
              onValueChange={handleInputValue}
              isDisabled
            />

            <div className=" flex items-center gap-2 px-4 py-4 rounded-3xl cursor-pointer">
              <Avatar src={fromToken === "ETH" ? wethIcon : ETHIcon}></Avatar>
            </div>
          </div>
        </SelectBox>
        <Button
          className="gradient-btn w-full rounded-full "
          style={{ display: "flex", alignItems: "center" }}
          disableAnimation
          size="lg"
          onClick={handleAction}
          isLoading={loading}
          disabled={actionBtnDisabled}
        >
          {btnText}
        </Button>
      </div>
    </BgBox>
  );
}
