import { useContext } from "react";
import { CommonComponentsWrapContext } from "../common/commonComponentContextWrap";

export default function useLoadingDialog() {
  const ctx = useContext(CommonComponentsWrapContext);
  return {
    openLoadingDialog: ctx?.loadingDialog.openLoadingDialog,
    closeLoadingDialog: ctx?.loadingDialog.closeLoadingDialog,
  };
}
