import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {sendForgotPasswordOTPEmail} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//import AsyncStorage from '@react-native-community/async-storage';

let validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Not a valid email.')
    .required('Email is required.'),
});
export const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  let formObject = {email: ''};

  let sendForgotPasswordOTPEmailAction = async values => {
    let payload = {
      email: values.email,
    };
    let response = await dispatch(sendForgotPasswordOTPEmail(payload));
    console.log('response on fot password screne', response);
    if (response && response.success) {
      navigation.navigate('verifyForgotPasswordOtpScreen', {
        email: values.email,
      });
    }
  };

  return (
    <ScrollView>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          sendForgotPasswordOTPEmailAction(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let {email} = values;
          return (
            <>
              <View className="w-full h-screen bg-white">
                <SafeAreaView>
                  <View className="w-full h-full">
                    {/********* Header View **********/}
                    <View className="flex w-full justify-center items-center pt-8 pb-12">
                      {/* <Image
                        source={require('../assets/forgot.png')}
                        className="h-40 w-40"
                      /> */}
                      <Image
                        className="h-14 w-14"
                        source={require('../../../assets/images/facebook.png')}
                      />
                      <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                        Reset Password
                      </Text>
                      <Text className="font-light text-gray-700">
                        Enter your registered email to get verification code
                      </Text>
                    </View>

                    {/********* Email View **********/}
                    <View className="flex w-[90%] justify-center border border-gray-300 mx-auto my-2 rounded-sm">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Your Email"
                        name="email"
                        className="p-4 text-xl text-gray-700"
                      />
                    </View>

                    {/********* OTP Button View **********/}
                    <View className="w-[90%] mx-auto shadow-md bg-primary rounded-sm mt-8">
                      <TouchableOpacity
                        onPress={() => navigation.navigate('VerifyOTP')}>
                        <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                          Send OTP
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Signup View **********/}
                    <View className="flex w-[90%] justify-end items-center mt-8 mx-auto">
                      <TouchableOpacity
                        className="flex flex-row space-x-2"
                        onPress={() => navigation.navigate('Signin')}>
                        <Text className="text-gray-500 tracking-wide">
                          Don't have an account?
                        </Text>
                        <Text className="text-[#52b69a] font-bold tracking-wide">
                          Sign in
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Login')}
                      className="flex flex-row items-center w-full justify-center mt-8 space-x-2 text-gray-500">
                      <Text className="text-gray-600">Back to Login</Text>
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

// const styles = StyleSheet.create({
//   body: {
//     flex: 1,
//     backgroundColor: 'white',
//     alignItems: 'stretch',
//     justifyContent: 'flex-start',
//     padding: 16,
//   },
//   imageView: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   textView: {
//     margin: 4,
//     padding: 4,
//   },
//   text: {
//     color: '#7F8487',
//     textAlign: 'center',
//   },
//   enterYourEmailText: {
//     color: '#000',
//     textAlign: 'center',
//     marginTop: 12,
//   },
//   image: {
//     backgroundColor: 'teal',
//     height: 150,
//     width: 150,
//   },
//   inputBox: {
//     margin: 5,
//     padding: 10,
//   },
//   extraInputBox: {
//     margin: 25,
//   },
//   error: {
//     color: 'tomato',
//     fontSize: 14,
//     padding: 5,
//     marginTop: 4,
//   },
//   input: {
//     textAlign: 'left',
//     fontSize: 20,
//     borderRadius: 2,
//     padding: 10,
//     color: '#413F42',
//     borderColor: '#413F42',
//     borderWidth: 0.5,
//   },
//   button: {
//     marginHorizontal: 15,
//     padding: 15,
//     backgroundColor: '#EF912C',
//     borderRadius: 2,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 16,
//     textTransform: 'uppercase',
//     fontWeight: '500',
//   },
//   shadowSm: {
//     shadowColor: '#171717',
//     shadowOffset: {width: -2, height: 4},
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//   },
//   bottomText: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#7F8487',
//   },
//   signUp: {
//     fontWeight: '700',
//     color: '#EF912C',
//     marginLeft: 4,
//   },
//   signUpView: {
//     display: 'flex',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
// });
export default ForgotPasswordScreen;

{
  /* <View style={styles.body}>
  <View style={styles.imageView}>
  <Image
                     source={require('../../../assets/images/forgotpassword.jpg')}
                     style={styles.image}
                  /> 
  </View>
  <View style={styles.textView}>
    <Text style={styles.text}>Don't worry, happens to the best of us</Text>
    <Text style={styles.enterYourEmailText}>
      Enter your email to receive OTP
    </Text>
  </View>
  <View style={styles.inputBox}>
    <TextInput
      style={styles.input}
      onChangeText={handleChange('email')}
      onBlur={handleBlur('email')}
      autoCapitalize="none"
      placeholder="Email"
    />
    {touched.email && errors.email ? (
      <Text style={styles.error}>{errors.email}</Text>
    ) : (
      ''
    )}
  </View>

  <View style={[styles.button, styles.shadowSm]}>
    <TouchableOpacity onPress={handleSubmit}>
      <Text style={styles.buttonText}>Send OTP</Text>
    </TouchableOpacity>
  </View>

  <View style={[styles.inputBox, styles.signUpView]}>
    <Text style={styles.bottomText}>Don't have an account ?</Text>
    <TouchableOpacity onPress={() => navigation.navigate('registerScreen')}>
      <Text style={styles.signUp}>Sign Up</Text>
    </TouchableOpacity>
  </View>
</View>; */
}
