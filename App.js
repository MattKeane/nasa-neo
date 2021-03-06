import { 
  StyleSheet,  
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

// Environment variables
const { API_KEY } = process.env

//  App Constants
import colors from './constants/colors'

// Components
import Header from './components/Header'
import Card from './components/Card'
import MainButton from './components/MainButton'

// Fonts
function fetchFonts() {
  return Font.loadAsync({
    'nasalization': require('./assets/fonts/nasalization-rg.otf'),
    'source-sans-pro-regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'source-sans-pro-semibold': require('./assets/fonts/SourceSansPro-SemiBold.ttf')
  })
}

export default function App() {
  //  State
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [nearEarthObjects, setNearEarthObjects] = useState([])
  const [apiLoading, setApiLoading] = useState(true)
  const [fontLoading, setFontLoading] = useState(true)

  // Handles date changes from datepicker modal
  const handleConfirm = dateInput => {
    setOpen(false)
    setSelectedDate(dateInput)
  }

  // Loads NEOs from API on initial load and when new date is selected
  useEffect(() => {
    // putting date into correct format
    const formattedDate = selectedDate.toISOString().split('T')[0]
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formattedDate}&end_date=${formattedDate}&api_key=${API_KEY}`
    fetch(url)
      .then(response => response.json())
      .then(json => {
        setNearEarthObjects(json.near_earth_objects[formattedDate])
        // stop showing loading message once API response is received
        setApiLoading(false)
      })
      .catch(err => console.log(err))
    
    // show loading message when selectedDate changes
    return () => setApiLoading(true)
  }, [selectedDate])

  // show loading screen until fonts load
  if (fontLoading) {
    return (
      <AppLoading
        startAsync={ fetchFonts }
        onFinish={ () => setFontLoading(false) }
        onError={ err => console.log(err) }
      />
    )
  }

  // Main App Render
  return (
    <View style={ styles.container }>
      <Header title="NASA NEO" />
      <Text style={ styles.headingText }>Showing Near Earth Objects for { selectedDate.toLocaleDateString() }</Text>
      <MainButton onPress={ () => setOpen(true) }>Change Date</MainButton>
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
        <View style={ styles.loadingContainer }>
          <Text style={ styles.loadingText }>LOADING???</Text>
        </View>
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

// Styles
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
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loadingText: {
    color: colors.secondary,
    fontFamily: 'nasalization',
    fontSize: 35,
  },
});
