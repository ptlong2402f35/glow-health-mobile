import { useState } from "react";

export default function useRefreshScreen() {
    const [refresh, setRefresh] = useState(false);

    const onRefresh = async (callback?: any) => {
        try {
            setRefresh(true);
    
            await callback?.();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setRefresh(false);
        }
    }

    return {
        refresh,
        onRefresh
    }
}