import * as ImagePicker from "expo-image-picker";
import useLoadingDialog from "./useLoading";
const CLIENT_ID = "659a413955c34c1";
const CLOUD_NAME = "dqupwgg4q";
const UPLOAD_PRESET = "glow-health";

export default function useImagePicker() {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const uploadImage = async (image: any, list?: any[]) => {
        const imageUri = image.uri;
        try {
            openLoadingDialog?.();
            let data: any = new FormData();
            data.append("file", {
                uri: imageUri,
                type: "image/jpeg",
                name: "upload.jpg",
            });
            data.append("upload_preset", `${UPLOAD_PRESET}`);
            data.append("cloud_name", `${CLOUD_NAME}`);
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                {
                    method: "POST",
                    body: data,
                }
            );

            const json = await res.json();
            console.log("Cloudinary response:", json);
            // alert(`Upload thành công! , Link: ${json.secure_url}`);

            return json.secure_url || "";
        } catch (error) {
            console.error(error);
            // alert("Lỗi Không thể upload ảnh.");
        } finally {
            closeLoadingDialog?.();
        }
    };

    const imagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            // base64: true,
            quality: 1,
        });

        if (!result.canceled) {
            return result.assets[0];
        }
    };

    const uploadBulkImage = async (images: any[]) => {
        let res: any[] = [];
        console.log("dsfsagwrshgfdsahrqewhgqrfsedwherahb", images.length);
        for (let item of images) {
            if (!item) continue;
            let link = await uploadImage(item);
            console.log("dsfsagwrshgfdsahrqewhgqrfsedwherahb", link);
            res.push(link);
        }

        console.log("res === ", res);
        return res;
    };

    return {
        imagePicker,
        uploadImage,
        uploadBulkImage,
    };
}
