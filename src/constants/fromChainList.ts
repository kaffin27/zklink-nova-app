import {
  PRIMARY_CHAIN_KEY,
  nexusGoerliNode,
  nexusNode,
} from "@/constants/networks";
import lineaIcon from "../assets/img/linea.svg";
import ethereumIcon from "../assets/img/ethereum.svg";
import mantleIcon from "../assets/img/mantle.svg";
import mantaIcon from "../assets/img/manta.jpg";
import arbIcon from "../assets/img/arbitrum.svg";
import zkscyncIcon from "../assets/img/zksync.svg";
import {
  goerli,
  lineaTestnet,
  mantleTestnet,
  mainnet,
  linea,
  zkSync,
  manta,
  mantle,
  arbitrum,
} from "wagmi/chains";

const nodeType = import.meta.env.VITE_NODE_TYPE;

export const NOVA_NETWORK = {
  label: nexusNode[0].name,
  icon: '/img/nova.png',
  chainId: nexusNode[0].id,
  networkKey: "nova",
  isEthGasToken: true,
  chainName: nexusNode[0].name,
  explorerUrl: nexusNode[0].blockExplorerUrl,
  rpcUrl: nexusNode[0].rpcUrl,
};

export const NOVA_GOERLI_NETWORK = {
  label: nexusGoerliNode[0].name,
  icon: '/img/nova.png',
  chainId: nexusGoerliNode[0].id,
  networkKey: "nova",
  isEthGasToken: true,
  chainName: nexusGoerliNode[0].name,
  explorerUrl: nexusGoerliNode[0].blockExplorerUrl,
  rpcUrl: nexusGoerliNode[0].rpcUrl,
};

const FromListMainnet = [
  {
    label: "Ethereum",
    icon: ethereumIcon,
    chainId: mainnet.id,
    networkKey: "ethereum",
    isEthGasToken: true,
    chainName: "Ethereum",
    explorerUrl: mainnet.blockExplorers.default.url,
    rpcUrl: mainnet.rpcUrls.default.http[0],
  },
  {
    label: "Linea",
    icon: lineaIcon,
    chainId: linea.id,
    networkKey: PRIMARY_CHAIN_KEY,
    isEthGasToken: true,
    chainName: "Linea",
    explorerUrl: linea.blockExplorers.default.url,
    rpcUrl: linea.rpcUrls.default.http[0],
  },
  {
    label: "Arbitrum",
    icon: arbIcon,
    chainId: arbitrum.id,
    networkKey: "arbitrum",
    isEthGasToken: true,
    chainName: "Arbitrum",
    explorerUrl: arbitrum.blockExplorers.default.url,
    rpcUrl: arbitrum.rpcUrls.default.http[0],
  },
  {
    label: "zkSync",
    icon: zkscyncIcon,
    chainId: zkSync.id,
    networkKey: "zksync",
    isEthGasToken: true,
    chainName: "ZkSync",
    explorerUrl: zkSync.blockExplorers.default.url,
    rpcUrl: zkSync.rpcUrls.default.http[0],
  },
  {
    label: "Manta",
    icon: mantaIcon,
    chainId: manta.id,
    networkKey: "manta",
    isEthGasToken: true,
    chainName: "Manta",
    explorerUrl: manta.blockExplorers.default.url,
    rpcUrl: manta.rpcUrls.default.http[0],
  },
  {
    label: "Mantle",
    icon: mantleIcon,
    chainId: mantle.id,
    networkKey: "mantle",
    isEthGasToken: true,
    chainName: "Mantle",
    explorerUrl: mantle.blockExplorers.default.url,
    rpcUrl: mantle.rpcUrls.default.http[0],
  },
];

const FromListGoerli = [
  {
    label: "Ethereum Goerli Testnet",
    icon: ethereumIcon,
    chainId: goerli.id,
    networkKey: "goerli",
    isEthGasToken: true,
    chainName: "Goerli",
    explorerUrl: goerli.blockExplorers.default.url,
    rpcUrl: goerli.rpcUrls.default.http[0],
  },
  {
    label: "Linea Goerli Testnet",
    icon: lineaIcon,
    chainId: lineaTestnet.id,
    networkKey: PRIMARY_CHAIN_KEY,
    isEthGasToken: true,
    chainName: "Linea Goerli",
    explorerUrl: lineaTestnet.blockExplorers.default.url,
    rpcUrl: lineaTestnet.rpcUrls.default.http[0],
  },
  {
    label: "Mantle Goerli Testnet",
    icon: mantleIcon,
    chainId: mantleTestnet.id,
    networkKey: "mantle",
    isEthGasToken: false,
    chainName: "Mantle Goerli",
    explorerUrl: mantleTestnet.blockExplorers.default.url,
    rpcUrl: mantleTestnet.rpcUrls.default.http[0],
  },
];

const FromList = nodeType === "nexus-goerli" ? FromListGoerli : FromListMainnet;

export default FromList;
