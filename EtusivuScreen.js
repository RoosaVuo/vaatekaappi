import { StyleSheet, Text, View } from 'react-native';

export default function EtusivuScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.tekstilaatikko}>
        <Text style={styles.otsikko}>Tervetuloa käyttämään vaatekaappi-sovellusta! {'\n'}</Text>
        
        <Text>Voit hyödyntää vaatelistaa esimerkiksi ostoksilla ja suodattaa listaa mm. värin tai tilaisuuden mukaan. {'\n'} {'\n'}
          Aloita vaatteiden lisääminen ottamalla kuva tai lisäämällä vaatteen tiedot.</Text>
      </View>
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
  tekstilaatikko: {
    margin: 20,
    alignItems: 'center'

  },
  otsikko: {
    fontSize: 19,
    fontWeight: 'bold',
  }
});
