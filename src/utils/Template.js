import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import jalaliMoment from 'jalali-moment'
import PriceFix from '../utils/PriceFix'


export async function decodeMessage(password, message) {

    try {
        const template = await getTemplate(password, message.templateId, message.data ,message);
        const provider =await getProvider(message.providerId);
        
        
        // const decodedTemplate = {
        //     id: template.id,
        //     name: template.name,
        //     templateDecode: template.templateDecode,
        //     templateString: template.templateString
        // };
        
        return {template,provider};
    } catch (error) {
        console.error('Error decoding message:', error);
      
    }
}



async function getTemplateFromCache(id) {
    try {
        const templateCollection = await AsyncStorage.getItem('template');
        if (templateCollection) {
            const existingArray = JSON.parse(templateCollection);
            const template = existingArray.find(item => item.id === id);
            if (template) {
                return template;
            }
        }
        return null;
    } catch (error) {
        console.error('Error fetching template from cache:', error);
        return null;
    }
}

async function getTemplateFromApi(id, data ,message) {
    try {
        
        // const jsonData = Buffer.from(data, 'hex').toString('utf-8');
        // const dataDecode = JSON.parse(jsonData);
        const dataDecode = JSON.parse(Buffer.from(data, 'hex').toString('utf-8'));
        
        const getTemplate = await Axios.get(`http://185.162.43.150:3001/Template/Get?id=${id}`);
        const template = getTemplate.data.data;
      
        
        let templateStringDecode = template.templateString;
        // Object.entries(dataDecode).forEach(([key, value]) => {
        //     templateStringDecode = templateStringDecode.replace(`[${key}]`, value);
        // });
        for (const [key, value] of Object.entries(dataDecode)) {
            if (key === 'DATE') {
                const date = jalaliMoment(value).locale('en').format('YYYY MMMM D HH:mm');
                // const date = jalaliMoment(value).locale('fa').format('jYYYY jMMMM jD ساعت HH:mm');
                templateStringDecode = templateStringDecode.replace(`[${key}]`, date);
            } else {
             
                templateStringDecode = templateStringDecode.replace(`[${key}]`, PriceFix(value));
            }
        }
       
        const newValue = {
            id: template.id,
            name: template.name,
            templateString: template.templateString,
            templateDecode: templateStringDecode,
            dataCodeType :dataDecode,
            provider:message.providerName,
            publishedAt:message.publishedAt
        };
        
        // console.log(existingArray,'existingArray')
        // await AsyncStorage.setItem('template', JSON.stringify(existingArray));
        return newValue;
    } catch (error) {
        console.error('Error fetching template from API:', error);
    
    }
}




async function getProvider (id){
    
    try{
        const getProvider = await Axios.get(`http://185.162.43.150:3001/Providers/GetProvider?providerId=${id}`);
        const provider = getProvider.data.data;
        const providersWithId = { ...provider, id: id}
        return providersWithId;
        
    }catch(e){
        console.log(e)
    }
}

async function getTemplate(password, id, data,message) {
    const existingTemplate = await getTemplateFromCache(id);
    
    if (existingTemplate) {
        return existingTemplate;
    } else {
        return getTemplateFromApi(id, data,message);
    }
}


