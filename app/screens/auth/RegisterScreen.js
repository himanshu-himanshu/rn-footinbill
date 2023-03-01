import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {registerUser} from '../../actions/authAction';
import {useDispatch} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Username is required')
    .trim()
    .min(4, 'More than 3 characters only!'),
  email: Yup.string().required('Email is required').email('Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .trim()
    .min(8, 'Password is too short'),
});

export const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const formObject = {
    name: '',
    email: '',
    password: '',
  };

  let performRegister = async values => {
    let payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    console.log('Performing register');
    await dispatch(registerUser(payload));
  };

  return (
    <ScrollView>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          performRegister(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <>
              <View className="w-full h-screen bg-white">
                <SafeAreaView>
                  <View className="w-full h-full">
                    {/********* Header View **********/}
                    <View className="flex w-full justify-center items-center pt-8 pb-10">
                      <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                        Sign up
                      </Text>
                      <Text className="font-light text-gray-700">
                        Please fill details below to create an account
                      </Text>
                    </View>

                    {/********* Username, Email and Password View **********/}
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Username"
                        name="name"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        keyboardType="default"
                        // value={formObject.name}
                        onBlur={handleBlur('name')}
                        onChangeText={handleChange('name')}
                        autoCapitalize="none"
                      />
                      {touched.name && errors.name ? (
                        <Text className="text-red-400 px-1 font-light">
                          {errors.name}
                        </Text>
                      ) : (
                        ''
                      )}
                    </View>
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Enter Email"
                        name="email"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        keyboardType="default"
                        // value={formObject.email}
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
                        placeholder="Choose Password"
                        name="password"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        keyboardType="default"
                        // value={formObject.password}
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

                    {/********* Signin Button View **********/}
                    <View className="w-[90%] mx-auto shadow-md bg-primary rounded-sm mt-6 bg-[#b5e48c]">
                      <TouchableOpacity onPress={handleSubmit}>
                        <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                          Create account
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Login View **********/}
                    <View className="flex w-[90%] justify-end items-center mt-8 mx-auto">
                      <TouchableOpacity
                        className="flex flex-row space-x-2"
                        onPress={() => navigation.navigate('loginScreen')}>
                        <Text className="text-gray-500 tracking-wide">
                          Already have an account?
                        </Text>
                        <Text className="text-[#52b69a] font-bold tracking-wide">
                          Log in
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Social Media View **********/}
                    <View className="flex w-full justify-center items-center mt-6">
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

export default RegisterScreen;

{
  /*
              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  // value={formObject.name}
                  placeholder={'Name'}
                  onBlur={handleBlur('name')}
                  onChangeText={handleChange('name')}
                  autoCapitalize="none"
                />
                {touched.name && errors.name ? (
                  <Text style={styles.error}>{errors.name}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  // value={formObject.email}
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
                  // value={formObject.password}
                  autoCapitalize="none"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={'Create password'}
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
                  keyboardType="default"
                  style={styles.input}
                  // value={formObject.confirmPassword}
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
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View> */
}
