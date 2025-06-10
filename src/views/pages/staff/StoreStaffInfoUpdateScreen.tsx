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
import { AntDesign } from "@expo/vector-icons";
import useHandleStaffStoreUpdateInfo from "./hook/useHandleStaffStoreUpdateInfo";

export default function StoreStaffInfoUpdateScreen(props?: { route?: any }) {
    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    const isRegister = props?.route?.params?.isRegister;
    const staffId = props?.route?.params?.staffId;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState(18);
    const [gender, setGender] = useState(1);
    const [city, setCity] = useState(0);
    const [district, setDistrict] = useState(0);
    const [phone, setPhone] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");

    const {
        staff,
        staffImages,
        setStaffImages,
        image,
        setImage,
        getStaffDetail,
        createStaffMember,
        updateStaffMember,
    } = useHandleStaffStoreUpdateInfo({ staffId: !isRegister ? staffId : 0 });

    const { provinceList, districtList, initProvinceList, initDistrictList } =
        useHandleStaffInfo();
    const { imagePicker, uploadBulkImage } = useImagePicker();

    const { refresh, onRefresh } = useRefresh();

    const onRefreshScreen = () => {
        const cb = async () => {
            setName(staff?.name || "");
            setAge(staff?.age || 18);
            setDescription(staff?.description || "");
            setGender(staff?.gender || 1);
            setCity(staff?.provinceId || 1);
            setDistrict(staff?.districtId || 0);
            if (!isRegister) getStaffDetail();
            if (isRegister) {
                setPhone("");
                setUserName("");
                setEmail("");
                setStaffImages(Array(6).fill(null));
                setImage(Array(6).fill(null));
            }
            initProvinceList();
        };
        onRefresh(cb);
    };

    const onAddImage = async () => {
        console.log("onADD");
        let resp = await imagePicker();
        if (!resp) return;
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

    const onUpdateImage = async (index?: number, isDelete?: boolean) => {
        if (!index && index != 0) return;
        console.log("on update", index);
        if (isDelete) {
            let tmp = [...staffImages];
            let tmpObj = [...image];
            tmp[index] = null;
            tmpObj[index] = null;
            setStaffImages(tmp);
            setImage(tmpObj);
            return;
        }
        let resp = await imagePicker();
        if (!resp) return;
        console.log("resp ===", resp?.uri);

        let tmp = [...staffImages];
        let tmpObj = [...image];
        tmp[index] = resp?.uri;
        tmpObj[index] = resp;
        setStaffImages(tmp);
        setImage(tmpObj);
    };

    const saveStaffInfo = async () => {
        let uploadImages = [];

        // navigation.navigate("StaffServiceUpdate");

        // // return test
        // return;
        console.log("images= ===", image);
        if (image && image.length) {
            uploadImages = await uploadBulkImage(
                image
                    .filter((val) => typeof val != "string")
                    .filter((val) => val)
            );
        }
        let idx = 0;
        let idxList = 0;
        let finalImages = [...image].filter((val) => val);
        console.log("xxxx", finalImages);
        for (let _ of finalImages) {
            if (typeof finalImages[idxList] != "string" && uploadImages[idx]) {
                finalImages[idxList] = uploadImages[idx];
                idx++;
            }
            idxList++;
        }
        let urlImage = finalImages.shift();

        if (isRegister) {
            register(finalImages, urlImage);
            return;
        }
        updateStaffMember({
            id: staff?.id || 0,
            name: name,
            age: age,
            provinceId: city,
            districtId: district,
            gender: gender,
            description,
            images: finalImages,
            urlImage,
        });

        navigation.navigate("StoreStaffService", {
            staffId: staff?.id,
        } as never);
    };

    const register = (images?: string[], urlImage?: string) => {
        if (isRegister) {
            createStaffMember({
                phone,
                userName,
                email,
                name,
                age,
                gender,
                images: images,
                provinceId: city,
                districtId: district,
                description: description,
                urlImage: urlImage,
                onSuccess: (id?: number) => {
                    if (!id) navigation.navigate("StoreStaffManager");
                    navigation.navigate("StoreStaffService", {
                        staffId: id,
                    } as never);
                },
            });
            return;
        }
    };

    useEffect(() => {
        if (!isRegister) getStaffDetail(staffId);
        else {
            // setStaffImages(Array(6).fill(null));
            // setImage(Array(6).fill(null));
        }
        initProvinceList();
    }, []);

    useEffect(() => {
        if (city === 0) return;
        initDistrictList("", city, (value?: number) => setDistrict(value || 0));
    }, [city]);
    useEffect(() => {
        setName(staff?.name || "");
        setAge(staff?.age || 18);
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
                    {isRegister ? "Đăng kí KTV" : "Thông tin KTV"}
                </Text>
            </View>

            <View style={staffInfoUpdateStyle.imageRow}>
                {staffImages.map((image, index) =>
                    image ? (
                        <View
                            key={index + "image"}
                            style={staffInfoUpdateStyle.placeholder}
                        >
                            <AntDesign
                                style={staffInfoUpdateStyle.deleteIcon}
                                name="closecircle"
                                size={18}
                                color="red"
                                onPress={() => onUpdateImage(index, true)}
                            />
                            <TouchableOpacity
                                onPress={() => onUpdateImage(index)}
                                style={[staffInfoUpdateStyle.placeholderInit]}
                            >
                                <Image
                                    source={{ uri: image }}
                                    style={staffInfoUpdateStyle.avatar}
                                />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <TouchableOpacity
                            key={index + "image"}
                            onPress={onAddImage}
                            style={[
                                staffInfoUpdateStyle.placeholder,
                                staffInfoUpdateStyle.placeholderInit,
                            ]}
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

            {isRegister ? (
                <View>
                    <Text style={staffInfoUpdateStyle.label}>
                        Số điện thoại *
                    </Text>
                    <TextInput
                        style={staffInfoUpdateStyle.input}
                        placeholder="Số điện thoại"
                        value={phone || ""}
                        onChangeText={(phone) => setPhone(phone)}
                    />
                    <Text style={staffInfoUpdateStyle.label}>Email</Text>
                    <TextInput
                        style={staffInfoUpdateStyle.input}
                        placeholder="Email"
                        value={email || ""}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
            ) : (
                <View></View>
            )}

            <Text style={staffInfoUpdateStyle.label}>Họ tên</Text>
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
