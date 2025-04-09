import { useContext } from "react";
import { CommonComponentsWrapContext } from "../common/commonComponentContextWrap";

export default function useAlertDialog() {
  const ctx = useContext(CommonComponentsWrapContext);
  return {
    openAlertDialog: ctx?.alertDialog.openAlertDialog,
    closeAlertDialog: ctx?.alertDialog.closeAlertDialog,
  };
}
