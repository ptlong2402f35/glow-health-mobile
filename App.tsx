// In App.js in a new project

import * as React from "react";
import Router from "./src/NavigatorConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonComponentsWrap from "./src/common/commonComponentContextWrap";
import { View } from "react-native";
import PusherConfig from "./src/hook/pusher/pusher";

export default function App() {
    React.useEffect(() => {
        //config pusher khi start app
        new PusherConfig().init();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <CommonComponentsWrap>
                <SafeAreaView style={{ flex: 1 }}>
                    <Router />
                </SafeAreaView>
            </CommonComponentsWrap>
        </View>
    );
}
