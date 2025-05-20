import { useContext } from "react";
import { CommonComponentsWrapContext } from "../common/commonComponentContextWrap";

export default function useToast() {
  const ctx = useContext(CommonComponentsWrapContext);
  return {
    showToast: ctx?.showToast,
  };
}
