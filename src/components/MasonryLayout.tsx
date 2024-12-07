import { FC } from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import { pinPropTypes } from "../lib/types";

const breakpointObj = {
  default: 4,
  3000: 5,
  2000: 4,
  1200: 3,
  1000: 2,
  500: 1,
};

export interface MasonryTypes {
  pins: pinPropTypes[];
}

const MasonryLayout: FC<MasonryTypes> = ({ pins }) => {
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {pins?.map((pin: any) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
