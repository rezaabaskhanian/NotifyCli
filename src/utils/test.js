// import {useQuery} from '@realm/react';
// import {Templates,Providers} from '../utils/realm';



import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ECDHCurve25519keyPairGeneratorService, AES256EncryptionService } from './ECDHCurve25519keyPairGeneratorService'

import { Buffer } from 'buffer'
// import {ECDHCurve25519keyPairGeneratorService , AES256EncryptionService} from './NewECD'
class MessageDecoder {


    constructor(password) {
        this.password = password
    }


    async getTemplate(id,data) {
        const existingTemplate = await this.getTemplateFromCache(id)
        
        if (!existingTemplate) {
          
            const template = await this.getTemplateFromApi(id ,data)

            // this.cachTemplateLocally(template)
            return template
        }
        return existingTemplate

    }

    async getProviderPublickey(id) {

        const existingProviderPublickey = await this.getProviderPublickeyFromCache(id)

        if (!existingProviderPublickey) {
            const providerPublickey = this.getProviderPublickeyFromApi(id)
            // this.cacheProviderPublickeyLocally(template)
            return providerPublickey
        }
        return existingProviderPublickey

    }



    async getTemplateFromCache(id) {
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

    async getTemplateFromApi(id,data) {
           
        const jsonData=Buffer.from(data,'hex').toString('utf-8')
        const dataDecode=JSON.parse(jsonData)
               
        const getTemplate = await Axios.get(`http://185.162.43.150:3001/Template/Get?id=${id}`)


        const template = getTemplate.data.data
        let templateStringDecode = template.templateString;

        Object.entries(dataDecode).forEach(([key, value]) => {
            // Replace placeholders in templateString with corresponding values from dataDecode
            templateStringDecode = templateStringDecode.replace(`[${key}]`, value);
          })


        let existingArray = [];
         
        
        const newValue = {
            id: template.id,
            name: template.name,
            templateString: template.templateString,
            templateDecode :templateStringDecode

        };
        existingArray.push(newValue);
        await AsyncStorage.setItem('template', JSON.stringify(existingArray));
        return template

    }


    cachTemplateLocally(template) {


    }


    async getProviderPublickeyFromCache(id) {
        try {
            const data = await AsyncStorage.getItem('provider');
            if (data) {
                const existingProvider = JSON.parse(data);
                const newProviderId = existingProvider.find(provider => provider.id === id);
                return newProviderId;
            }
            return null; // or whatever you want to return if provider is not found
        } catch (error) {
            console.error('Error fetching provider from cache:', error);
            throw error; // handle or rethrow error as needed
        }
    }



    async getProviderPublickeyFromApi(id) {

        const getPublic = await Axios.get(`http://185.162.43.150:3001/Providers/GetPublicKey?providerId=${id}`)
        const PublicId = getPublic.data.data.Public

        console.log(PublicId, 'PublicId')

        const newValue = {
            id: id,
            Public: PublicId
        };
        let existingArray = [];
        existingArray.push(newValue);
        await AsyncStorage.setItem('provider', JSON.stringify(existingArray));
        return PublicId
    }

    cachProviderPublickeyLocally(template) {

    }

    putItAllTogheter(template = '', data) {
        let msg;
        Object.entries(data).map(e => {
            msg = template.replace(e[0], e[1])
        })
        return msg
    }

    async decode(message) {
     
        const template = await this.getTemplate(message.templateId ,message.data)
        console.log(template,'templateeee')
        return (template)
    }

        // const providerPublickey = await this.getProviderPublickey(message.providerId)

        // console.log("\n ** templateString **", template.templateString, "\n ** publicKey ** ", providerPublickey.Public.publicKey)

        // const userPrivateKey =this.getUserPrivatekeyFromCache()
        // const ecdhcurve25519keyPairGeneratorService =new ECDHCurve25519keyPairGeneratorService(this.password)

        // const password = "42d2b60a29ea3c0b20ebfdbf99eabedbee4afefdc4f8bd557c204e57491d0df5";
        // const ecdhcurve25519keyPairGeneratorService = new ECDHCurve25519keyPairGeneratorService(password);

       
        // const sharedSecret = ecdhcurve25519keyPairGeneratorService.computeSharedKey(providerPublickey.Public.publicKey)

        // const aes256EncryptionService = new AES256EncryptionService(sharedSecret)

        // console.log("\n** message.data ** ", message.data, "\n ** message.iv **", message.iv, "\n ** message.authToken ** ", message.authToken)

        // const data = aes256EncryptionService.decrypt(message.data, message.iv, message.authToken)

        // console.log(data,'dattttaaa')
        // return message=this.putItAllTogheter(template.templateString,data)
        // console.log(data,'dddd')
        // return template


    // }


}

export default MessageDecoder