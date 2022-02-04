import { 
  StyleSheet, 
  Button, 
  View,
  Text, 
} from 'react-native';
import { useState } from 'react'
import DatePicker from 'react-native-date-picker'

import Header from './components/Header'

export default function App() {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  const handleConfirm = dateInput => {
    setOpen(false)
    setDate(dateInput)
  }

  return (
    <View style={ styles.container }>
      <Header title="NASA NEO" />
      <Button title="OPEN" onPress={ () => setOpen(true) } />
      <Text>{ date.toLocaleDateString() }</Text>
      <DatePicker
        modal
        mode="date"
        open={ open }
        date={ date }
        onConfirm={ handleConfirm }
        onCancel={ () => setOpen(false) }        
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
