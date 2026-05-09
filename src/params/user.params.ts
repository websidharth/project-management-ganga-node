

export interface UserFilterParams {
  email?: string;
  phoneNumber?: string;
  isActive?: boolean;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  twoFactorEnabled?: boolean;
  firstName?: string;
  lastName?: string;
  search?: string; // Search in firstName, lastName or email
}
