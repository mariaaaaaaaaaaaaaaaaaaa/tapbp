import { View, Text, FlatList, TouchableOpacity } from 'react-native';

import React, {Component} from 'react'
import tw from 'tailwind-react-native-classnames'
import Data from '../data';
var service = new Data()

export class RoomViewDetail extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      records: []
    }
    service.init()
  }

  async componentDidMount() {
    const { ruangId } = this.props.route.params
    // var result = await service.select("troom", "*", ruangId)
    var result = await service.select("troom", "*", ruangId)
    this.setState({
      records: result
    })
  }

  async onDelete(id) {
    service.delete("troom", id)
  }

  editRoom(item) {
    const {navigate} = this.props.navigation
    navigate('RoomEdit', {item: item})
  }

  deleteRoom(id) {
    const {navigate} = this.props.navigation
    this.onDelete(id)
    navigate('DataInteraction')
  }


  render() {
    return (
      <View style={[tw`h-full`,{backgroundColor: '#063970',}]}>
        <FlatList
          data={this.state.records}
          renderItem={({ item }) => (
            <View style={[tw`bg-white w-11/12 p-4 mx-auto mt-12 mx-4 rounded`]}>
                <Text style={[tw`mx-2 my-1 px-4 py-2 font-bold text-base`]}>Ruang {item.namaRuang}</Text>
                <Text style={[tw`mx-2 px-4`]}>ID Ruang: {item.ruangId}</Text>
                <Text style={[tw`mx-2 px-4`]}>Nama Ruang: {item.namaRuang}</Text>
                <Text style={[tw`mx-2 px-4`]}>Kode Gedung: {item.kodeGedung}</Text>
                <Text style={[tw`mx-2 px-4`]}>Kapasitas ruangan: {item.kapasitasRuang}</Text>

                <View style={[tw`flex flex-row items-center mx-6`]}>
                    <TouchableOpacity onPress={() => this.editRoom(item)} style={[tw`w-1/3 mr-2 my-4 rounded-lg py-3 px-4 bg-blue-600`]}>
                        <Text style={[tw`text-white text-center text-xs font-bold`]}>EDIT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.deleteRoom(item.ruangId)} style={[tw`w-1/3 my-4 rounded-lg py-3 px-4 bg-blue-600`]}>
                        <Text style={[tw`text-white text-center text-xs font-bold`]}>DELETE</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
          )}
          keyExtractor={(item) => item.ruangId}
        />
      </View>
    )
  }
}