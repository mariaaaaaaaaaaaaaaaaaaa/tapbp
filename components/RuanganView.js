import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, {Component} from 'react'

import tw from 'tailwind-react-native-classnames'
import Data from '../data';
var service = new Data()

export class RoomView extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      records: []
    }
    service.init()
  }

  async componentDidMount() {
    var result = await service.select("troom")
    this.setState({
      records: result
    })
  }

  
  detailList(id) {
    // const navigation = useNavigation()
    const {navigate} = this.props.navigation
    navigate('RoomViewDetail', {ruangId: id})
  }


  render() {
    return (
      <View style={[tw`h-full pt-4 `,{backgroundColor: '#063970',}]}>
        <Text style={[tw`px-4 pt-3 text-2xl font-bold py-2 text-white`]}>Daftar Ruangan</Text>
        <FlatList
          data={this.state.records}
          renderItem={({ item }) => (
            <View style={[tw`bg-white my-3 mx-4 pt-2 rounded`]}>
                <Text style={[tw`mx-2 my-auto px-4`]}>Nama ruangan: {item.namaRuang}</Text>
                <Text style={[tw`mx-2 my-auto px-4`]}>Kapasitas ruangan: {item.kapasitasRuang}</Text>
                <TouchableOpacity onPress={() => this.detailList(item.ruangId)} style={[tw`mx-6 my-4 rounded-lg py-3 px-4 bg-blue-600`]}>
                  <Text style={[tw`mx-auto text-white text-center text-xs font-bold`]}>DETAIL</Text>
                </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.ruangId}
        />
      </View>
    )
  }
}