import { useState } from "react";

export enum LoadingType {
	Circle = 1,
	Bars = 2,
}

export type LoadingDialogType = {
	open: boolean;
	onClose?: () => void;
	type?: LoadingType | null;
	label?: string | null;
	afterClose?: () => void;
};

export default function useAttachLoadingDialog(props: {}) {
	const onClose = () => {
		setDialogState((pState) => ({
			...pState,
			open: false,
		}));
	};

	const [dialogState, setDialogState] = useState<LoadingDialogType>({
		open: false,
		type: LoadingType.Circle,
		onClose: onClose,
	});

	const openLoadingDialog = (label?: string | null, afterClose?: () => void) => {
		console.log(`useAttachLoadingDialog openLoadingDialog`);
		setDialogState({
			open: true,
			label: label,
			afterClose: afterClose,
			onClose: onClose,
		});
	};

	const closeLoadingDialog = () => {
		setDialogState({
			open: false,
			type: LoadingType.Circle,
			onClose: onClose,
		});
	};

	return {
		dialogState,
		openLoadingDialog,
		closeLoadingDialog,
	};
}
