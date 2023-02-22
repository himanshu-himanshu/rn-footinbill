import React from 'react';
import {
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {loginUser} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required('Email is required.')
    .email('Not a valid email.'),
  password: Yup.string().required('Password is required.'),
});

export const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  //const formObject = {email: '', password: ''};
  const formObject = {email: 'test@test.com', password: 'test1234'};

  let performLogin = async values => {
    let payload = {
      email: values.email,
      password: values.password,
    };
    // let response = await dispatch(loginUser(payload));

    // if (response && response.success) {
    //   // AsyncStorage.setItem('userToken', response.token);
    // }
    await dispatch(loginUser(payload));
  };

  return (
    <ScrollView>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          performLogin(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          let {email, password} = values;
          return (
            <>
              <View className="w-full h-screen bg-white">
                <SafeAreaView>
                  <View className="w-full h-full">
                    {/********* Header View **********/}
                    <View className="flex w-full justify-center items-center pt-8 pb-12">
                      <Text className="text-3xl font-Raleway font-bold tracking-wide py-4">
                        Log in
                      </Text>
                      <Text className="font-light text-gray-700">
                        Welcome back, login to continue
                      </Text>
                    </View>

                    {/********* Email & Password View **********/}
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Email"
                        name="email"
                        className="p-4 text-xl text-gray-700 border border-gray-300"
                        keyboardType="default"
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
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
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={true}
                        placeholder="Password"
                        name="password"
                        className="p-4 text-xl text-gray-700 border border-gray-300"
                        keyboardType="default"
                        autoCapitalize="none"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                      />
                      {touched.password && errors.password ? (
                        <Text className="text-red-400 px-1 font-light">
                          {errors.password}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>

                    {/********* Forgot password View **********/}
                    <View className="flex w-[90%] justify-end items-end mt-2 mx-auto">
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('forgotPasswordScreen')
                        }>
                        <Text className="text-gray-400">Forgot Password?</Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Login Button View **********/}
                    <View className="w-[90%] mx-auto shadow-md bg-[#b5e48c] rounded-sm mt-12">
                      <TouchableOpacity
                        onPress={
                          isSubmitting == false ? handleSubmit : handleSubmit
                        }>
                        <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                          Log in
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
                          Sign up
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Social Media View **********/}
                    <View className="flex w-full justify-center items-center mt-14">
                      <Text className="text-gray-400 tracking-wide py-4">
                        Or
                      </Text>
                      <View className="flex flex-row space-x-4">
                        <TouchableOpacity className="p-4 w-[60px] h-[60px] rounded-full flex justify-center items-center">
                          <Image
                            className="h-14 w-14"
                            source={require('../../../assets/images/facebook.png')}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity className="p-4 w-[60px] h-[60px] rounded-full flex justify-center items-center">
                          <Image
                            className="h-12 w-12"
                            source={require('../../../assets/images/google.png')}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
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
{
  /* <View className="body">
                <View style={styles.brandView}>
                  <Text style={[styles.brandText, styles.shadowSm]} >
                    FootInBill
                  </Text>
                </View>
                <View style={styles.welcomeView}>
                  <Text style={[styles.brandText, styles.welcomeText]}>
                    Welcome, log in into your account
                  </Text>
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    placeholder={'Email'}
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    autoCapitalize="none"
                  />

                  {touched.email && errors.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.inputBox}>
                  <TextInput
                    keyboardType="default"
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    placeholder={'Password'}
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.error}>{errors.password}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={[styles.button, styles.shadowSm]}>
                  <TouchableOpacity
                    onPress={
                      isSubmitting == false ? handleSubmit : handleSubmit
                    }>
                    <Text style={styles.buttonText}>Login</Text>
                  </TouchableOpacity>
                </View>

                <View style="flex w-[90%] justify-end items-end mt-2 mx-auto">
                  <TouchableOpacity
                    style={[styles.button, styles.shadowSm]}
                    onPress={() => navigation.navigate('forgotPasswordScreen')}>
                    <Text style={styles.buttonText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <View style="w-90% mx-auto shadow-md bg-primary rounded-sm mt-12">
                  <TouchableOpacity
                    style={styles.signInView}
                    onPress={() => navigation.navigate('registerScreen')}>
                    <Text>
                      Don't have an account?{' '}
                      <Text style={styles.signIn}>Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text className="text-red-800">Hello</Text>
              </View> */
}
export default LoginScreen;
