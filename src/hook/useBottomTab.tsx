import { useContext } from "react";
import { CommonComponentsWrapContext } from "../common/commonComponentContextWrap";

export default function useBottomTab() {
  const ctx = useContext(CommonComponentsWrapContext);
  return {
    tabName: ctx?.bottomtab.tabName,
    changeTab: ctx?.bottomtab.changeTab,
  };
}
