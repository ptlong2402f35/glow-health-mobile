import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Switch,
    RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { staffInfoUpdateStyle } from "./styles/styles";
import useHandleStaffInfo from "./hook/useHandleStaffInfo";
import BackButton from "../../../common/components/BackButton";
import useRefresh from "../../../hook/useRefresh";
import Ionicons from "@expo/vector-icons/Ionicons";
import useImagePicker from "../../../hook/useImagePicker";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function StaffInfoUpdateScreen(props?: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const isRegister = props?.route?.params?.isRegister;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState(1);
    const [gender, setGender] = useState(1);
    const [city, setCity] = useState(0);
    const [district, setDistrict] = useState(0);

    const {
        staff,
        staffImages,
        setStaffImages,
        staffGetInfo,
        updateStaffInfo,
        registerStaff,
        provinceList,
        districtList,
        initProvinceList,
        initDistrictList,
        image,
        setImage
    } = useHandleStaffInfo();
    const { imagePicker, uploadBulkImage } = useImagePicker();

    const { refresh, onRefresh } = useRefresh();

    const onRefreshScreen = () => {
        const cb = async () => {
            setName(staff?.name || "");
            setAge(staff?.age || 1);
            setDescription(staff?.description || "");
            setGender(staff?.gender || 1);
            setCity(staff?.provinceId || 1);
            setDistrict(staff?.districtId || 0);
            if (!isRegister) staffGetInfo();
            initProvinceList();
        };
        onRefresh(cb);
    };

    const onAddImage = async () => {
        console.log("onADD");
        let resp = await imagePicker();
        console.log("resp ===", resp?.uri);
        console.log("on add xxx", staffImages);
        let tmp = [];
        let tmpObj = [];
        let onAdd = false;
        for (let img of staffImages) {
            if (!img && !onAdd) {
                img = resp?.uri;
                console.log("image ===", img);
                tmp.push(img);
                onAdd = true;
                continue;
            }
            tmp.push(img);
        }
        let onAddObj = false;
        for (let img of image) {
            if (!img && !onAddObj) {
                tmpObj.push(resp);
                onAddObj = true;
                continue;
            }
            tmpObj.push(img);
        }
        setStaffImages(tmp);
        setImage(tmpObj);
    };

    const onUpdateImage = async (index?: number) => {
        if (!index && index != 0) return;
        console.log("on update", index);
        let resp = await imagePicker();
        console.log("resp ===", resp?.uri);

        let tmp = [...staffImages];
        let tmpObj = [...image];
        tmp[index] = resp?.uri;
        tmpObj[index] = resp;
        setStaffImages(tmp);
        setImage(tmpObj);
    };

    const saveStaffInfo = async () => {
        console.log("name", name);
        console.log("description", description);
        console.log("city", city);
        console.log("district", district);
        console.log("gender", gender);
        let uploadImages = [];

        navigation.navigate("StaffServiceUpdate");

        // return test
        return;
        if(image && image.length) {
            uploadImages = await uploadBulkImage(image.filter(val => typeof val != "string").filter(val => val));
        }
        let idx = 0;
        let idxList = 0;
        let finalImages = [...image].filter(val => val);
        console.log("xxxx", uploadImages);
        for(let _ of finalImages) {
            if(typeof finalImages[idxList] != "string") {
                finalImages[idxList] = uploadImages[idx];
                idx++;
            }
            idxList++;
        }

        console.log("finishImages", finalImages);

        if (isRegister) {
            register(finalImages);
            return;
        }
        updateStaffInfo({
            id: staff?.id || 0,
            name: name,
            age: age,
            provinceId: city,
            districtId: district,
            gender: gender,
            description,
            images: finalImages
        });
    };

    const register = (images?: string[]) => {
        if (isRegister) {
            registerStaff({
                name,
                age,
                gender,
                images: images,
                provinceId: city,
                districtId: district,
                description: description,
            });
            return;
        }
    };

    useEffect(() => {
        if (!isRegister) staffGetInfo();
        initProvinceList();
    }, []);

    useEffect(() => {
        if (city === 0) return;
        initDistrictList("", city);
    }, [city]);
    console.log("images ===", image.filter(val =>val).length);
    useEffect(() => {
        setName(staff?.name || "");
        setAge(staff?.age || 1);
        setDescription(staff?.description || "");
        setGender(staff?.gender || 1);
        setCity(staff?.provinceId || 1);
        setDistrict(staff?.districtId || 0);
    }, [staff?.id]);

    return (
        <ScrollView
            style={staffInfoUpdateStyle.container}
            refreshControl={
                <RefreshControl
                    refreshing={refresh || false}
                    onRefresh={onRefreshScreen}
                />
            }
        >
            <BackButton left={1} top={1} />
            <View style={staffInfoUpdateStyle.titleContainer}>
                <Text style={staffInfoUpdateStyle.sectionTitle}>
                    Thông tin của bạn
                </Text>
            </View>

            <View style={staffInfoUpdateStyle.imageRow}>
                {staffImages.map((image, index) =>
                    image ? (
                        <TouchableOpacity
                            key={index + "image"}
                            style={staffInfoUpdateStyle.placeholder}
                            onPress={() => onUpdateImage(index)}
                        >
                            <Image
                                source={{ uri: image }}
                                style={staffInfoUpdateStyle.avatar}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            key={index + "image"}
                            onPress={onAddImage}
                            style={staffInfoUpdateStyle.placeholder}
                        >
                            <Ionicons
                                name="add-sharp"
                                size={24}
                                color="black"
                            />
                        </TouchableOpacity>
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
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#ccc",
                }}
            >
                <Picker
                    selectedValue={city}
                    onValueChange={setCity}
                    style={staffInfoUpdateStyle.picker}
                >
                    {provinceList.map((province, index) => (
                        <Picker.Item
                            key={index + "pr"}
                            label={province.label}
                            value={province.value}
                        />
                    ))}
                </Picker>
            </View>

            <Text style={staffInfoUpdateStyle.label}>Quận làm việc</Text>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: "#ccc",
                }}
            >
                <Picker
                    selectedValue={district}
                    onValueChange={setDistrict}
                    style={staffInfoUpdateStyle.picker}
                >
                    {districtList.map((district, index) => (
                        <Picker.Item
                            key={index + "dis"}
                            label={district.label}
                            value={district.value}
                        />
                    ))}
                </Picker>
            </View>

            <Text style={staffInfoUpdateStyle.label}>Mô tả bản thân</Text>
            <TextInput
                style={staffInfoUpdateStyle.textArea}
                multiline
                value={description || ""}
                onChangeText={(text: any) => setDescription(text)}
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
