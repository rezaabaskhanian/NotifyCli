import { View, Text } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message';
const showToast = (props) => {
    Toast.show({
      type: props.type,
      text1:props.txt1,
      text2: props.txt2,
      position:'top'
    });
}

export default showToast