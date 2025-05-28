import { useContext } from "react";
import { CommonComponentsWrapContext } from "../common/commonComponentContextWrap";

export default function useUserLoader() {
  const ctx = useContext(CommonComponentsWrapContext);
  return {
    userLoader: ctx?.userLoader,
    user: ctx?.user,
    isLogin: ctx?.isLogin,
    reloadMe: ctx?.reloadMe,
    logout: ctx?.logout,
    location: ctx?.location
  };
}
