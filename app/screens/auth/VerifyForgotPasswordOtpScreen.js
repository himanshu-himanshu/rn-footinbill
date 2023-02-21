import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {verifyForgotPasswordOTP} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import showSnack from '../../utils/ShowSnack';
// import AsyncStorage from '@react-native-community/async-storage';

let validationSchema = Yup.object({
  otp: Yup.number()
    .min(1, 'Must be 6 digits')
    .max(999999, 'Must be 6 digits')
    .required('OTP is required'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required!')
    .equals([Yup.ref('password'), null], 'Passwords does not match eachother!'),
});
export const VerifyForgotPasswordOtpScreen = ({route, navigation}) => {
  const dispatch = useDispatch();
  let formObject = {otp: '', confirmPassword: '', password: ''};

  let verifyForgotPasswordOTPAction = async values => {
    let payload = {
      otp: values.otp,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    let response = await dispatch(verifyForgotPasswordOTP(payload));
    if (response && response.success) {
      // navigation.navigate('updatePasswordScreen', { email: route.params.email });
      navigation.navigate('loginScreen');
    } else {
      console.log('screen response 0--0 0-o o0-0', response);
      alert(response.message);
    }
  };

  // let resendOtp = async values => {
  //   let payload = {
  //     email: route.params.email,
  //   };

  //   let response = await dispatch(sendForgotPasswordOTPEmail(payload));
  //   if (response && response.success) {
  //     showSnack('OTP resent on the email, please check!');
  //   }
  // };

  return (
    <ScrollView>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          verifyForgotPasswordOTPAction(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let {otp} = values;
          return (
            <>
              <View className="w-full h-screen bg-white">
                <SafeAreaView>
                  <View className="w-full h-full">
                    {/********* Header View **********/}
                    <View className="flex w-full justify-center items-center pt-8 pb-8">
                      {/* <Image
                        source={require('../../../assets/images/otp.png')}
                        className="h-40 w-40"
                      /> */}
                      <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                        Verification
                      </Text>
                      <Text className="font-light text-gray-700 px-4 text-center">
                        Check your mail for verification code
                      </Text>
                    </View>

                    {/********* OTP View **********/}
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Enter OTP"
                        name="otp"
                        keyboardType="numeric"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        autoCapitalize="none"
                      />
                      {touched.otp && errors.otp ? (
                        <Text className="text-red-400 px-1 font-light">
                          {errors.otp}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={true}
                        placeholder="Create password"
                        name="otp"
                        keyboardType="numeric"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        autoCapitalize="none"
                      />
                      {touched.password && errors.password ? (
                        <Text className="text-red-400 px-1 font-light">
                          {errors.password}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={true}
                        placeholder="Confirm password"
                        name="otp"
                        keyboardType="numeric"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        onChangeText={handleChange('otp')}
                        onBlur={handleBlur('otp')}
                        autoCapitalize="none"
                      />
                      {touched.confirmPassword && errors.confirmPassword ? (
                        <Text className="text-red-400 px-1 font-light">
                          {errors.confirmPassword}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    {/********* Verify OTP Button View **********/}
                    <View>
                      <TouchableOpacity className="w-[90%] mx-auto shadow-md bg-primary rounded-sm mt-4">
                        <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                          Verify OTP
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Resend OTP View **********/}
                    <View className="flex w-[90%] justify-end items-center mt-8 mx-auto">
                      <TouchableOpacity
                        className="flex flex-row space-x-2"
                        onPress={() => navigation.navigate('Signin')}>
                        <Text className="text-gray-500 tracking-wide">
                          Haven't recieved yet?
                        </Text>
                        <Text className="text-[#52b69a] font-bold tracking-wide">
                          Resend
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Back to login **********/}
                    <TouchableOpacity
                      onPress={() => navigation.navigate('loginScreen')}
                      className="flex flex-row items-center w-full justify-center mt-8 space-x-2 text-gray-500">
                      <Text className="text-gray-600">
                        &larr; Back to Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </SafeAreaView>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
export default VerifyForgotPasswordOtpScreen;

{
  /* <View style={styles.body}>
     
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={handleChange('otp')}
                    onBlur={handleBlur('otp')}
                    autoCapitalize="none"
                    placeholder="Enter OTP"
                  />
                  {touched.otp && errors.otp ? (
                    <Text style={styles.error}>{errors.otp}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={'New password'}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={styles.inputBox}>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    placeholder={'Confirm password'}
                    secureTextEntry={true}
                  />
                  {touched.confirmPassword && errors.confirmPassword ? (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={[styles.button, styles.shadowSm]}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Update Password</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputBox, styles.signUpView]}>
                  <TouchableOpacity
                    onPress={() => resendOtp(route.params.email)}>
                    <Text style={styles.resendText}>Resend</Text>
                  </TouchableOpacity>
                </View> 

                <View style={[styles.inputBox, styles.signUpView]}>
                  <Text style={styles.bottomText}>Go back to</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('loginScreen')}>
                    <Text style={styles.signUp}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View> */
}
