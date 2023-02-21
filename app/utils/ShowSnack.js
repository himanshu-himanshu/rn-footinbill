import Snackbar from 'react-native-snackbar';

export const showSnack = (text) => {
  return Snackbar.show({
    text: text,
    duration: 3000,
  });
};

export default showSnack;

