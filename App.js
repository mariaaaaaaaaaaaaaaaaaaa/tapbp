import LinearGradient from 'react-native-linear-gradient';
import React, { useState, Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity , StyleSheet , Image } from 'react-native';

import tw from 'tailwind-react-native-classnames'

import { FormDevelopment } from './components/FormDevelopment';
import { FormDevelopmentMove } from './components/FormDevelopmentMove';

import { DataInteraction } from './components/FormRuangan';
import { RoomCreate } from './components/RuanganCreate';
import { RoomView } from './components/RuanganView';
import { RoomViewDetail } from './components/RuanganViewDetail';
import { RoomEdit } from './components/RuanganEdit';

import Data from './data';
var service = new Data()

const Stack = createStackNavigator();
function Pages(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{title: 'Tugas PBP'}} />
      <Stack.Screen name="FormDevelopment" component={FormDevelopment} options={{title: 'Form Development'}}/>
      <Stack.Screen name="FormDevelopmentMove" component={FormDevelopmentMove} options={{title: 'Form Development'}} />
      <Stack.Screen name="DataInteraction" component={DataInteraction} options={{title: 'Data Interaction'}} />
      <Stack.Screen name="RoomView" component={RoomView} options={{title: 'Aplikasi Pendataan Ruangan'}} />
      <Stack.Screen name="RoomCreate" component={RoomCreate} options={{title: 'Aplikasi Pendataan Ruangan'}} />
      <Stack.Screen name="RoomViewDetail" component={RoomViewDetail} options={{title: 'Aplikasi Pendataan Ruangan'}} />
      <Stack.Screen name="RoomEdit" component={RoomEdit} options={{title: 'Aplikasi Pendataan Ruangan'}} />
    </Stack.Navigator>
  )
}

function Home({route, navigation}) {
  navFormDev = () => {
    navigation.navigate('FormDevelopment')
  }

  navDataInteraction = () => {
    navigation.navigate('DataInteraction')
  }

  return (
    <View style={[tw`bg-white h-full py-8`]}>
    <Text style={[tw`mx-5 my-2 text-lg font-bold`]}>Hybrid Mobile Application Development</Text>
      <Text style={[tw`mx-5`]}>Form Development and Data Interaction</Text>
        <TouchableOpacity onPress={navFormDev} style={[tw`w-full my-6 mx-auto px-4`]}>
          <LinearGradient 
          colors={['#ec5a87','#a369e1']}
          style={styles.linearGradient}
          start={{x:0,y:0.5}}
          end={{x:1,y:0.5}}>
            <View>
              <Text style={[tw`text-white text-base font-bold`]}>Form Development</Text>
              <Text style={[tw`text-white text-sm font-bold`]}>Components and interaction in form</Text>
            </View>
            <Image style={styles.stretch} source={require('./bgformdev.png')}></Image>
          </LinearGradient>
        </TouchableOpacity>
      <TouchableOpacity onPress={navDataInteraction} style={[tw`w-full mx-auto px-4`]}>
        <LinearGradient 
        colors={['#ec5a87','#a369e1']}
        style={styles.linearGradient}
        start={{x:0,y:0.5}}
        end={{x:1,y:0.5}}>
          <View>
            <Text style={[tw`text-white text-base font-bold`]}>Data Interaction</Text>
            <Text style={[tw`text-white text-sm font-bold`]}>Components and interaction in form</Text>
          </View>
            <Image style={styles.stretch} source={require('./bgformdev.png')}></Image>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      records: []
    }
    service.init()
  }

  async componentDidMount() {
    service.createTable('troom', [{
      name: 'ruangId',
      dataType: 'integer',
      isNotNull: true,
      options: 'PRIMARY KEY AUTOINCREMENT'
    }, {
      name: 'namaRuang',
      dataType: 'text'
    }, {
      name: 'kodeGedung',
      dataType: 'text'
    }, {
      name: 'kapasitasRuang',
      dataType: 'integer'
    }])
    var result = await service.select("troom")
    this.setState({
      records: result
    })
  }

  render() {
    return (
      <NavigationContainer>
        <Pages/>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 15,
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
  },
  stretch: {
    width: 60,
    height: 50,
  }
})