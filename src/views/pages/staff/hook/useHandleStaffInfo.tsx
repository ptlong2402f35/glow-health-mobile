import { useState } from "react";
import AuthService from "../../../../services/authService";
import Staff from "../../../../models/Staff";
import StaffServiceApi from "../../../../services/staffServiceApi";
import useLoadingDialog from "../../../../hook/useLoading";
import LocationService from "../../../../services/locationService";
import useUserLoader from "../../../../hook/useUserLoader";

export default function useHandleStaffInfo() {
    const {reloadMe} = useUserLoader();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [staffImages, setStaffImages] = useState<any[]>([]);
    const [image, setImage] = useState<any[]>([]);
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const [provinceList, setProvinceList] = useState([{label: "Chọn thành phố", value: 1}]);
    const [districtList, setDistrictList] = useState([{label: "Chọn thành phố trước", value: 0}]);
    
    const initProvinceList = async(search?: string) => {
        try {
            let data = await LocationService.getProvinceList({search: search || ""});
            setProvinceList(data.map((item: any) => (
                {
                    label: item.name,
                    value: item.id
                }
            )));
        }
        catch (err) {
            console.error(err);
        }
    }

    const initDistrictList = async(search?: string, provinceId?: number, autoSelect?: (value?: number) => void) => {
        try {
            let data = await LocationService.getDistrictList({search: search || "", provinceId: provinceId});
            setDistrictList(data.map((item: any) => (
                {
                    label: item.name,
                    value: item.id
                }
            )));
            autoSelect?.(data?.[0]?.value);
        }
        catch (err) {
            console.error(err);
        }
    }
    

    const staffGetInfo = async () => {
        try {
            openLoadingDialog?.();
            let data = await AuthService.me();
            let images = Array(6).fill(null);
            let totalImages = [...(data.staff.images || [])];
            if(data.urlImage) totalImages.unshift(data.urlImage);
            for (let i = 0; i < totalImages.length; i++) {
                images[i] = totalImages[i];
            }
            setStaff(data.staff);
            setStaffImages(images);
            setImage(images);
        } catch (err) {
        } finally {
            closeLoadingDialog?.();
        }
    };

    const updateStaffInfo = async (props: {
        id: number;
        name?: string;
        age?: number;
        provinceId?: number;
        districtId?: number;
        images?: string[];
        gender?: number;
        description?: string;
        urlImage?: string;
    }) => {
        try {
            if (!props.id) return;
            console.log("props====", props);
            openLoadingDialog?.();
            await StaffServiceApi.updateStaffDetail(props);
            reloadMe?.();
        } catch (err) {
            console.error(err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const registerStaff = async (props: {
        name?: string;
        age?: number;
        gender?: number;
        images?: string[];
        address?: string;
        provinceId?: number;
        districtId?: number;
        communeId?: number;
        type?: number;
        description?: string;
        urlImage?: string;
    }) => {
        try {
            openLoadingDialog?.();
            await StaffServiceApi.registerStaff(props);
            reloadMe?.();
        } catch (err) {
            console.error(err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    return {
        staffGetInfo,
        updateStaffInfo,
        staff,
        staffImages,
        setStaffImages,
        registerStaff,
        provinceList,
        districtList,
        initProvinceList,
        initDistrictList,
        image,
        setImage
    };
}
