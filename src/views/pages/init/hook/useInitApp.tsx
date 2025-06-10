import { useState } from "react";
import useUserLoader from "../../../../hook/useUserLoader";


export default function useInitApp() {
    let {userLoader, isLogin, reloadMe} = useUserLoader();

    const handleInitApp = async () => {
        await reloadMe?.(true);

        return isLogin;
    }
    
    return {
        handleInitApp
    }
}