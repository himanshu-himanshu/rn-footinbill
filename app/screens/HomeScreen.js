import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {logoutUser, getAllPatientsOfAUser} from '../../app/actions/authAction';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showSnack from '../utils/ShowSnack';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  useEffect(() => {
    // dispatch(getAllPatientsOfAUser(user.id));
  }, []);
  const showAlert = () =>
    Alert.alert(
      'Are You Sure?',
      'You want to Logout',
      [
        {
          text: 'Ok',
          onPress: () => {
            performLogout();
          },
          style: 'default',
        },
        {
          text: 'Cancel',
          onPress: () => {
            return false;
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {
          return false;
        },
      },
    );
  let performLogout = () => {
    // AsyncStorage.removeItem('userToken');
    dispatch(logoutUser());
    navigation.navigate('loginScreen');
    showSnack('See you soon!');
  };
  return (
    <>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <Image
              source={require('../../assets/images/image.jpg')}
              style={styles.image}
            />
          </View>
          <TouchableOpacity onPress={() => showAlert()} style={styles.redBox}>
            <Text style={styles.label}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: 'teal',
    height: 300,
    width: 350,
  },
  brandView: {
    padding: 2,
    marginBottom: 90,
  },
  brandText: {
    fontSize: 20,
    textAlign: 'center',
    letterSpacing: 1,
    fontWeight: 'normal',
    fontFamily: 'Raleway',
    color: '#008B8B',
  },
  box: {
    width: '100%',
    marginTop: 10,
    padding: 2,
    fontSize: 24,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  addBox: {
    backgroundColor: '#22A39F',
  },

  listBox: {
    backgroundColor: '#68B984',
  },

  redBox: {
    width: '100%',
    marginTop: 12,
    padding: 2,
    fontSize: 22,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#D23369',
  },
  label: {
    fontSize: 22,
    marginTop: 0,
    fontFamily: 'Raleway',
    letterSpacing: 1,
    color: '#fff',
  },
  score: {
    textAlign: 'center',
    fontSize: 34,
  },
  body: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    padding: 16,
  },
  bottomText: {
    fontSize: 24,
    textAlign: 'center',
  },
});
export default HomeScreen;
