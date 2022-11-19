import { Table, Rows} from 'react-native-table-component';
import { View, Text } from 'react-native';
import tw from 'tailwind-react-native-classnames'

export function FormDevelopmentMove({route, navigation}){
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