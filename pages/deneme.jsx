import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { exitAccount, getJWT } from "../redux/slices/AuthSlice";

const deneme = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const jwt = useSelector(getJWT);

  useEffect(() => {
    if (!jwt) {
      router.push("account/login");
    }
  }, [jwt]);

  if (jwt) {
    return (
      <div>
        <button
          onClick={() => {
            dispatch(exitAccount());
          }}
        >
          exit
        </button>
      </div>
    );
  }
};

export default deneme;
