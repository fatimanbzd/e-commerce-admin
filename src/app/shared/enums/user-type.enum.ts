export enum UserTypeEnum {
    admin = 10,
    vendor = 20,
    client = 12
}

export const UserTypeLabel: Record<UserTypeEnum, string> = {
    [UserTypeEnum.admin]: 'راهبر',
    [UserTypeEnum.vendor]: 'پذیرنده',
    [UserTypeEnum.client]: 'مشتری'
}
