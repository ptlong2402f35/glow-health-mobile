import { useState } from "react";

export default function useAttachBottomTab(props: {}) {
    const [tabName, setTabName] = useState("Home");

    const changeTab = (name: string) => {
        setTabName(name);
    };

    return {
        tabName,
        changeTab,
    };
}
