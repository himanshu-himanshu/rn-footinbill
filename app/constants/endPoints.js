const EndPoints = {
  signIn: 'auth/login',
  googleLogin: 'users/googleSignIn',
  signUp: 'auth/register',
  addPatient: 'users/patients',
  updateProfile: 'users/updateProfile',
  getAPatientsInfo: 'users/patients',
  getAllTestsOfAPatient: 'users/patients',
  addATestResult: 'users/patients',
  getATestResult: 'users/patients',
  verifyOtp: 'users/verifyOTP',
  sendForgotPasswordOTPEmail: 'recover',
  resendOtp: 'users/signUpResendOtp',
  updatePassword: 'users/updatePassword',
  logOutUser: 'logOutUser',
};
export default EndPoints;
