import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoadingDialog from "../../../../hook/useLoading";
import AuthService from "../../../../services/authService";
import useUserLoader from "../../../../hook/useUserLoader";
import { useState } from "react";
import StaffServiceApi from "../../../../services/staffServiceApi";
import Staff from "../../../../models/Staff";
import Review from "../../../../models/Review";
import OrderServiceApi from "../../../../services/orderService";

export default function useHandleStaffList() {
    const { location } = useUserLoader();
    const [staffs, setStaffs] = useState<Staff[]>([]);
    const [staffPage, setStaffPage] = useState(1);
    const [staffMaxPage, setStaffMaxPage] = useState(1);
    const [pinnedstaffs, setPinnedStaffs] = useState<Staff[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewPage, setReviewPage] = useState(1);
    const [reviewMaxPage, setReviewMaxPage] = useState(1);

    const getStaffList = async (data: {
        page?: number;
        perPage?: number;
        name?: string;
        init?: boolean;
        serviceGroupId?: number;
    }) => {
        try {
            let resp = await StaffServiceApi.getStaffList({
                page: data?.init ? 1 : staffPage,
                perPage: data?.perPage || 10,
                name: data?.name,
                useCoordinate: location?.lat || location?.long ? true : false,
                coordinateLat: location?.lat || 0,
                coordinateLong: location?.long || 0,
                serviceGroupId: data?.serviceGroupId
            });
            
            setStaffPage(resp.currentPage);
            setStaffMaxPage(resp.pages);
            if (data.init) {
                setStaffs([...resp.data]);
                return;
            }

            console.log("staff list ===", resp);
            setStaffs([...staffs, ...resp.data]);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            setStaffs([]);
        } finally {
        }
    };

    const getPinnedStaffList = async (data: { id?: string }) => {
        try {
            if (!data.id) return;
            let resp = await StaffServiceApi.getPinnedStaffList({
                id: data.id,
            });

            console.log("pinned staff list ===", resp);
            setPinnedStaffs([...resp]);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            setStaffs([]);
        } finally {
        }
    };

    const getAllReview = async (page?: number, init?: boolean) => {
        try {
            let resp = await OrderServiceApi.getReviews({
                page: page,
            });
            console.log("reviews ===", reviews);
            if (init) {
                setReviews([...resp.data]);
                setReviewPage(resp.currentPage);
                setReviewMaxPage(resp.pages);

                return;
            }
            setReviews([...reviews, ...resp.data]);
            setReviewPage(resp.currentPage);
            setReviewMaxPage(resp.pages);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            // setStaffs([]);
        } finally {
        }
    };

    const loadMoreReview = () => {
        if (reviewPage >= reviewMaxPage) return;
        getAllReview(reviewPage + 1);
    };

    const loadMoreStaffs = () => {
        console.log("xxxx load more xxxx");
        if (staffPage >= staffMaxPage) return;
        getAllReview(staffPage + 1);
    };

    return {
        staffs,
        getStaffList,
        pinnedstaffs,
        getPinnedStaffList,
        getAllReview,
        loadMoreReview,
        reviews,
        loadMoreStaffs,
        staffPage
    };
}
