import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  verifyForgotPasswordOTP
} from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
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
export const VerifyForgotPasswordOtpScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  let formObject = { otp: '', confirmPassword: '', password: '' };


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
    <ScrollView contentContainerStyle={styles.body}>
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
          let { otp } = values;
          return (
            <>
              <View style={styles.body}>
                <View style={styles.imageView}>
                  <Image
                    source={require('../../../assets/images/email.jpg')}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.checkMail}>Check your mail</Text>
                  <Text style={styles.text}>
                    We have sent a verification code to your mail for recovering
                    your password
                  </Text>
                </View>

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

                {/* <View style={[styles.inputBox, styles.signUpView]}>
                  <TouchableOpacity
                    onPress={() => resendOtp(route.params.email)}>
                    <Text style={styles.resendText}>Resend</Text>
                  </TouchableOpacity>
                </View> */}

                <View style={[styles.inputBox, styles.signUpView]}>
                  <Text style={styles.bottomText}>Go back to</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('loginScreen')}>
                    <Text style={styles.signUp}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  textView: {
    margin: 4,
    padding: 4,
  },
  text: {
    color: '#7F9489',
    textAlign: 'center',
    marginVertical: 8,
  },
  imageView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    backgroundColor: 'teal',
    height: 50,
    width: 50,
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
  greenText: {
    color: 'green',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    textAlign: 'left',
    fontSize: 20,
    borderRadius: 2,
    padding: 10,
    color: '#413F42',
    borderColor: '#413F42',
    borderWidth: 0.5,
  },
  button: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#EF912C',
    borderRadius: 2,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  shadowSm: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  resendButton: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
  checkMail: {
    fontSize: 28,
    color: '#333333',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  bottomText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#7F8487',
  },
  resendText: {
    fontWeight: '700',
    color: '#333333',
    marginLeft: 4,
    fontSize: 18,
  },
  signUp: {
    fontWeight: '700',
    color: '#EF912C',
    marginLeft: 4,
  },
  signUpView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
});
export default VerifyForgotPasswordOtpScreen;
