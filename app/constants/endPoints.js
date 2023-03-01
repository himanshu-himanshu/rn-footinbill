const EndPoints = {
  signIn: 'auth/login',
  googleLogin: 'users/googleSignIn',
  signUp: 'auth/register',
  updateProfile: 'users/updateProfile',
  sendForgotPasswordOTPEmail: 'recover',
  verifyOtp: 'recover',
  resendOtp: 'users/signUpResendOtp',
  updatePassword: 'users/updatePassword',
  changePassword: 'profile/password',
  logOutUser: 'logOutUser',
  getAuthUser: 'auth/me',
};
export default EndPoints;
