import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { urlFor, client } from "../client";
import { pinPropTypes } from "../lib/types";
import { fetchUser } from "../utils/fetchUser";

const Pin: FC<pinPropTypes> = ({
  pin: { postedBy, image, _id, destination, save },
}) => {
  const [postHovered, setPostHovered] = useState(false);

  const navigate = useNavigate();

  const userInfo = JSON.parse(fetchUser()!);

  const alreadySaved = save?.filter(
    (item) => item?.postedBy?._id == userInfo?.id
  )?.length;

  const savePin = (id: string) => {
    if (!alreadySaved) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId: userInfo?.id,
            postedBy: {
              _type: "postedBy",
              _ref: userInfo?.id,
            },
          },
        ])
        .commit()
        .then((data) => {
          console.log(data);

          window.location.reload();
        });
    }
  };

  const deletePin = (id: string) => {
    client.delete(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className="relative cursor-zoom-in w-auto hover:shadow-lg overflow-hidden transition-all duration-500 ease-in-out rounded-2xl"
      >
        <img
          src={urlFor(image.asset.url).width(250).url()}
          alt="user-post"
          className="rounded-lg w-full"
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2"
            style={{ height: "100%" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                >
                  {<MdDownloadForOffline />}
                </a>
              </div>
              {alreadySaved ? (
                <button className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  type="button"
                  className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                >
                  Save
                </button>
              )}
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              {destination && (
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 px-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                >
                  <BsFillArrowRightCircleFill />
                  {destination.length > 20
                    ? `${destination.slice(0, 18)}...`
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === userInfo?.id && (
                <button
                  type="button"
                  className="bg-white flex-shrink-0 p-2 opacity-70 hover:opacity-100 font-bold text-base rounded-3xl hover:shadow-md outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
                  }}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex gap-2 mt-2 items-center"
      >
        <img
          className="w-8 h-8 rounded-full object-cover"
          src={postedBy?.image}
          alt="user-profile"
        />
        <p className="font-samibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
