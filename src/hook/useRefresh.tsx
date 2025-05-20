import { useContext } from "react";
import { CommonComponentsWrapContext } from "../common/commonComponentContextWrap";

export default function useRefresh() {
    const ctx = useContext(CommonComponentsWrapContext);
    return {
        refresh: ctx?.refresh,
        onRefresh: ctx?.onRefresh,
    };
}
