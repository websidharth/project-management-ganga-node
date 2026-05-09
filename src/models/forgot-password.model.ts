export interface verifyEmailModel {
  email: string;
  otp: string;
}

export interface ResetPasswordModel {
  otp: string;
  newPassword: string;
  confirmPassword: string;
}
