import AsyncStorage from "@react-native-async-storage/async-storage";
import useLoadingDialog from "../../../../hook/useLoading";
import AuthService from "../../../../services/authService";
import useUserLoader from "../../../../hook/useUserLoader";
import { useState } from "react";
import StaffServiceApi from "../../../../services/staffServiceApi";
import Staff from "../../../../models/Staff";
import Review from "../../../../models/Review";
import OrderServiceApi from "../../../../services/orderService";

export default function useHandleStaffDetail() {
    const [staff, setStaff] = useState<Staff | null>(null);
    const [priceIds, setPriceIds] = useState<number[]>([]);
    const [totalMoney, setTotalMoney] = useState<number>(0);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewPage, setReviewPage] = useState(1);
    const [reviewMaxPage, setReviewMaxPage] = useState(1);
    const getStaffDetail = async (data: { id: number }) => {
        try {
            let resp = await StaffServiceApi.getStaffDetail({
                id: data.id,
            });

            console.log("staff list ===", resp);
            setStaff(resp);
        } catch (err: any) {
            let message = err?.response?.data.message || "";
            setStaff(null);
        } finally {
        }
    };

    const getStaffReview = async (props: {
        page?: number;
        init?: boolean;
        staffId?: number;
    }) => {
        try {
            if (!props.staffId) setReviews([]);
            let resp = await OrderServiceApi.getStaffReviews({
                page: props.page,
                staffId: props.staffId,
            });
            console.log("reviews acd ===", reviews);
            if (props.init) {
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
        } finally {
        }
    };

    const loadMoreReview = (staffId?: number) => {
        if (reviewPage >= reviewMaxPage) return;
        getStaffReview({ page: reviewPage + 1, staffId: staffId, init: true });
    };

    return {
        staff,
        getStaffDetail,
        priceIds,
        setPriceIds,
        totalMoney,
        setTotalMoney,
        getStaffReview,
        loadMoreReview,
        reviews,
    };
}
