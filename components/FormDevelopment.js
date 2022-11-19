import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames'

export function FormDevelopment({route, navigation}){
    const [nama,setNama] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
  
    const [ formError ] = useState({nama: '', email: '', password: ''})
  
    submitForm = () => {
      validateField()
      if (formError.email === '' && formError.nama === '' && formError.password === '') {
        navigation.navigate('FormDevelopmentMove', {nama: nama, email: email, password: password})
        // setNama('')
        // setEmail('')
        // setPassword('')
      }
    }
  
    validateField = () => {
      emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
      formError.email = emailValid ? '' : 'Email is invalid'
  
      passwordValid = password.length >= 6
      formError.password = passwordValid ? '' : 'Password is invalid, minimum length is 6'
  
      namaValid = nama.match(/^[A-Za-z]+$/)
      formError.nama = namaValid ? '' : 'Nama is invalid, only accept alphabet'
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
                Nama
              </Text>
              <TextInput 
              style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
              onChangeText={(text) => { setNama(text) }}
              onBlur={validateField()}
              placeholder='Nama'
              value={nama}
              />
            </View>
            <View style={[tw`mb-4`]}>
              <Text style={[tw` text-gray-700 text-sm font-bold mb-2`]}>
              Email
              </Text>
              <TextInput 
              style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
              onChangeText={(text) => { setEmail(text) }}
              onBlur={validateField()}
              placeholder='Email'
              value={email}
              />
            </View>
            <View style={[tw`mb-4`]}>
              <Text style={[tw` text-gray-700 text-sm font-bold mb-2`]}>
              Password
              </Text>
              <TextInput 
              style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
              onChangeText={(text) => { setPassword(text) }}
              onBlur={validateField()}
              placeholder='Password'
              value={password}
              />
            </View>
            <TouchableOpacity onPress={submitForm} style={[tw`my-4 rounded-lg py-3 px-4 bg-blue-600`]}>
              <Text style={[tw`text-white text-center text-base font-bold`]}>Send</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }