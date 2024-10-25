import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';

export default function LomakeScreen() {
  return (
    <View style={styles.container}>
      <Text>Tänne lomake</Text>
      <TextInput 
      style={{ width: '90%', marginBottom: 10}}
        label="Vaate"
      />
      <Button>Lisää listalle</Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
