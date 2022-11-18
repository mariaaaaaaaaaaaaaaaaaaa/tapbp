import React, {Component, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Button, TextInput , Text , StyleSheet , ScrollView, TouchableOpacity } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import tw from 'tailwind-react-native-classnames'

const Stack = createStackNavigator();
function Pages(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="FormDevelopment" component={FormDevelopment} options={{title: 'Form Development'}} />
      <Stack.Screen name="FormDevelopmentMove" component={FormDevelopmentMove} options={{title: 'Form Development'}} />
    </Stack.Navigator>
  )
}
function FormDevelopment({route, navigation}){
  const [nama,setNama] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  // const [namaError, setNamaError] = useState(false)
  // const [emailError, setEmailError] = useState(false)
  // const [passwordError, setPasswordError] = useState(false)

  const [ formError ] = useState({nama: '', email: '', password: ''})

  submitForm = () => {
    validateField()
    if (formError.email === '' && formError.nama === '' && formError.password === '') {
      navigation.navigate('FormDevelopmentMove', {nama: nama, email: email, password: password})
      setNama('')
      setEmail('')
      setPassword('')
    }
  }

  validateField = () => {
    emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    formError.email = emailValid ? '' : ' is invalid'

    passwordValid = password.length >= 6
    formError.password = passwordValid ? '' : ' is invalid'

    namaValid = nama.match(/^[A-Za-z]+$/)
    formError.nama = namaValid ? '' : ' is invalid'
  }

  return(
    <View style={[tw`flex items-center justify-center h-full w-full m-auto rounded`,{backgroundColor: '#063970',}]}>
      <View style={[tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5`]}>
        <Text style={[tw`text-center text-2xl font-bold pb-4`]}>Registration Form</Text>
          {/* <Text>{ formError }</Text> */}
          {Object.keys(formError).map((fieldName, i) => {
            if(formError[fieldName].length > 0){
              return (
                <Text key={i}>{fieldName} {formError[fieldName]}</Text>
              )        
            } else {
              return '';
            }
          })}
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
function FormDevelopmentMove({route, navigation}){
  const nama = route.params.nama
  const email = route.params.email
  const password = route.params.password

  tableData = [
    ['Nama ', `: ${nama}`],
    ['Email ', `: ${email}`],
    ['Password ', `: ${password}`]
  ]
  return(
    <View style={[tw`flex items-center justify-center h-full w-full m-auto rounded`,{backgroundColor: '#063970',}]}>
      <View style={[tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5`]}>
        <Text style={[tw`text-center text-2xl font-bold pb-4`]}>Registration Form Move</Text>
        <Table borderStyle={{borderWidth: 2, borderColor: 'white'}}>
        <Rows data={tableData} />
        </Table>
      </View>
    </View>
  )
}
// class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     name: '',
  //     email: '',
  //     password: ''
  //   }
  // }

  // submit() {
  //   console.warn(this.state)
  // }

  // render() {
  //   return(

  //     // <View style={[tw`flex items-center justify-center h-full w-full m-auto rounded`,{backgroundColor: '#063970',}]}>
  //     //   <View style={[tw`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-4/5`]}>
  //     //     <Text style={[tw`text-center text-2xl font-bold pb-4`]}>Registration Form</Text>
          // <View style={[tw`mb-4`]}>
          //   <Text style={[tw` text-gray-700 text-sm font-bold mb-2`]}>
          //     Nama
          //   </Text>
          //   <TextInput 
          //   style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
          //   onChangeText={(text) => { setNama({name: text})}}
          //   placeholder='Nama'
          //   />
          // </View>
      //     <View style={[tw`mb-4`]}>
      //       <Text style={[tw`text-gray-700 text-sm font-bold mb-2`]}>
      //         Email
      //       </Text>
      //       <TextInput 
      //       style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
      //       onChangeText={(text) => { setNama({name: text})}}
      //       placeholder='Email'
      //       />
      //     </View>
      //     <View style={[tw`mb-4`]}>
      //       <Text style={[tw`text-gray-700 text-sm font-bold mb-2`]}>
      //         Password
      //       </Text>
      //       <TextInput 
      //       style={[tw`border rounded-lg w-full py-2 px-3 text-gray-700`]}
      //       onChangeText={(text) => { setNama({name: text})}}
      //       placeholder='********'
      //       />
      //     </View>
      //   <Button style={[tw`my-4 rounded-lg`]} title="SUBMIT" onPress={() => {this.submit()}}/>
      // </View>
      // </View>
  //   )
  // }
// }

export default function App() {
  return (
    <NavigationContainer>
      <Pages/>
    </NavigationContainer>
  )
}