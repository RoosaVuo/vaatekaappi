import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function EtusivuScreen() {
  return (
    <View style={styles.container}>
      <Text>Tervetuloa käyttämään vaatekaappi-sovellusta!</Text>
      <Text>Voit tallentaa tänne vaatteita ja sen jälkeen näet listauksen vaatteista.</Text>
      <Text>Voit suodattaa listaa esimerkiksi värin tai tilaisuuden mukaan.</Text>
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
