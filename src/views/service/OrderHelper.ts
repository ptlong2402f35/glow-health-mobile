import { OrderStatus } from "../../models/Order";

export const OrderGetStatusLabelHelper = (status: number) => {
    switch (status) {
        case OrderStatus.Pending: {
            return "Chờ xác nhận";
        }
        case OrderStatus.Approved: {
            return "Đã chấp nhận";
        }
        case OrderStatus.Canceled: {
            return "Đã hủy";
        }
        case OrderStatus.Denied: {
            return "Chờ xác nhận";
        }
        case OrderStatus.Finished: {
            return "Đã hoàn thành";
        }
        case OrderStatus.StaffCanceled: {
            return "Đã hủy";
        }
        default: {
            return "Unknown";
        }
    }
};
