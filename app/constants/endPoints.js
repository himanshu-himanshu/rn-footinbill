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
  getAllGroups: 'groups',
  createAGroup: 'groups',
  getAllFriends: 'user/friend',
  createAFriend: 'user/friend',
  logOutUser: 'logOutUser',
  getAuthUser: 'auth/me',
  getAGroup: 'groups',
};
export default EndPoints;
