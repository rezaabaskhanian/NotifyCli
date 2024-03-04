import { StyleSheet,  View ,TouchableOpacity,Dimensions} from 'react-native'
import  Text from '../../components/Text'
import React ,{useState,useEffect} from 'react'
import Header from '../../components/Header'
import { Colors } from '../../../styles'
import {useTranslation} from 'react-i18next';
import  TextInput  from '../../components/TextInput'


import Icon from 'react-native-vector-icons/Ionicons';
import IconDate from 'react-native-vector-icons/Fontisto';
import DatePicker from '@react-native-community/datetimepicker'
const Width =Dimensions.get('window').width
import PickerSection from '../template/PickerSerchSection'
import SearchButton from '../template/ButtonSearch'
const Search = () => {
    const {t} = useTranslation();
    const [findText, setFindText] = useState('');
    const [datePicker, setDatePicker] = useState('Date range');
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    
    function showPicker(){
        setShowDate(true)
    }

    function dataPickers (){
        return(
            <DatePicker
        value={date}
         mode="date"
         display="default"
      
         is24Hour={true}
         
        onChange={(event, selectedDate)=>{
            const currentDate = selectedDate;
            setShowDate(false);
            // let newDate=`${currentDate.getFullYear()}_${currentDate.getMonth()}_${currentDate.getDay()}`
          setDate(currentDate);
        }}
        style={{ backgroundColor: 'white' }}
      />
        )
    }

  return (
    <View style={styles.container}>
        <Header back title={t('search')} style={{backgroundColor:Colors.BLUE_THEME}}/>
        <View style={styles.main}>
            <View style={styles.viwFind}>
            <TextInput onChangeText={(e)=>setFindText(e)} value={findText} placeholder={t('find-text')}  style={styles.input}/>
            <TouchableOpacity onPress={()=>console.log('button')} style={styles.btnFind}>
            <Icon name="settings" size={10} color={'white'} />
                </TouchableOpacity>
            </View>

            <View style={styles.viwDate}>
                <Text style={styles.txtDate}>
                    {`${!showDate ?date: datePicker}`}
                </Text>
            <IconDate name="date" size={15} color={Colors.GRAY_DARK} onPress={showPicker}/>
            {showDate &&(
            dataPickers()
            )}
            </View>

             <PickerSection text={`Source`}/>
             <PickerSection text={`Include archived messages`}/>
             <SearchButton/>
        </View>
      
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    main:{
        paddingHorizontal:15,
        backgroundColor:Colors.BLUE_THEME,
        paddingBottom:20
    },
    viwFind:{
        flexDirection:'row',
        justifyContent:'space-between',
        

    },
    input:{
         width:270,
         height:40,
         borderWidth:0.5,
         borderColor:Colors.GRAY_DARK,
         backgroundColor:Colors.WHITE,
         borderRadius:10,
         paddingLeft:10
         
    },
    btnFind:{
        width:40,
        height:40,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.BLUE_DARK,
    },
    viwDate:{
        width:Width-30,
        height:40,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:0.5,
        borderColor:Colors.GRAY_MEDIUM,
        backgroundColor:Colors.WHITE,
        borderRadius:10,
        paddingHorizontal:10,
        marginTop:15
    },
    txtDate:{
        color:Colors.GRAY_MEDIUM
    }
})