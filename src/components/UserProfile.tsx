import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SignedIn, SignOutButton } from "@clerk/clerk-react";

import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { FaGoogle } from "react-icons/fa";
import { pinPropTypes, userType } from "../lib/types";

const UserProfile = () => {
  const [user, setUser] = useState<userType>();
  const [pins, setPins] = useState<pinPropTypes[]>();
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("Created");
  const { userId } = useParams();

  const randomImage = "https://picsum.photos/1600/900?random=10";

  const activeBtnStyles =
    "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
  const notActiveBtnStyles =
    "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

  useEffect(() => {
    const query = userQuery(userId!);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId!);
      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinstQuery = userSavedPinsQuery(userId!);
      client.fetch(savedPinstQuery).then((data) => setPins(data));
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading profile" />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId == user?._id && (
                <SignedIn>
                  <SignOutButton>
                    <button className="button-33 py-2 px-6 flex items-center justify-center gap-3 bg-white rounded-xl hover:bg-green-50 duration-200 cursor-pointer">
                      <FaGoogle />
                      Sign Out
                    </button>
                  </SignOutButton>
                </SignedIn>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                const target = e!.target! as HTMLButtonElement;
                setText(target.textContent!);
                setActiveBtn("Created");
              }}
              className={`${
                activeBtn === "Created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                const target = e!.target! as HTMLButtonElement;
                setText(target.textContent!);
                setActiveBtn("Saved");
              }}
              className={`${
                activeBtn === "Saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins!?.length > 0 ? (
            <div className="px-2">
              <MasonryLayout pins={pins!} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No pins found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
