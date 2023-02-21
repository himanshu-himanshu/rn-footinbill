import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {addATestResult} from '../../actions/testAction';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  risk: Yup.string()
    .trim()
    .min(4, 'More than 3 characters only!')
    .required('Risk is required!'),
  bloodPressureLow: Yup.number(
    'Should only be numeric value in mm Hg',
  ).required('Low BP value is required!'),
  bloodPressureHigh: Yup.number(
    'Should only be numeric value in mm Hg',
  ).required('High BP value is required!'),
  respiratoryRate: Yup.number().required(
    'Respiratory rate is required! in BPM',
  ),
});

export const AddATestResultScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const formObject = {
    risk: '',
    bloodPressureLow: '',
    bloodPressureHigh: '',
    respiratoryRate: '',
  };

  let performAddition = async values => {
    let payload = {
      risk: values.risk,
      bloodPressureLow: values.bloodPressureLow,
      bloodPressureHigh: values.bloodPressureHigh,
      respiratoryRate: values.respiratoryRate,
      userId: route.params.patientId,
    };
    const output = await dispatch(addATestResult(payload, navigation));

    // if (output.success == true) {
    //   navigation.navigate('viewAPatientScreen', { 'patientId': route.params.patientId })
    // }
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Formik
        initialValues={formObject}
        validationSchema={validationSchema}
        onSubmit={(values, formikActions) => {
          performAddition(values);
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
              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter patient's Lowest BP level in mm Hg
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onBlur={handleBlur('bloodPressureLow')}
                  onChangeText={handleChange('bloodPressureLow')}
                  placeholder={'Enter blood pressure low value'}
                />
                {touched.bloodPressureLow && errors.bloodPressureLow ? (
                  <Text style={styles.error}>{errors.bloodPressureLow}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter patient's Highest BP level in mm Hg
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onBlur={handleBlur('bloodPressureHigh')}
                  onChangeText={handleChange('bloodPressureHigh')}
                  placeholder={'Enter blood pressure high value'}
                />
                {touched.bloodPressureHigh && errors.bloodPressureHigh ? (
                  <Text style={styles.error}>{errors.bloodPressureHigh}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Enter patient's respiratory level
                  <RequiredSign />
                </Text>
                <TextInput
                  keyboardType="default"
                  style={styles.input}
                  onBlur={handleBlur('respiratoryRate')}
                  onChangeText={handleChange('respiratoryRate')}
                  placeholder={'Enter respiratory rate'}
                />
                {touched.respiratoryRate && errors.respiratoryRate ? (
                  <Text style={styles.error}>{errors.respiratoryRate}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.label}>
                  Select patient's risk level
                  <RequiredSign />
                </Text>
                <RNPickerSelect
                  style={pickerStyle}
                  onValueChange={value => {
                    if (value !== null) {
                      setFieldValue('risk', value);
                    }
                  }}
                  items={[
                    {label: 'Normal', value: 'normal'},
                    {label: 'Level1', value: 'level1'},
                    {label: 'Level2', value: 'level2'},
                    {label: 'Level3', value: 'level3'},
                    {label: 'Severe', value: 'severe'},
                  ]}
                />
                {touched.risk && errors.risk ? (
                  <Text style={styles.error}>{errors.risk}</Text>
                ) : (
                  ''
                )}
              </View>

              <View style={[styles.button, styles.shadowSm]}>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
const pickerStyle = {
  inputIOS: {
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: '#ff000090',
    borderRadius: 5,
  },
  placeholder: {
    color: 'white',
  },
  inputAndroid: {
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: '#ff000090',
    borderRadius: 5,
  },
};

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  inputBox: {
    margin: 5,
    padding: 10,
  },
  extraInputBox: {
    margin: 35,
  },
  label: {
    color: '#000',
  },
  error: {
    color: 'tomato',
    fontSize: 14,
    padding: 5,
    marginTop: 4,
  },
  input: {
    textAlign: 'left',
    fontSize: 20,
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 10,
    color: '#000',
    borderColor: '#000',
    borderWidth: 0.5,
  },
  button: {
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 2,
    marginVertical: 10,
  },
  shadowSm: {
    shadowColor: '#00000020',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 16,
    letterSpacing: 0.5,
    fontWeight: '500',
  },
});

export default AddATestResultScreen;
