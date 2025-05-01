import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Switch,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { staffInfoUpdateStyle } from "./styles/styles";
import useHandleStaffInfo from "./hook/useHandleStaffInfo";

export default function StaffInfoUpdateScreen(props?: { route?: any }) {
    const isRegister = props?.route?.params?.isRegister;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState(1);
    const [gender, setGender] = useState(1);
    const [city, setCity] = useState(1);
    const [district, setDistrict] = useState(1);
    const [showProfile, setShowProfile] = useState(true);

    const { staff, staffImages, setStaffImages, staffGetInfo, updateStaffInfo, registerStaff } =
        useHandleStaffInfo();

    const saveStaffInfo = () => {
        if(isRegister) {
            register();
            return;
        }
        updateStaffInfo({
            id: staff?.id || 0,
            name: name,
            age: age,
            provinceId: city,
            districtId: district,
            gender: gender,
        });
    };

    const register = () => {
        if (isRegister) {
            registerStaff(
                {
                    name,
                    age,
                    gender,
                    images: staffImages,
                    provinceId: city,
                    districtId: district,
                    description: description
                }
            )
            return;
        }
    }

    useEffect(() => {
        if (!isRegister) staffGetInfo();
    }, []);

    useEffect(() => {
        setName(staff?.name || "");
        setAge(staff?.age || 1);
        setDescription(staff?.description || "");
        setGender(staff?.gender || 1);
        setCity(staff?.provinceId || 1);
        setDistrict(staff?.districtId || 1);
    }, [staff?.id]);

    return (
        <ScrollView style={staffInfoUpdateStyle.container}>
            <View style={staffInfoUpdateStyle.toggleContainer}>
                <Text style={staffInfoUpdateStyle.toggleText}>Hiện hồ sơ</Text>
                <Switch value={showProfile} onValueChange={setShowProfile} />
            </View>

            <Text style={staffInfoUpdateStyle.sectionTitle}>
                Thông tin của bạn
            </Text>

            <View style={staffInfoUpdateStyle.imageRow}>
                {staffImages.map((image) =>
                    image ? (
                        <Image
                            source={{ uri: image }}
                            style={staffInfoUpdateStyle.avatar}
                        />
                    ) : (
                        <View style={staffInfoUpdateStyle.placeholder} />
                    )
                )}
            </View>

            {/* Form thông tin */}
            <TextInput
                style={staffInfoUpdateStyle.input}
                placeholder="Tên của bạn"
                value={name || ""}
                onChangeText={(text) => setName(text)}
            />

            <View style={staffInfoUpdateStyle.row}>
                <Text style={staffInfoUpdateStyle.label}>Giới tính</Text>
                <TouchableOpacity
                    onPress={() => setGender(1)}
                    style={[
                        staffInfoUpdateStyle.radio,
                        gender === 1 && staffInfoUpdateStyle.selected,
                    ]}
                >
                    <Text>Nam</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setGender(2)}
                    style={[
                        staffInfoUpdateStyle.radio,
                        gender === 2 && staffInfoUpdateStyle.selected,
                    ]}
                >
                    <Text>Nữ</Text>
                </TouchableOpacity>
            </View>

            <Text style={staffInfoUpdateStyle.label}>Thành phố làm việc</Text>
            <Picker
                selectedValue={city}
                onValueChange={setCity}
                style={staffInfoUpdateStyle.picker}
            >
                <Picker.Item label="Hà Nội" value={1} />
                <Picker.Item label="Ninh Bình" value={2} />
            </Picker>

            <Text style={staffInfoUpdateStyle.label}>Quận làm việc</Text>
            <Picker
                selectedValue={district}
                onValueChange={setDistrict}
                style={staffInfoUpdateStyle.picker}
            >
                <Picker.Item label="Nam Từ Liêm" value={1} />
                <Picker.Item label="Bắc Từ Liêm" value={2} />
            </Picker>

            <Text style={staffInfoUpdateStyle.label}>Mô tả bản thân</Text>
            <TextInput
                style={staffInfoUpdateStyle.textArea}
                multiline
                value={description || ""}
            />

            <TouchableOpacity
                style={staffInfoUpdateStyle.saveBtn}
                onPress={saveStaffInfo}
            >
                <Text style={staffInfoUpdateStyle.saveText}>Lưu</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
