import { View, TextInput, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import { useEffect, useState } from 'react';

import tw from 'tailwind-react-native-classnames'

import Data from '../data';
var service = new Data()
import { RoomView } from './RuanganView';

export function RoomCreate({route, navigation}) {
    const [namaRuangan, setNamaRuangan] = useState('')
    const [kodeGedung, setKodeGedung] = useState('')
    const [kapasitasRuangan, setKapasitasRuangan] = useState('')
  
    const [ formError ] = useState({namaRuangan: '', kodeGedung: '', kapasitasRuangan: ''})

    const submitForm = () => {
      validateField()
      if (formError.namaRuangan === '' && formError.kodeGedung === '' && formError.kapasitasRuangan === '') {
        navigation.navigate('RoomView')
        setNamaRuangan('')
        setKodeGedung('')
        setKapasitasRuangan('')

        service.insert("troom", {
          namaRuang: namaRuangan,
          kodeGedung: kodeGedung,
          kapasitasRuang: kapasitasRuangan,
        })

      }
    }
  
    const validateField = () => {
      // cari regex untuk huruf dan angka only, gaboleh ada whitespace dan tanda baca
      const namaRuanganValid = namaRuangan.match(/^[A-Za-z0-9]+$/)
      formError.namaRuangan = namaRuanganValid ? '' : 'Nama ruangan is invalid, only accept alphabet and/or number'
  
      // cari regex untuk huruf only, gaboleh ada whitespace dan tanda baca, panjang maks 2 karakter
      const kodeGedungValid = kodeGedung.match(/^[A-Za-z]+$/)
      formError.kodeGedung = kodeGedungValid ? '' : 'Kode gedung is invalid, only accept alphabet'
  
      // cari regex untuk nerima angka only
      const reg = new RegExp('^[0-9]+$');
      const kapasitasRuanganValid = kapasitasRuangan.toString().match(reg)
      formError.kapasitasRuangan = kapasitasRuanganValid ? '' : 'Kapasitas is invalid, only accept number'
    }
  
    return(
      <View style={[tw`flex items-center justify-center h-full w-full m-auto`,{backgroundColor: '#063970',}]}>
        <View style={[tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5`]}>
          <Text style={[tw`text-center text-2xl font-bold pb-4`]}>Registration Form</Text>
            {/* <Text>{ formError }</Text> */}
            <View style={[tw`pb-4`]}>
              {Object.keys(formError).map((fieldName, i) => {
                if(formError[fieldName].length > 0){
                  return (
                    <Text style={[tw`text-red-600 text-xs`]} key={i}>{formError[fieldName]}</Text>
                  )        
                } else {
                  return '';
                }
              })}
            </View>
            <View style={[tw`mb-4`]}>
              <Text style={[tw` text-gray-700 text-sm font-bold mb-2`]}>
                Nama Ruangan
              </Text>
              <TextInput 
              style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
              onChangeText={(text) => { setNamaRuangan(text) }}
              onBlur={validateField()}
              placeholder='Nama Ruangan'
              value={namaRuangan}
              />
            </View>
            <View style={[tw`mb-4`]}>
              <Text style={[tw` text-gray-700 text-sm font-bold mb-2`]}>
              Kode Gedung
              </Text>
              <TextInput 
              style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
              onChangeText={(text) => { setKodeGedung(text) }}
              onBlur={validateField()}
              placeholder='Kode Gedung'
              value={kodeGedung}
              />
            </View>
            <View style={[tw`mb-4`]}>
              <Text style={[tw` text-gray-700 text-sm font-bold mb-2`]}>
              Kapasitas Ruangan
              </Text>
              <TextInput 
              style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
              onChangeText={(text) => { setKapasitasRuangan(text) }}
              onBlur={validateField()}
              placeholder='Kapasitas Ruangan'
              value={kapasitasRuangan}
              />
            </View>
            <TouchableOpacity onPress={submitForm} style={[tw`my-4 rounded-lg py-3 px-4 bg-blue-600`]}>
              <Text style={[tw`text-white text-center text-base font-bold`]}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }