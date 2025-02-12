import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setInviteCode } from "@/store/modules/airdrop";
import { FooterTvlText } from "@/styles/common";
import "@/styles/otp-input.css";
import TotalTvlCard from "@/components/TotalTvlCard";
import { RootState } from "@/store";
import { useStartTimerStore } from "@/hooks/useStartTimer";
import { useAccount } from "wagmi";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import Countdown from "@/components/Countdown";
import Loading from "@/components/Loading";
import { formatNumberWithUnit } from "@/utils";
const BgBox = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: image-set(
    "/img/bg-home@0.5x.png" 0.5x,
    "/img/bg-home@1x.png" 1x,
    "/img/bg-home@2x.png" 2x
  );
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50%;
`;

const CardBox = styled.div`
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(15.800000190734863px);
`;
const TitleBox = styled.div`
  // h2{
  //   margin-left: 120px;
  // }
  .headTitle {
    justify-content: center;
    margin-bottom: 20px;
  }
  .flexBox {
    justify-content: center;
  }
  .title {
    color: #c2e2ff;
    font-family: Satoshi;
    font-style: normal;
    font-weight: 900;
    letter-spacing: -0.03125rem;
  }
  .sub-title {
    color: #c6d3dd;
    font-family: Satoshi;
    font-style: normal;
    letter-spacing: -0.03125rem;
  }
  @keyframes width {
    0% {
      width: 118px;
    }
    9% {
      width: 118px;
    }
    10% {
      width: 296px;
    }
    34% {
      width: 296px;
    }
    35% {
      width: 132px;
    }
    59% {
      width: 132px;
    }
    60% {
      width: 136px;
    }
    84% {
      width: 136px;
    }
    85% {
      width: 412px;
    }
    100% {
      width: 412px;
    }
  }
  .box {
    width: 500px;
    height: 52px;
    border-radius: 8px;
    // background: rgba(0, 0, 0, 0.40);
    // backdrop-filter: blur(15.800000190734863px);
    overflow: hidden;
    padding: 2px 16px;
    position: relative;
    // animation-name: width;
    // animation-duration: 10s;
    // animation-iteration-count: infinite;
    @keyframes move {
      0% {
        top: 0;
      }
      10% {
        top: 0;
      }
      20% {
        top: -48px;
      }
      33% {
        top: -48px;
      }
      43% {
        top: -96px;
      }
      56% {
        top: -96px;
      }
      66% {
        top: -144px;
      }
      79% {
        top: -144px;
      }
      89% {
        top: -192px;
      }
      95% {
        top: -192px;
      }
      100% {
        top: 0px;
      }
    }
    .move {
      position: absolute;
      animation-name: move;
      animation-duration: 10s;
      animation-timing-function: ease;
      animation-iteration-count: infinite;
      top: 0;
    }

    @keyframes width1 {
      0% {
        width: 86px;
      }
      9% {
        width: 86px;
      }
      10% {
        width: 264px;
      }
      34% {
        width: 264px;
      }
      35% {
        width: 100px;
      }
      59% {
        width: 100px;
      }
      60% {
        width: 104px;
      }
      84% {
        width: 104px;
      }
      85% {
        width: 380px;
      }
      100% {
        width: 380px;
      }
    }
    .inner {
      width: 500px;
      font-family: Satoshi;
      font-size: 40px;
      font-style: normal;
      font-weight: 900;
      line-height: 48px; /* 140% */
      letter-spacing: 4px;
      background: linear-gradient(90deg, #48ecae 25%, #49ced7 75%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      // animation-name: width1;
      // animation-duration: 10s;
      // animation-iteration-count: infinite;
    }
  }
  @media (max-width: 768px) {
    .box {
      margin-left: 0;
      .move {
        left: 50%;
        transform: translateX(-50%);
      }
      .inner {
        width: 100%;
        font-size: 30px;
        text-align: center;
      }
    }
  }
`;

const ConnectWalletText = styled.span`
  color: #c6ddda;
  text-align: center;
  font-family: Satoshi;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem; /* 150% */
  letter-spacing: -0.03125rem;
`;

const FooterBox = styled.div`
  /* position: fixed; */
  /* bottom: 2rem; */
  /* left: 50%; */
  /* transform: translate(-50%, 0); */
`;

export default function Home() {
  const { isConnected } = useAccount();
  const { inviteCode, isActiveUser } = useSelector(
    (store: RootState) => store.airdrop
  );
  const { campaignStart } = useStartTimerStore();
  const [{ otp, numInputs, separator, placeholder, inputType }, setConfig] =
    useState({
      otp: inviteCode || "",
      numInputs: 6,
      separator: "",
      placeholder: "",
      inputType: "text" as const,
    });

  const navigator = useNavigate();
  const dispatch = useDispatch();
  const handleOTPChange = (otp: string) => {
    setConfig((prevConfig) => ({ ...prevConfig, otp }));
  };
  const arr = ["ETH", "Stablecoins", "LSTs", "LRTs", "L2 Native Assets"];
  const enterInviteCode = async () => {
    console.log("enter invite code", otp);
    if (!otp || otp.length !== 6) return;
    // TODO: check invite code ?
    // const res = await checkInviteCode(otp);
    // if (!res?.result) {
    //   toast.error("Invalid invite code. Try another.", { duration: 3000 });
    //   return;
    // }

    dispatch(setInviteCode(otp));
    navigator("/aggregation-parade");
  };

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isActiveUser) {
      setIsLoading(true);
      setTimeout(() => {
        navigator("/aggregation-parade");
      }, 1000);
    }
  }, [isActiveUser]);

  useEffect(() => {
    handleOTPChange(inviteCode);
  }, [inviteCode]);

  return (
    <BgBox className="relative pt-[116px] pb-[7.5rem] md:pt-[7.5rem] md:pb-[8.5rem]">
      {isLoading && <Loading />}
      {/* Title */}
      <TitleBox className="text-left md:text-center">
        <div className="flex headTitle px-6">
          <h2 className="title md:pl-[1.56rem] text-[1.8rem] md:text-[2.5rem]  leading-10 md:leading-[3.5rem]">
            The ONLY Aggregated L3 with added yield for
          </h2>
        </div>
        <div className="flex flexBox">
          <div className="box mr-0 md:mr-[30px]">
            <div className="move">
              <div className="inner">ETH</div>
              <div className="inner">Stablecoins</div>
              <div className="inner">LSTs</div>
              <div className="inner">LRTs</div>
              <div className="inner">L2 Native Assets</div>
            </div>
          </div>
        </div>
        <p className="sub-title mt-4 pl-6 pr-6 lg:pr-8 text-[1rem] md:text-[1.5rem] leading-[2rem]">
          Bridge to earn Mega Yield and $ZKL on zkLink Nova
        </p>
      </TitleBox>

      {/* Form: Invite code */}
      <CardBox className="mt-[2.5rem] mx-6 py-8 px-[1.375rem] md:px-[1rem] md:mx-auto flex flex-col items-center text-center w-auto md:w-[26rem]">
        <TitleBox>
          <h4 className="title text-[1.5rem] leading-[1rem]">
            Enter Your Invite Code
          </h4>
          <p className="sub-title mt-[0.75rem] text-[1rem] leading-[1.5rem]">
            To participate in the campaign
          </p>
        </TitleBox>

        <div className="mt-8">
          <OTPInput
            inputStyle="inputStyle"
            numInputs={numInputs}
            onChange={handleOTPChange}
            renderSeparator={<span>{separator}</span>}
            value={otp}
            placeholder={placeholder}
            inputType={inputType}
            renderInput={(props) => <input {...props} />}
            shouldAutoFocus
          />
        </div>

        <div className="mt-[1.5rem] text-[1rem]">
          Join our{" "}
          <a href="https://discord.com/invite/zklink" className="text-[#1CFFE4]" target="_blank">
            Discord
          </a>{" "}
          or search{" "}
          <a href="https://twitter.com/search?q=%23zkLinkNovaAggParade&src=typeahead_click" className="text-[#1CFFE4]" target="_blank">
            #zkLinkNovaAggParade
          </a>{" "}
          on twitter for invite code
        </div>

        <div>
          <Button
            className={`gradient-btn mt-[2rem] px-[2rem] h-[2.46875rem] text-center text-[1rem] leading-[2.46875rem] w-[15.97rem]`}
            disabled={!otp || otp.length !== 6}
            onClick={enterInviteCode}
          >
            SUBMIT
          </Button>
        </div>

        {/* {!isConnected && (
          <div className="mt-4">
            <ConnectWalletText
              className="cursor-pointer text-[1rem]"
              onClick={() => web3Modal.open()}
            >
              Connect Wallet
            </ConnectWalletText>
          </div>
        )} */}
      </CardBox>

      <FooterBox className="w-full fixed left-0 bottom-0 bg-black bg-opacity-75 flex flex-wrap items-center justify-center  md:justify-between px-2 md:px-10 lg:px-36 py-4">
        {/* Footer: total tvl data */}
        <div className="flex flex-col mb-8">
          <span className="text-[1.25rem] text-center">
            zkLink Nova Network TVL
          </span>
          <TotalTvlCard />
        </div>
        {/* <TotalTvlCard /> */}

        {/* Footer: nav links */}
        <div className="right-[6rem] bottom-[1rem] flex justify-end items-end">
          <div className="flex items-center gap-[1.25rem]">
            <a href="https://blog.zk.link/" target="_blank">
              <img
                src="/img/icon-medium.svg"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </a>
            <a href="https://discord.com/invite/zklink" target="_blank">
              <img src="/img/icon-dc.svg" className="w-[1.5rem] h-[1.5rem]" />
            </a>
            <a href="https://t.me/zkLinkorg">
              <img src="/img/icon-tg.svg" className="w-[1.5rem] h-[1.5rem]" />
            </a>
            <a href="https://twitter.com/zkLink_Official" target="_blank">
              <img
                src="/img/icon-twitter.svg"
                className="w-[1.25rem] h-[1.25rem]"
              />
            </a>
            <a href="https://github.com/zkLinkProtocol" target="_blank">
              <img
                src="/img/icon-github.svg"
                className="w-[1.5rem] h-[1.5rem]"
              />
            </a>
          </div>
        </div>
      </FooterBox>
    </BgBox>
  );
}
