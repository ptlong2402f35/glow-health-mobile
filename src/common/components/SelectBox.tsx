import { StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";

export interface SelectType {
    label?: any;
    value?: any;
}

export default function SelectBox(props: {
    value: any;
    onValueChange: any;
    getData?: any;
}) {
    const [data, setData] = useState<SelectType[]>([
        {
            label: "Chọn",
            value: 0
        }
    ]);

    const init = async() => {
        let res = await props.getData?.();
        if(res) {
            setData(
                [...data, ...res]
            );
        }
    }

    useEffect(() => {
        if(props.getData) {
            init();
        }
    },[])
    return (
        <Picker
            selectedValue={props.value}
            onValueChange={props.onValueChange}
            style={styles.picker}
        >
            {data.map((item) => (
                <Picker.Item label={item.label} value={item.value} />
            ))}
        </Picker>
    );
}

export const styles = StyleSheet.create({
    picker: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6 },
});
