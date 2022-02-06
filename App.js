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
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'

const { API_KEY } = process.env

import Header from './components/Header'
import Card from './components/Card'

function fetchFonts() {
  return Font.loadAsync({
    'nasalization': require('./assets/fonts/nasalization-rg.otf'),
    'source-sans-pro-regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'source-sans-pro-semibold': require('./assets/fonts/SourceSansPro-SemiBold.ttf')
  })
}

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [nearEarthObjects, setNearEarthObjects] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [fontLoading, setFontLoading] = useState(true)

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
        setApiLoading(false)
      })
      .catch(err => console.log(err))

    return () => setApiLoading(true)
  }, [selectedDate])

  if (fontLoading) {
    return (
      <AppLoading
        startAsync={ fetchFonts }
        onFinish={ () => setFontLoading(false) }
        onError={ err => console.log(err) }
      />
    )
  }

  return (
    <View style={ styles.container }>
      <Header title="NASA NEO" />
      <Text style={ styles.headingText }>Showing Near Earth Objects for { selectedDate.toLocaleDateString() }</Text>
      <Button title="Change Date" onPress={ () => setOpen(true) } />
      <DatePicker
        modal
        mode="date"
        open={ open }
        date={ selectedDate }
        onConfirm={ handleConfirm }
        onCancel={ () => setOpen(false) }        
      />
      {
        apiLoading
        ?
        <Text>Loading…</Text>
        :
        <FlatList
          contentContainerStyle={ styles.neoList }
          keyExtractor={ item => item.id }
          data={ nearEarthObjects }
          renderItem={({ item }) => <Card nearEarthObject={ item } />}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  neoList: {
    alignItems: 'center',
    width: '80%',
    minWidth: 300,
    maxWidth: '90%',
    padding: 10,
  },
  headingText: {
    fontFamily: 'source-sans-pro-semibold',
    fontSize: 18,
    marginTop: 10,
  }
});
