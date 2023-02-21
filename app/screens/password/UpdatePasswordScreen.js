import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { updatePassword } from '../../actions/authAction';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

let validationSchema = Yup.object({
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string()
    .trim()
    .required('Confirm password is required!')
    .equals([Yup.ref('password'), null], 'Passwords does not match eachother!'),
});
export const UpdatePasswordScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  let formObject = { confirmPassword: '', password: '' };
  
  let performLogin = async values => {
    let payload = {
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: route.params.email,
    };
    

    let response = await dispatch(updatePassword(payload));
    if (response && response.success) {
      
      navigation.navigate('loginScreen');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
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
          let { email, password } = values;
          return (
            <>
              <View style={styles.body}>
                <View style={styles.imageView}>
                  <Image
                    source={require('../../../assets/images/password.jpg')}
                    style={styles.image}
                  />
                </View>
                <View style={styles.textView}>
                  <Text style={styles.checkMail}>Reset Password</Text>
                  <Text style={styles.text}>
                    Create your new password to log into your account
                  </Text>
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
                  <TouchableOpacity
                    onPress={
                      isSubmitting == false ? handleSubmit : handleSubmit
                    }>
                    <Text style={styles.buttonText}>Reset</Text>
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
    height: 150,
    width: 150,
  },
  extraInputBox: {
    margin: 35,
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
    backgroundColor: '#008B8B',
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
    color: '#008B8B',
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
export default UpdatePasswordScreen;
