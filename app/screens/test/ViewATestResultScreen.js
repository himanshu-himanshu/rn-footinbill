import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getATestResult } from '../../actions/testAction';
import { useDispatch, useSelector } from 'react-redux';

export const ViewATestResultScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();
  const { patient } = useSelector(state => state.auth);
  [showAddress, setShowAddress] = useState(false);
  useEffect(() => {
    let testId = route.params.testId;
    let patientId = patient._id;
    dispatch(getATestResult(patientId, testId));
  }, []);

  // const state = useSelector((state) => console.log("PAORTALDJ LS jasdlaskajhjkahsdkjah state", state));
  const { test } = useSelector(state => state.test);

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.body}>

        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Email: <Text style={styles.boldText}>{patient ? patient.email : ''}</ Text>
          </Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Risk Level:  <Text style={styles.boldText}>{test && test.risk ? test.risk : ''}</ Text>
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Blood Pressure High:  <Text style={styles.boldText}>{test && test.bloodPressureHigh ? test.bloodPressureHigh : ''}</ Text>
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Blood Pressure Low:  <Text style={styles.boldText}>{test && test.bloodPressureLow ? test.bloodPressureLow : ''}</ Text>
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Respiratory Rate:  <Text style={styles.boldText}>{test && test.respiratoryRate ? test.respiratoryRate : ''}</ Text>
          </Text>
        </View>

      </View>
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
    backgroundColor: '#00000012',
    padding: 12,
  },
  buttonBox: {
    margin: 5,
    backgroundColor: '#00000012',
    padding: 12,
    textAlign: 'center',
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
    textAlign: 'left',
    fontSize: 20,
    borderRadius: 2,
    padding: 10,
    color: '#413F42',
    borderColor: '#413F42',
    borderWidth: 0.5,
  },
  button: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'green',
    color: 'white',
    textAlign: 'center',
  },
  buttonT: {
    padding: 10,
    fontSize: 24,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  buttonAddress: {
    padding: 10,
    marginLeft: "15%",
    fontSize: 19,
    width: 200,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 24
  }
});
export default ViewATestResultScreen;
