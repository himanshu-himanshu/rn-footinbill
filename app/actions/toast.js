import {Toast} from 'native-base'; 

export const showToast = (text, types, position) => { 
  return Toast.show({
    text: text,
    type: types,
    position: position,
    duration: 3000,
  });
};

export default showToast;
