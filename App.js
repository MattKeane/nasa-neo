import { 
  StyleSheet, 
  Button, 
  View,
  Text,
  FlatList, 
} from 'react-native';
import { 
  useState,
  useEffect,
} from 'react'
import DatePicker from 'react-native-date-picker'

const { API_KEY } = process.env

import Header from './components/Header'

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [nearEarthObjects, setNearEarthObjects] = useState([])

  const handleConfirm = dateInput => {
    setOpen(false)
    setSelectedDate(dateInput)
  }

  useEffect(() => {
    // putting date into correct format
    const formattedDate = selectedDate.toISOString().split('T')[0]
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${API_KEY}`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setNearEarthObjects(json.near_earth_objects[formattedDate])
      })
      .catch(err => console.log(err))
  }, [selectedDate])

  return (
    <View style={ styles.container }>
      <Header title="NASA NEO" />
      <Button title="OPEN" onPress={ () => setOpen(true) } />
      <Text>{ selectedDate.toLocaleDateString() }</Text>
      <DatePicker
        modal
        mode="date"
        open={ open }
        date={ selectedDate }
        onConfirm={ handleConfirm }
        onCancel={ () => setOpen(false) }        
      />
      <FlatList
        keyExtractor={ item => item.id }
        data={ nearEarthObjects }
        renderItem={({ item }) => <Text>{ item.name }</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
