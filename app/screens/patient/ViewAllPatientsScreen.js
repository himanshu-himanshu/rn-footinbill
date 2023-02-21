import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, FlatList, View, TouchableOpacity} from 'react-native';
import {getAllPatientsOfAUser} from '../../actions/authAction';
import filter from 'lodash.filter';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput} from 'react-native-gesture-handler';

export const ViewAllPatientsScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getAllPatientsOfAUser(user.id));
  }, []);

  const {allPatients} = useSelector(state => state.auth);

  const [searchTerm, setSearchTerm] = useState('');

  const [allPatientsList, setAllPatientsList] = useState(allPatients);


  useEffect(() => {
    setAllPatientsList(allPatients);
  }, []);


  const contains = (patient, query) => {
    const {firstName, lastName} = patient;    

    if (firstName.includes(query) || lastName.includes(query)) {
      return true;
    }

    return false;
  };
  const handleSearch = text => {
    const filteredData = filter(allPatients, patient => {    
      return contains(patient, text);
    });

    if (text == '') {    
      setAllPatientsList(allPatients);
    } else {    
      setAllPatientsList(filteredData);
    }

    setSearchTerm(text);
  };

  const renderSearchBar = () => (
    <View style={styles.searchBar}>
      <TextInput
        clearButtonMode="always"
        keyboardType="default"
        autoCorrect={false}
        value={searchTerm}
        style={styles.input}
        onChangeText={text => handleSearch(text)}
        placeholder={'Search...'}
      />
    </View>
  );

  return (
    <View style={styles.body}>
      <View style={styles.brandView}>
        <Text style={[styles.brandText, styles.shadowSm]}>Patient's List</Text>
      </View>
      {allPatients && allPatients.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.container}
          ListHeaderComponent={renderSearchBar}
          data={allPatientsList}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('viewAPatientScreen', {patient: item});
              }}>
              <Text style={styles.item}>
                {item ? item.lastName : ''}&nbsp;{item ? item.firstName : ''}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.item}>No Patients Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  searchBar: {
    fontFamily: 'Raleway',
    padding: 5,
    backgroundColor: 'red',
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  welcomeView: {
    margin: 4,
    padding: 4,
  },
  brandView: {
    padding: 2,
    marginTop: 20,
  },
  brandText: {
    fontSize: 28,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: '400',
    fontFamily: 'Pacifico-Regular',
    color: '#008B8B',
  },
  welcomeText: {
    color: 'teal',
    fontSize: 26,
    textAlign: 'center',
    fontFamily: 'Pacifico',
  },
  body: {
    fontFamily: 'Raleway',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  item: {
    marginTop: 10,
    backgroundColor: '#D6E4E5',
    autoCapitalize: true,
    padding: 16,
    fontSize: 16,
    letterSpacing: 0.5,
    fontFamily: 'Raleway',
  },
  bottomText: {
    fontSize: 18,
    textAlign: 'center',
  },
  label: {
    color: '#fff',
  },
  error: {
    color: 'tomato',
    fontSize: 14,
    padding: 5,
    marginTop: 4,
  },
  input: {
    fontSize: 20,
    padding: 5,
    color: '#000',
  },
});
export default ViewAllPatientsScreen;
