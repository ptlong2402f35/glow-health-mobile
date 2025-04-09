// In App.js in a new project

import * as React from "react";
import Router from "./src/NavigatorConfig";
import { SafeAreaView } from "react-native-safe-area-context";
import CommonComponentsWrap from "./src/common/commonComponentContextWrap";
import { View } from "react-native";

export default function App() {
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
