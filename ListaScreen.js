import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Button, TextInput, Card } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue, remove, set } from "firebase/database";

export default function ListaScreen() {
  const [valittuTyyppi, setValittuTyyppi] = useState();
  const [valittuVari, setValittuVari] = useState();
  const [valittuTilaisuus, setValittuTilaisuus] = useState();
  const [valittuSijainti, setValittuSijainti] = useState();

  const [vaateLista, setVaateLista] = useState([]);
  const [suodatettuVaateLista, setSuodatettuVaateLista] = useState([]);
  
  const database = getDatabase(app);

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

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
    setSuodatettuVaateLista(vaateLista.filter(vaate => vaate.tyyppi === valittuTyyppi || vaate.vari === valittuVari || vaate.tilaisuus === valittuTilaisuus || vaate.sijainti === valittuSijainti));
  };

  //ChatGpt apuna virheenselvityksessä vaatelistan arvojen "kopioimisessa" ja suodattamisessa. virhe oli let muuttujan käyttämisessä, kun piti käyttää tilamuuttujaa. Aiemmin let suodatettuVaateLista 

  const naytaLista = () => {
    setSuodatettuVaateLista(vaateLista);
  }

  return (
    <View style={styles.container}>    
      <Text>Suodata vaatteita</Text> 
      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={valittuTyyppi}
        onValueChange={(itemValue, itemIndex) =>
          setValittuTyyppi(itemValue)
        }>
        <Picker.Item label="Kaikki" value="Kaikki" />
        <Picker.Item label="Housut" value="Housut" />
        <Picker.Item label="Paita" value="Paita" />
        <Picker.Item label="Takki" value="Takki" />
        <Picker.Item label="Mekko" value="Mekko" />
      </Picker> 

      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={valittuVari}
        onValueChange={(itemValue, itemIndex) =>
          setValittuVari(itemValue)
        }>
        <Picker.Item label="Kaikki" value="Kaikki" />
        <Picker.Item label="Punainen" value="Punainen" />
        <Picker.Item label="Musta" value="Musta" />
        <Picker.Item label="Keltainen" value="Keltainen" />
        <Picker.Item label="Vihreä" value="Vihreä" />
        <Picker.Item label="Sininen" value="Sininen" />
        <Picker.Item label="Valkoinen" value="Valkoinen" />
      </Picker> 

      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={valittuTilaisuus}
        onValueChange={(itemValue, itemIndex) =>
          setValittuTilaisuus(itemValue)
        }>
        <Picker.Item label="Kaikki" value="Kaikki" />
        <Picker.Item label="Arki" value="Arki" />
        <Picker.Item label="Juhla" value="Juhla" />
        <Picker.Item label="Ulkoilu" value="Ulkoilu" />
        <Picker.Item label="Urheilu" value="Urheilu" />
      </Picker> 

      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={valittuSijainti}
        onValueChange={(itemValue, itemIndex) =>
          setValittuSijainti(itemValue)
        }>
        <Picker.Item label="Kaikki" value="Kaikki" />
        <Picker.Item label="Kaappi" value="Kaappi" />
        <Picker.Item label="Varasto" value="Varasto" />
      </Picker>

      <Button style={{width: 200 }} mode="contained" onPress={naytaLista}>
        Näytä koko lista</Button>
      <StatusBar style="auto" />

      <Button style={{width: 200 }} mode="contained" onPress={suodataLista}>
        Näytä suodatettu lista</Button>
      <StatusBar style="auto" />


      <FlatList 
        style={{ marginTop: 10, width: '90%'}}
        data={suodatettuVaateLista}
        renderItem={({item}) => 
          <Card style={{ marginBottom: 10 }}>
            <Card.Title title={item.kuvaus} />
            <Card.Content>
              <Text variant="bodyMedium">Vaatteen tyyppi: {item.tyyppi}</Text>
              <Text variant="bodyMedium">Väri: {item.vari}</Text>
              <Text variant="bodyMedium">Tilaisuus: {item.tilaisuus}</Text>
              <Text variant="bodyMedium">Sijainti: {item.sijainti}</Text>
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
});
