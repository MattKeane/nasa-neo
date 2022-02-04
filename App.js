import { 
  StyleSheet, 
  Text, 
  View, 
} from 'react-native';

import Header from './components/Header'

export default function App() {
  return (
    <View style={styles.container}>
      <Header title="NASA NEO" />
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
