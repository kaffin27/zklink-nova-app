import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  ReactNode,
  useMemo,
} from "react";
import "./index.css";
import useSBTNFT, { NOVA_NFT } from "@/hooks/useNFT";
import PointsRewardsTooltips from "../Dashboard/PointsRewardsTooltips";

let timeout: string | number | NodeJS.Timeout | undefined;
type Ref = ReactNode | { start: (target: number) => void };
interface IProps {
  type: "Trademark" | "MysteryBox";
  targetImageIndex?: number;
  onDrawEnd: () => void;
  sbtNFT?: NOVA_NFT;
}
const TrademarkItems = [
  { name: "Oak Tree Roots", img: "img-trademark-1.png" },
  { name: "Magnifying Glass", img: "img-trademark-2.png" },
  { name: "Chess Knight", img: "img-trademark-3.png" },
  { name: "Binary Code Metrix Cube", img: "img-trademark-4.png" },
  { name: "Thanks for joining", img: "img-trademark-5.png" },
];

const MysteryboxItems = [
  {
    name: "Nova +50 Booster",
    img: "/img/img-point-booster-v2-1.png",
    tooltipId: 50,
  },
  {
    name: "Nova +100 Booster",
    img: "/img/img-point-booster-v2-2.png",
    tooltipId: 100,
  },
  {
    name: "Nova +200 Booster",
    img: "/img/img-point-booster-v2-3.png",
    tooltipId: 200,
  },
  {
    name: "Nova +500 Booster",
    img: "/img/img-point-booster-v2-4.png",
    tooltipId: 500,
  },
  {
    name: "Nova +1000 Booster",
    img: "/img/img-point-booster-v2-5.png",
    tooltipId: 1000,
  },
  { name: "Oak Tree Roots", img: "/img/img-trademark-1.png" },
  { name: "Magnifying Glass", img: "/img/img-trademark-2.png" },
  { name: "Chess Knight", img: "/img/img-trademark-3.png" },
  { name: "Binary Code Metrix Cube", img: "/img/img-trademark-4.png" },
  { name: "Lynks", img: "" },
];

const LotteryAnimation = React.forwardRef<Ref, IProps>((props, ref) => {
  const { targetImageIndex, onDrawEnd, type, sbtNFT } = props;
  const curRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    start: (targetImageIndex: number) => start(targetImageIndex),
  }));
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();

  useEffect(() => {
    console.log("currentImageIndex", currentImageIndex);
  });

  const lynksNFTImg = useMemo(() => {
    if (type === "MysteryBox" && sbtNFT) {
      return `/img/img-mystery-box-lynks-${sbtNFT.name}.png`;
    } else {
      return `/img/img-mystery-box-lynks-ENTP.png`;
    }
  }, [type, sbtNFT]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const start = async (targetImageIndex: number) => {
    return new Promise((resolve) => {
      if (targetImageIndex < 0) return;

      let step = 0;
      let speed = 2;
      const Loops = type === "Trademark" ? 3 : 2;
      const count = type === "Trademark" ? 6 : 10;
      const totalSteps = count * Loops + targetImageIndex; // run four loops and end on target
      const stopAnimation = () => {
        clearTimeout(timeout);
        setCurrentImageIndex(targetImageIndex);
      };
      const startAnimation = () => {
        if (step >= totalSteps) {
          stopAnimation();
          onDrawEnd();
          return resolve(undefined);
        }
        if (step > count * (Loops - 1) + targetImageIndex) {
          speed++;
        }
        setCurrentImageIndex(step % count);
        step++;
        timeout = setTimeout(
          startAnimation,
          speed * (type === "MysteryBox" ? 80 : 100)
        );
      };

      startAnimation();
    });
  };

  useEffect(() => {
    console.log("targetImageIndex", targetImageIndex);
    if (targetImageIndex !== undefined) {
      setCurrentImageIndex(targetImageIndex);
    } else {
      setCurrentImageIndex(undefined);
    }
    // return () => {
    //   onDrawEnd();
    //   clearTimeout(timeout);
    // };
  }, [targetImageIndex]);

  return (
    <div className={`lottery-container lottery-container-${type}`} ref={curRef}>
      {type === "Trademark" && (
        <>
          {TrademarkItems.map((item, index) => (
            <div
              key={item.name}
              className={`lottery-item ${
                currentImageIndex === index ? "active" : ""
              }`}
            >
              <div className="img-bg">
                <img src={`/img/${item.img}`} alt="trademark nft" />
              </div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </>
      )}
      {type === "MysteryBox" && (
        <>
          {MysteryboxItems.map((item, index) => (
            <div
              key={item.name}
              className={`lottery-item ${
                currentImageIndex === index ? "active" : ""
              }`}
              data-tooltip-id={
                item?.tooltipId ? `points-rewards-tips-${item.tooltipId}` : ""
              }
            >
              <div className="img-bg">
                <img src={index === 9 ? lynksNFTImg : item.img} alt="Image 1" />
              </div>
              <div
                className={`item-name ${
                  item?.tooltipId ? "flex items-center gap-1" : ""
                }`}
              >
                <span>{item.name}</span>
                {item?.tooltipId && (
                  <img src="/img/icon-info.svg" className="info" />
                )}
              </div>
            </div>
          ))}
        </>
      )}
      <PointsRewardsTooltips />
    </div>
  );
});

export default LotteryAnimation;
