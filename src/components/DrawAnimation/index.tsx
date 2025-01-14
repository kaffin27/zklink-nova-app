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
  type: "Trademark" | "MysteryBox" | "OldestFriends";
  targetImageIndex?: number;
  onDrawEnd: () => void;
  sbtNFT?: NOVA_NFT;
}
const TrademarkItems = [
  { name: "+10 Nova points", img: "img-trademark-8.png", tooltipId: 10 },
  { name: "+50 Nova points", img: "img-trademark-9.png", tooltipId: 50 },
];

const MysteryboxItems = [
  { name: "Nova x3 Booster", img: "/img/img-point-booster-1.png" },
  { name: "Nova x4 Booster", img: "/img/img-point-booster-2.png" },
  { name: "Nova +100 Booster", img: "/img/img-point-booster-3.png" },
  { name: "Nova +300 Booster", img: "/img/img-point-booster-4.png" },
  { name: "Nova +500 Booster", img: "/img/img-point-booster-5.png" },
  { name: "Nova +1000 Booster", img: "/img/img-point-booster-6.png" },
  { name: "Nova +2000 Booster", img: "/img/img-point-booster-7.png" },
  { name: "Lynks", img: "" },
];

const LotteryAnimation = React.forwardRef<Ref, IProps>((props, ref) => {
  const { targetImageIndex, onDrawEnd, type, sbtNFT } = props;
  const curRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({
    start: (targetImageIndex: number) => start(targetImageIndex),
  }));
  const [currentImageIndex, setCurrentImageIndex] = useState<number>();

  const lynksNFTImg = useMemo(() => {
    if (sbtNFT) {
      return `/img/img-mystery-box-lynks-${sbtNFT.name}.png`;
    } else {
      return `/img/img-mystery-box-lynks-ENTP.png`;
    }
  }, [sbtNFT]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const start = async (targetImageIndex: number) => {
    return new Promise((resolve) => {
      if (targetImageIndex < 0) return;

      let step = 0;
      let speed = 2;
      const Loops = type === "Trademark" ? 2 : 2;
      const count = type === "Trademark" ? 2 : 8;
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
              data-tooltip-id={
                item?.tooltipId ? `points-rewards-tips-${item.tooltipId}` : ""
              }
            >
              <div className="img-bg">
                <img
                  src={index === 8 ? lynksNFTImg : `/img/${item.img}`}
                  alt="Image 1"
                />
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
      {type === "MysteryBox" && (
        <>
          {MysteryboxItems.map((item, index) => (
            <div
              key={item.name}
              className={`lottery-item ${
                currentImageIndex === index ? "active" : ""
              }`}
            >
              <div className="img-bg">
                <img src={index === 7 ? lynksNFTImg : item.img} alt="Image 1" />
              </div>
              <div className="item-name">{item.name}</div>
            </div>
          ))}
        </>
      )}

      <PointsRewardsTooltips />
    </div>
  );
});

export default LotteryAnimation;
