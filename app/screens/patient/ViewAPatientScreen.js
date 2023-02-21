import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getAPatientsInfo } from '../../actions/authAction';
import { useDispatch, useSelector } from 'react-redux';

export const ViewAPatientScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  [showAddress, setShowAddress] = useState(true);
  useEffect(() => {  
   const abc =  dispatch(getAPatientsInfo(patient._id));   
  }, []);
  
  const patient = route.params.patient;  
  // const { patient } = useSelector(state => state.auth);
  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.body}>
        <View style={styles.brandView}>
          <Text style={[styles.brandText, styles.shadowSm]}>
            {patient.firstName} {patient.lastName}
          </Text>
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Email:{' '}
            <Text style={styles.patientData}>
              {patient ? patient.email : ''}
            </Text>
          </Text>
        </View>

        {/* <View style={styles.inputBox}>
          <Text style={styles.label}>
            First name:{' '}
            <Text style={styles.patientData}>
              {patient ? patient.firstName : ''}
            </Text>
          </Text>
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Last name:{' '}
            <Text style={styles.patientData}>
              {patient ? patient.lastName : ''}
            </Text>
          </Text>
        </View> */}

        <View style={styles.inputBox}>
          <Text style={styles.label}>
            Blood Group:{' '}
            <Text style={styles.patientData}>
              {patient ? patient.bloodGroup : ''}
            </Text>
          </Text>
        </View>
        {showAddress ? (
          <View>
            <View style={styles.inputBox}>
              <Text style={styles.label}>
                Address:{' '}
                <Text style={styles.patientData}>
                  {patient ? patient.address : ''}
                </Text>
              </Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>
                City:{' '}
                <Text style={styles.patientData}>
                  {patient ? patient.city : ''}
                </Text>
              </Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>
                Postal Code:{' '}
                <Text style={styles.patientData}>
                  {patient ? patient.postalCode : ''}
                </Text>
              </Text>
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.label}>
                Province:{' '}
                <Text style={styles.patientData}>
                  {patient ? patient.province : ''}
                </Text>
              </Text>
            </View>
            {/* <View style={styles.buttonBox}>
              <TouchableOpacity
                onPress={() => setShowAddress(false)}
                style={{alignContent: 'center'}}>
                <Text style={styles.buttonAddress}>Hide address</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        ) : (
          <View style={styles.buttonBox}>
            <TouchableOpacity onPress={() => setShowAddress(true)}>
              <Text style={styles.buttonAddress}>View address</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('viewAllTestResultsScreen', {
                patientId: patient._id,
              })
            }>
            <Text style={styles.buttonT}>View Test Results</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonBox}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('addATestResultScreen', {
                patientId: patient._id,
              })
            }>
            <Text style={styles.button}>Add Test Result</Text>
          </TouchableOpacity>
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
  brandView: {
    padding: 2,
    marginBottom: 20,
  },
  brandText: {
    fontSize: 36,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: '400',
    fontFamily: 'Pacifico-Regular',
    color: '#2B3A55',
  },
  label: {
    fontSize: 19,
  },
  inputBox: {
    margin: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#888888',
    padding: 12,
  },
  buttonBox: {
    marginTop: 30,
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
    padding: 20,
    fontSize: 20,
    textTransform: 'uppercase',
    backgroundColor: '#434242',
    color: 'white',
    fontFamily: 'Raleway',
    textAlign: 'center',
  },
  buttonT: {
    padding: 20,
    fontFamily: 'Raleway',
    textTransform: 'uppercase',
    fontSize: 20,
    backgroundColor: '#2B3A55',
    color: 'white',
    textAlign: 'center',
  },
  buttonAddress: {
    padding: 10,
    marginLeft: '15%',
    fontSize: 19,
    width: 200,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
  },
  patientData: {
    fontSize: 20,
    color: '#444444',
    letterSpacing: 0.3,
  },
});
export default ViewAPatientScreen;
