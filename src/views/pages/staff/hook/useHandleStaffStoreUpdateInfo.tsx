import { useState } from "react";
import useLoadingDialog from "../../../../hook/useLoading";
import StoreOwnerApi from "../../../../services/storeService";
import Staff from "../../../../models/Staff";

export default function useHandleStaffStoreUpdateInfo(props: {
    staffId?: number;
}) {
    const { openLoadingDialog, closeLoadingDialog } = useLoadingDialog();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [staffServices, setStaffServices] = useState<any[]>([]);
    const [staffImages, setStaffImages] = useState<any[]>(Array(6).fill(null));
    const [image, setImage] = useState<any[]>(Array(6).fill(null));

    const getStaffDetail = async (id?: number) => {
        try {
            openLoadingDialog?.();
            if (!id) return;
            let data = await StoreOwnerApi.getStaffMemberDetail({ id: id });
            setStaff(data);
            let images = Array(6).fill(null);
            let totalImages = [...(data.images || [])];
            if (data?.user?.urlImage) totalImages.unshift(data?.user?.urlImage);
            for (let i = 0; i < totalImages.length; i++) {
                images[i] = totalImages[i];
            }
            setStaffImages(images);
            setImage(images);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const getStaffMemberStaffService = async (id?: number) => {
        try {
            openLoadingDialog?.();
            if (!id) return;
            let data = await StoreOwnerApi.getStaffServiceMember({ id: id });
            setStaffServices(data);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const createStaffMember = async (props: {
        phone: string;
        userName: string;
        email?: string;
        name?: string;
        age?: number;
        gender?: number;
        images?: string[];
        address?: string;
        provinceId?: number;
        type?: number;
        districtId?: number;
        description?: string;
        urlImage?: string;
        onSuccess?: (id?: number) => void;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.createStaffMember(props);
            setStaff(data);
            props?.onSuccess?.(data.id || 0);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const updateStaffMember = async (props: {
        id: number;
        name?: string;
        age: number;
        gender?: number;
        images?: string[];
        address?: string;
        provinceId?: number;
        type?: number;
        districtId?: number;
        urlImage?: string;
        description?: string;
    }) => {
        try {
            openLoadingDialog?.();
            if (!props.id) return;
            let data = await StoreOwnerApi.updateStaffMember(props);
            // await reloadStaffInfo?.();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const updateStaffMemberStaffService = async (props: {
        data?: any;
        id?: number;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.updateStaffServiceMember(props);
            await reloadStaffService();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const createStaffMemberStaffService = async (props: {
        staffId?: number;
        name?: string;
        code?: string;
        description?: string;
        serviceGroupId?: number;
        serviceId?: number;
    }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.createStaffServiceMember(props);
            await reloadStaffService();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const deleteStaffMemberStaffService = async (props: { id: number }) => {
        try {
            openLoadingDialog?.();
            let data = await StoreOwnerApi.deleteStaffServiceMember(props);
            await reloadStaffService();
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            console.log("error message:", err);
        } finally {
            closeLoadingDialog?.();
        }
    };

    const reloadStaffInfo = async () => {
        getStaffDetail(props?.staffId);
    };

    const reloadStaffService = async () => {
        getStaffMemberStaffService(props?.staffId);
    };

    return {
        staff,
        staffServices,
        staffImages,
        setStaffImages,
        image,
        setImage,
        getStaffDetail,
        getStaffMemberStaffService,
        createStaffMember,
        updateStaffMember,
        createStaffMemberStaffService,
        updateStaffMemberStaffService,
        deleteStaffMemberStaffService,
    };
}
