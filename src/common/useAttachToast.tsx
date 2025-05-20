import { useState } from "react";

export default function useAttachToast(props: { toast?: any }) {
    const showToast = (data: {type?: string, title?: string, content?: string}) => {
        console.log(`type === ${data.type} | title === ${data.title} | content === ${data.content}`);
        props.toast?.show?.({
            type: data.type || "",
            text1: data.title || "",
            text2: data.content || ""
        });
    };

    return {
        showToast,
    };
}
