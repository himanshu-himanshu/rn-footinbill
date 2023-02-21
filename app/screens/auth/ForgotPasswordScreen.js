import React from 'react';
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
                      <Image
                        source={require('../../../assets/images/forgot.png')}
                        className="h-40 w-40"
                      />
                      <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                        Reset Password
                      </Text>
                      <Text className="font-light text-gray-700">
                        Enter your registered email to get verification code
                      </Text>
                    </View>

                    {/********* Email View **********/}
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Your Email"
                        name="email"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        autoCapitalize="none"
                      />
                      {touched.email && errors.email ? (
                        <Text className="text-red-400 px-1 font-light">
                          {errors.email}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    {/********* OTP Button View **********/}
                    <View className="w-[90%] mx-auto shadow-md bg-primary rounded-sm mt-8">
                      <TouchableOpacity onPress={handleSubmit}>
                        <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                          Send OTP
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Signup View **********/}
                    <View className="flex w-[90%] justify-end items-center mt-8 mx-auto">
                      <TouchableOpacity
                        className="flex flex-row space-x-2"
                        onPress={() => navigation.navigate('registerScreen')}>
                        <Text className="text-gray-500 tracking-wide">
                          Don't have an account?
                        </Text>
                        <Text className="text-[#52b69a] font-bold tracking-wide">
                          Sign in
                        </Text>
                      </TouchableOpacity>
                    </View>
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

export default ForgotPasswordScreen;

{
  /* 
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
