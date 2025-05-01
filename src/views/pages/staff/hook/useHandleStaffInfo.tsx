import { useState } from "react";
import AuthService from "../../../../services/authService";
import Staff from "../../../../models/Staff";
import StaffServiceApi from "../../../../services/staffServiceApi";
import useLoadingDialog from "../../../../hook/useLoading";

export default function useHandleStaffInfo() {
    const [staff, setStaff] = useState<Staff | null>(null);
    const [staffImages, setStaffImages] = useState<any[]>([]);
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();

    const staffGetInfo = async () => {
        try {
            openLoadingDialog?.();
            let data = await AuthService.me();
            let images = Array(6).fill(null);
            for (let i = 0; i < images.length; i++) {
                images[i] = data.staff.images[i];
            }
            setStaff(data.staff);
            setStaffImages(images);
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
    }) => {
        try {
            if (!props.id) return;
            openLoadingDialog?.();
            await StaffServiceApi.updateStaffDetail(props);
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
    }) => {
        try {
            openLoadingDialog?.();
            await StaffServiceApi.registerStaff(props);
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
    };
}
