import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Alert, Image } from 'react-native';
import { Button, Card } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue, remove, } from "firebase/database";

export default function ListaScreen() {
  const [valittuTyyppi, setValittuTyyppi] = useState();
  const [valittuVari, setValittuVari] = useState();
  const [valittuTilaisuus, setValittuTilaisuus] = useState();
  const [valittuSijainti, setValittuSijainti] = useState();

  const [vaateLista, setVaateLista] = useState([]);
  const [suodatettuVaateLista, setSuodatettuVaateLista] = useState([]);
  
  const database = getDatabase(app);
  const pickerRef = useRef();

  useEffect(() => {
    const itemsRef = ref(database, 'vaatteet/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setVaateLista(Object.values(data));
      } else {
        setVaateLista([]); 
      }
    })
  }, []);  

  console.log(suodatettuVaateLista);

  const suodataLista = () => {
    setSuodatettuVaateLista(vaateLista.filter(vaate => {
      return(
        (!valittuTyyppi || vaate.tyyppi === valittuTyyppi) &&
        (!valittuVari || vaate.vari === valittuVari) &&
        (!valittuTilaisuus || vaate.tilaisuus === valittuTilaisuus) &&
        (!valittuSijainti || vaate.sijainti === valittuSijainti) 
      );
    }));
  };

  //ChatGpt apuna virheenselvityksessä vaatelistan arvojen "kopioimisessa" ja suodattamisessa. virhe oli let muuttujan käyttämisessä, kun piti käyttää tilamuuttujaa. Aiemmin let suodatettuVaateLista 
  //ChatGpt uuestaan apuna, useamman suodattimen virheen kanssa. Logiikka oli muuten oikein, mutta useamman lauseen tarvitsi olla return lause, olin aiemmin ketjuttanut ehdot, mutta se ei toiminut
  
  const naytaLista = () => {
    setSuodatettuVaateLista(vaateLista);
  }

  const nollaaSuodattimet = () => {
    setSuodatettuVaateLista(vaateLista);
    setValittuTyyppi('Kaikki tyypit');
    setValittuVari('Kaikki värit');
    setValittuTilaisuus('Kaikki tilaisuudet');
    setValittuSijainti('Kaikki sijainnit')
  }

  const poistaVaate = async (key) => {
    try {
      await remove(ref(database, 'vaatteet/' + key));
    } catch (error) {
      Alert.alert('Virhe poistossa', error)
    }
}

  const poistaNappi = (key) => 
  Alert.alert('Haluatko varmasti poistaa vaatteen listalta?', 'Vaate poistetaan pysyvästi', [
    {
      text: 'Peruuta',
      onPress: () => console.log('Poisto peruttu'),
      style: 'cancel',
    },
    {text: 'POISTA', onPress: () => poistaVaate(key)},
  ])

  return (
    <View style={styles.container}>    
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Suodata vaatteita</Text> 
      <View style={styles.picker}>
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={valittuTyyppi}
            onValueChange={(itemValue, itemIndex) =>
              setValittuTyyppi(itemValue)
            }>
            <Picker.Item label="Kaikki tyypit" value="" />
            <Picker.Item label="Housut" value="Housut" />
            <Picker.Item label="Paita" value="Paita" />
            <Picker.Item label="Takki" value="Takki" />
            <Picker.Item label="Mekko" value="Mekko" />
          </Picker> 
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={valittuVari}
            onValueChange={(itemValue, itemIndex) =>
              setValittuVari(itemValue)
            }>
            <Picker.Item label="Kaikki värit" value="" />
            <Picker.Item label="Punainen" value="Punainen" />
            <Picker.Item label="Musta" value="Musta" />
            <Picker.Item label="Keltainen" value="Keltainen" />
            <Picker.Item label="Vihreä" value="Vihreä" />
            <Picker.Item label="Sininen" value="Sininen" />
            <Picker.Item label="Valkoinen" value="Valkoinen" />
          </Picker> 
      </View>

      <View style={styles.picker}>
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={valittuTilaisuus}
            onValueChange={(itemValue, itemIndex) =>
              setValittuTilaisuus(itemValue)
            }>
            <Picker.Item label="Kaikki tilaisuudet" value="" />
            <Picker.Item label="Arki" value="Arki" />
            <Picker.Item label="Juhla" value="Juhla" />
            <Picker.Item label="Ulkoilu" value="Ulkoilu" />
            <Picker.Item label="Urheilu" value="Urheilu" />
        </Picker> 
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={valittuSijainti}
            onValueChange={(itemValue, itemIndex) =>
              setValittuSijainti(itemValue)
            }>
            <Picker.Item label="Kaikki sijainnit" value="" />
            <Picker.Item label="Kaappi" value="Kaappi" />
            <Picker.Item label="Varasto" value="Varasto" />
          </Picker>
      </View>

      <View style={styles.buttons}>
        <Button style={{width: 200 }} mode="contained" onPress={naytaLista}>
          Näytä koko lista</Button>
        <StatusBar style="auto" />
        <View>
          <Button style={{width: 200 }} mode="contained" onPress={suodataLista}>
            Näytä suodatettu lista</Button>
          <StatusBar style="auto" />
          <Button style={{width: 200 }} onPress={nollaaSuodattimet}>
            Nollaa suodattimet</Button>
        </View>
        <StatusBar style="auto" />
      </View>

      <StatusBar style="auto" />

      <FlatList 
        style={{ marginTop: 10, width: '90%'}}
        data={suodatettuVaateLista}
        renderItem={({item}) => 
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={item.kuvaus}/>
            <Card.Content style={styles.card}>
              <View>
                <Text variant="bodyMedium">Vaatteen tyyppi: {item.tyyppi}</Text>
                <Text variant="bodyMedium">Väri: {item.vari}</Text>
                <Text variant="bodyMedium">Tilaisuus: {item.tilaisuus}</Text>
                <Text variant="bodyMedium">Sijainti: {item.sijainti}</Text>
                <Text style={{ color: '#0000ff' }} onPress={() => poistaNappi(item.keyId)}>Poista vaate</Text>
              </View>
              <View style={{ paddingLeft: 20}}>
                  {item.kuvaUri ? (
                    <>
                      <Image style={{ width: 100, height: 150 }} source={{ uri: item.kuvaUri }} />
                    </>
                  ) : (
                    <Text>Ei kuvaa</Text>
                  )}      
              </View>
            </Card.Content>        
          </Card>
        }
      />
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
  picker: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginVertical: 10,
    marginTop: 30

  },
  buttons: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'top',
    justifyContent: 'center',
    height: 40,
    marginVertical: 10,
    marginBottom: 30
  },
  card: {
    flexDirection: 'row',
  }
});
