const Tokens = [
  {
    address: "0xAbD167356cecaB549794A4a93a7E919b9B51f64E",
    networkKey: "goerli",
    symbol: "MTK",
    networkName: "Goerli",
    decimals: 18,
    icon: "",
  },
  {
    address: "0x1ac10940cc7f8b063731609AF1a55F2fa440dFD2",
    networkKey: "primary",
    symbol: "MTK2",
    networkName: "Linear Goerli",
    decimals: 18,
    icon: "",
  },
  {
    address: "0x0BC0804bC068daFB126017Edb0a74a9f7eba9bB7",
    networkKey: "mantle",
    symbol: "MTK2",
    networkName: "Mantle Goerli",
    decimals: 18,
    icon: "",
  },
];
export default Tokens;

export const TokensProd = [
  {
    "symbol": "wBTC",
    "chain":{"Ethereum":"0x2260fac5e5542a773aa44fbcfedf7c193bc2c599","Arbitrum":"0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f", "zkSync":"0xBBeB516fb02a01611cBBE0453Fe3c580D7281011", "Linea":"0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4", "Manta":"0x305E88d809c9DC03179554BFbf85Ac05Ce8F18d6", "Mantle":"0xCAbAE6f6Ea1ecaB08Ad02fE02ce9A44F09aebfA2"},
    "type": "Native",
    "yieldType": ["NOVA Points"],
    "multiplier": '2x'
},
{
    "symbol": "ETH",
    "chain":{"Ethereum":"0x0000000000000000000000000000000000000000","Arbitrum":"native", "zkSync":"0x000000000000000000000000000000000000800A", "Linea":"native", "Manta":"native", "Mantle":"0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111"},
    "type": "Native",
    "yieldType": ["NOVA Points"],
    "multiplier": '2x'
},
{
    "symbol": "USDT",
    "chain":{"Ethereum":"0xdac17f958d2ee523a2206206994597c13d831ec7","Arbitrum":"0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9", "zkSync":"0x493257fD37EDB34451f62EDf8D2a0C418852bA4C", "Linea":"0xA219439258ca9da29E9Cc4cE5596924745e12B93", "Manta":"0xf417F5A458eC102B90352F697D6e2Ac3A3d2851f", "Mantle":"0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE"},
    "type": "Stablecoin",
    "yieldType": ["NOVA Points"],
    "multiplier": '2x'
},
{
    "symbol": "USDC",
    "chain": {"Ethereum":"0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48","Arbitrum":"0xaf88d065e77c8cC2239327C5EDb3A432268e5831", "zkSync":"0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", "Linea":"0x176211869cA2b568f2A7D4EE941E073a821EE1ff", "Manta":"0xb73603C5d87fA094B7314C74ACE2e64D165016fb", "Mantle":"0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9"},
    "type": "Stablecoin",
    "yieldType": ["NOVA Points"],
    "multiplier": '2x'
},
{
    "symbol": "USDe",
    "chain":{"Ethereum":"0x4c9EDD5852cd905f086C759E8383e09bff1E68B3"},
    "type": "Stablecoin",
    "yieldType": ["NOVA Points", "Shard"],
    "multiplier": '2x'
},
{
    "symbol": "sUSDe",
    "chain":{"Ethereum":"0x9d39a5de30e57443bff2a8307a4256c8797a3497"},
    "type": "Synthetic",
    "yieldType": ["NOVA Points", "Shard"],
    "multiplier": '1.5x'
},
{
    "symbol": "ARB",
    "Chain": {"Ethereum":"0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1", "Arbitrum":"0x912CE59144191C1204E64559FE8253a0e49E6548"},
    "type": "Native",
    "yieldType": ["NOVA Points"],
    "multiplier": '1.5x'
},
{
    "symbol": "MNT",
    "chain":{"Ethereum":"0x3c3a81e81dc49a522a592e7622a7e711c06bf354", "Mantle":"0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000"},
    "type": "Native",
    "yieldType": ["NOVA Points"],
    "multiplier": '1.5x'
},
{
    "symbol": "MANTA",
    "chain":{"Manta":"0x95CeF13441Be50d20cA4558CC0a27B601aC544E5"},
    "type": "Native",
    "yieldType": ["NOVA Points"],
    "multiplier": '1.5x'
},
{
    "symbol": "wUSDm",
    "chain":{"Ethereum":"0x57F5E098CaD7A3D1Eed53991D4d66C45C9AF7812", "Manta":"0xbdAd407F77f44F7Da6684B416b1951ECa461FB07"},
    "type": "RWA",
    "yieldType": ["NOVA Points", "Native Yield"],
    "multiplier": '1.5x'
},
{
    "symbol": "Stone",
    "chain":{"Ethereum":"0x7122985656e38BDC0302Db86685bb972b145bD3C", "Manta":"0xEc901DA9c68E90798BbBb74c11406A32A70652C3"},
    "type": "LST",
    "yieldType": ["NOVA Points", "Native Yield"],
    "multiplier": '1.5x'
},
{
    "symbol": "swETH",
    "chain":{"Ethereum":"0xf951E335afb289353dc249e82926178EaC7DEd78"},
    "type": "LST",
    "yieldType": ["NOVA Points", "Native Yield", "Pearls"],
    "multiplier": '1.5x'
},
{
    "symbol": "mETH",
    "chain":{"Ethereum":"0xd5F7838F5C461fefF7FE49ea5ebaF7728bB0ADfa", "Mantle":"0xcDA86A272531e8640cD7F1a92c01839911B90bb0"},
    "type": "LST",
    "yieldType": ["NOVA Points", "Native Yield"],
    "multiplier": '1.5x'
},
{
    "symbol": "wstETH",
    "chain":{"Ethereum":"0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0","Arbitrum":"0x5979D7b546E38E414F7E9822514be443A4800529", "zkSync":"", "Linea":"0xB5beDd42000b71FddE22D3eE8a79Bd49A568fC8F"},
    "type": "LST",
    "yieldType": ["NOVA Points", "Native Yield"],
    "multiplier": '1.5x'
},
{
    "symbol": "nETH",
    "chain":{"Ethereum":"0xc6572019548dfeba782ba5a2093c836626c7789a"},
    "type": "LST",
    "yieldType": ["NOVA Points", "Native Yield"],
    "multiplier": '1.5x'
},
{
    "symbol": "weETH",
    "chain":{"Ethereum":"0xCd5fE23C85820F7B72D0926FC9b05b43E359b7ee", "Arbitrum":"0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe"},
    "type": "LRT",
    "yieldType": ["NOVA Points", "Native Yield", "EL Points", "Loyalty Points"],
    "multiplier": '1x'
},
{
    "symbol": "rsETH",
    "chain":{"Ethereum":"0xA1290d69c65A6Fe4DF752f95823fae25cB99e5A7"},
    "type": "LRT",
    "yieldType": ["NOVA Points", "Native Yield", "EL Points", "Kelp Miles"],
    "multiplier": '1x'
},
{
    "symbol": "ezETH",
    "chain":{"Ethereum":"0xbf5495Efe5DB9ce00f80364C8B423567e58d2110"},
    "type": "LRT",
    "yieldType": ["NOVA Points", "Native Yield", "EL Points", "ezPoints"],
    "multiplier": '1x'
},
{
    "symbol": "pufETH",
    "chain":{"Ethereum":"0xD9A442856C234a39a81a089C06451EBAa4306a72"},
    "type": "LRT",
    "yieldType": ["NOVA Points", "Native Yield", "EL Points", "Puffer Points"],
    "multiplier": '1x'
},
{
    "symbol": "rswETH",
    "chain":{"Ethereum":"0xFAe103DC9cf190eD75350761e95403b7b8aFa6c0"},
    "type": "LRT",
    "yieldType": ["NOVA Points", "Native Yield", "Swell Points", "Pearls"],
    "multiplier": '1x'
},
{
  "symbol": "DAI",

  "chain":{"Ethereum":"0x6b175474e89094c44da98b954eedeac495271d0f","Arbitrum":"0xda10009cbd5d07dd0cecc66161fc93d7c9000da1"},
  "type": "Stablecoin",
  "yieldType": ["NOVA Points"],
  "multiplier": '1x'
},
{
  "symbol": "sDAI",

  "chain":{"Ethereum":"0x83F20F44975D03b1b09e64809B757c47f942BEeA"},
  "type": "Stablecoin",
  "yieldType": ["NOVA Points", "Native Yield"],
  "multiplier": '1x'
},
];
