import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RequiredSign from '../../utils/RequiredSign';
import {updateProfile} from '../../actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

export const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const state = useSelector(state => console.log('State 123' , state));
  let validationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email('Not a valid email.')
      .required('Email is required.'),
  });

  let formObject = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  let updateProfileAction = async values => {
    dispatch(updateProfile(values));
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          updateProfileAction(values);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          let {id, email, firstName, lastName} = values;
          return (
            <>
              <View style={styles.body}>

                <View style={styles.inputBox}>
                  <Text style={styles.label}>Your Email</Text>
                  <TextInput
                    style={styles.disabledInput}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    defaultValue={user.email}
                    autoCapitalize="none"
                    editable={false}
                    selectTextOnFocus={false}
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.error}>{errors.email}</Text>
                  ) : (
                    ''
                  )}
                </View>
                <View style={styles.inputBox}>
                  <Text style={styles.label}>
                    Your First Name
                    <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    defaultValue={user.firstName}
                    placeholder={'Enter your first name'}
                  />
                  {touched.firstName && errors.firstName ? (
                    <Text style={styles.error}>{errors.firstName}</Text>
                  ) : (
                    ''
                  )}
                </View>

                <View style={styles.inputBox}>
                  <Text style={styles.label}>
                    Your Last Name
                    <RequiredSign />
                  </Text>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    defaultValue={user.lastName}
                    placeholder={'Enter your last name'}
                  />
                  {touched.lastName && errors.lastName ? (
                    <Text style={styles.error}>{errors.lastName}</Text>
                  ) : (
                    ''
                  )}
                </View>
                
                <View style={styles.inputBox}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text style={styles.button}>Update</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputBox}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('updatePasswordScreen', {email : user.email})}>
                    <Text style={styles.passwordButton}>Change Password</Text>
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
    backgroundColor: '#2a2a2a02',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  required: {
    color: 'red',
  },
  label: {
    fontSize: 19,
  },
  inputBox: {
    margin: 5,
    padding: 5,
  },
  error: {
    color: 'red',
    fontSize: 15,
  },
  disabledInput: {
    borderColor: '#00000022',
    borderWidth: 1,
    color: '#00000062',
    textAlign: 'left',
    fontSize: 23,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  input: {
    borderColor: '#00000043',
    borderWidth: 1,
    textAlign: 'left',
    fontSize: 23,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  button: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
  },
  passwordButton: {
    padding: 10,
    fontSize: 24,
    backgroundColor: '#00000062',
    color: 'white',
    textAlign: 'center',
  },
});
export default ProfileScreen;
