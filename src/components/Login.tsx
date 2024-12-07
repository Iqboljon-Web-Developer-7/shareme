import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";
import { FaGoogle } from "react-icons/fa";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

const Login = () => {
  const data = useUser();
  if (data.user) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className=" relative w-full h-full">
        <video
          src={shareVideo}
          typeof="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <SignedOut>
              <SignInButton>
                <button className="button-33 py-2 px-6 flex items-center justify-center gap-3 bg-white rounded-xl hover:bg-green-50 duration-200 cursor-pointer">
                  <FaGoogle />
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
