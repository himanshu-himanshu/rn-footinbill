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
    let response = await dispatch(registerUser(payload));

    if (response.code == 200) {
      navigation.navigate('homeScreen');
    } else {
      console.log('res', response);
      alert(response.message);
    }
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
                    <View className="flex w-full justify-center items-center py-12">
                      <Text className="text-3xl font-Raleway font-semibold tracking-wide py-4">
                        Sign up
                      </Text>
                      <Text className="font-light text-gray-700">
                        Please fill details below to create an account
                      </Text>
                    </View>

                    {/********* Username, Email and Password View **********/}
                    <View className="flex w-[90%] justify-center mx-auto my-2 rounded-sm space-y-2 mt-8">
                      <TextInput
                        secureTextEntry={false}
                        placeholder="Username"
                        name="name"
                        className="p-4 text-xl text-gray-600 border border-gray-300"
                        keyboardType="default"
                        autoCorrect="false"
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
                        autoCorrect="false"
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
                        autoCorrect="false"
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
                    <View className="w-[90%] mx-auto shadow-md bg-primary rounded-sm mt-12 bg-[#b5e48c]">
                      <TouchableOpacity onPress={handleSubmit}>
                        <Text className="text-center px-10 py-4 text-gray-700 font-bold text-xl rounded-full">
                          Create account
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {/********* Login View **********/}
                    <View className="flex w-[90%] justify-end items-center mt-12 mx-auto">
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
