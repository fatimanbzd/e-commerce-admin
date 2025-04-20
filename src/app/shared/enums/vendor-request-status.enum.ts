export enum VendorRequestStatusEnum {
  initialRegistration = 0,
  contractRequest = 4,
  confirmInformation = 6,
  rejectInformation = 8,
  final = 10,
  cancelContract = 12,
  Expired = 14,
}

export const VendorRequestStatusLabel: {
  [key in VendorRequestStatusEnum]: string;
} = {
  [VendorRequestStatusEnum.initialRegistration]: 'ثبت اولیه',
  [VendorRequestStatusEnum.contractRequest]: 'درخواست قرارداد',
  [VendorRequestStatusEnum.confirmInformation]: 'تایید اطلاعات',
  [VendorRequestStatusEnum.rejectInformation]: 'رد اطلاعات',
  [VendorRequestStatusEnum.final]: 'نهایی سازی قرارداد',
  [VendorRequestStatusEnum.cancelContract]: 'لغو قرارداد',
  [VendorRequestStatusEnum.Expired]: 'انقضاء یافته',
};
