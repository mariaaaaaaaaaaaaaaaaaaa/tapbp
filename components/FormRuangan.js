import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TouchableOpacity , StyleSheet } from 'react-native';
import { useState } from 'react';
import tw from 'tailwind-react-native-classnames'

export function DataInteraction({route, navigation}) {
    navRoomCreate = () => {
      navigation.navigate('RoomCreate')
    }
  
    navRoomRead = () => {
      navigation.navigate('RoomView')
    }
  
    return (
      <View>
        <TouchableOpacity onPress={navRoomRead} style={[tw`w-full my-4 mx-auto px-4`]}>
        <LinearGradient 
          colors={['#ec5a87','#a369e1']}
          style={styles.linearGradient}
          start={{x:0,y:0.5}}
          end={{x:1,y:0.5}}>
            <View>
              <Text style={[tw`text-white text-base font-bold m-auto`]}>Lihat Data</Text>
            </View>
        </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={navRoomCreate} style={[tw`w-full my-4 mx-auto px-4`]}>
        <LinearGradient 
          colors={['#ec5a87','#a369e1']}
          style={styles.linearGradient}
          start={{x:0,y:0.5}}
          end={{x:1,y:0.5}}>
            <View>
              <Text style={[tw`text-white text-base font-bold m-auto`]}>Tambah Data</Text>
            </View>
        </LinearGradient>
        </TouchableOpacity>
      </View>
    )
  }
  
const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 15,
    height: 60,
    justifyContent: 'center',
    padding: 18,
  }
})