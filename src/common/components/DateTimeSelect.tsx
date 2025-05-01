import { View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEffect, useState } from "react";
import moment from 'moment-timezone';

export default function DateTimeSelect(props: {
    showDate?: boolean;
    showTime?: boolean;
    setDate?: (value: Date) => void;
    closeDate?: () => void;
    closeTime?: () => void;
    openTime?: () => void;
    openDate?: () => void;
}) {
    let [date, setDate] = useState((new Date()));
    let [time, setTime] = useState((new Date()));
    const onChangeDateTime = (event: any, selectedDate?: Date) => {
        console.log("event type", event.type)
        if(event.type === "set") {
            if (selectedDate) {
                console.log("selected date", selectedDate);
                setDate?.(selectedDate);
                props?.closeDate?.();
                props?.openTime?.();
            } else {
                props?.closeDate?.();
            }
        }
        if(event.type === "dismissed") {
            props?.closeDate?.();
        }
    };

    const onChangeTime = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            console.log("selected time", selectedDate);
            setTime?.(selectedDate);
            props?.closeTime?.();
        } else {
            props?.closeTime?.();
        }
    };

    const combine = () => {
        const combinedDate = new Date(date); // clone tránh sửa gốc
        combinedDate.setHours(time.getHours());
        combinedDate.setMinutes(time.getMinutes());
        combinedDate.setSeconds(time.getSeconds());
        combinedDate.setMilliseconds(time.getMilliseconds());
        console.log("combine date", combinedDate)
        props?.setDate?.(combinedDate);
    } 

    useEffect(() => {
        console.log("date ===", date);
        console.log("time ===", time);
        combine();
    },[date, time]);

    return (
        <View>
            {props?.showDate && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChangeDateTime}
                />
            )}
            {props?.showTime && (
                <DateTimePicker
                    value={time}
                    mode="time"
                    display="spinner"
                    onChange={onChangeTime}
                    locale="vi-VN"
                />
            )}
        </View>
    );
}
