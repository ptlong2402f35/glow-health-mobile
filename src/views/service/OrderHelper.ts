import { OrderStatus } from "../../models/Order";

export const OrderGetStatusLabelHelper = (status: number) => {
    switch (status) {
        case OrderStatus.Pending: {
            return "Chờ xác nhận";
            break;
        }
        case OrderStatus.Approved: {
            return "Đã chấp nhận";
            break;
        }
        case OrderStatus.Canceled: {
            return "Đã hủy";
            break;
        }
        case OrderStatus.Denied: {
            return "Chờ xác nhận";
            break;
        }
        case OrderStatus.Finished: {
            return "Đã hoàn thành";
            break;
        }
        case OrderStatus.StaffCanceled: {
            return "Đã hủy";
            break;
        }
        default: {
            return "Unknown";
        }
    }
};
