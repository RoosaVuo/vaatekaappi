import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";

export default function LomakeScreen() {

  const database = getDatabase(app);
  const [kuvaus, setKuvaus] = useState();
  const [valittuTyyppi, setValittuTyyppi] = useState();
  const [valittuVari, setValittuVari] = useState();
  const [valittuTilaisuus, setValittuTilaisuus] = useState();
  const [valittuSijainti, setValittuSijainti] = useState();
  const [vaate, setVaate] = useState({
    keyId: '',
    kuvaus: '',
    tyyppi: '',
    vari: '',
    tilaisuus: '',
    sijainti: ''
  });
  const [vaateLista, setVaateLista] = useState([]);

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const lisaaListalle = () => {
    if (vaate.kuvaus) {
      const uusiVaate = push(ref(database, 'vaatteet/'));
      const uusiKey = uusiVaate.key; 
  
      set(uusiVaate, {
        keyId: uusiKey,  
        kuvaus: vaate.kuvaus,
        tyyppi: vaate.tyyppi,
        vari: vaate.vari,
        tilaisuus: vaate.tilaisuus,
        sijainti: vaate.sijainti
      })
      .catch((error) => {
        console.error('Virhe tallennuksessa:', error);
      });
    } else {
      Alert.alert('Error', 'Täytä kaikki tiedot');
    }
  };

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

  console.log(vaateLista);

  return (
    <View style={styles.container}>
      <Text>Tänne lomake</Text>
      <TextInput 
        style={{ width: '90%', marginBottom: 10}}
        label="Vaate"
        onChangeText={text => setVaate({...vaate, kuvaus: text})}
        value={vaate.kuvaus}
      />
      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={vaate.tyyppi}
        onValueChange={(itemValue, itemIndex) =>
          setVaate({...vaate, tyyppi: itemValue})
        }>
        <Picker.Item label="Housut" value="Housut" />
        <Picker.Item label="Paita" value="Paita" />
        <Picker.Item label="Takki" value="Takki" />
        <Picker.Item label="Mekko" value="Mekko" />
      </Picker> 

      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={vaate.vari}
        onValueChange={(itemValue, itemIndex) =>
          setVaate({...vaate, vari: itemValue})
        }>
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
        selectedValue={vaate.tilaisuus}
        onValueChange={(itemValue, itemIndex) =>
          setVaate({...vaate, tilaisuus: itemValue})
        }>
        <Picker.Item label="Arki" value="Arki" />
        <Picker.Item label="Juhla" value="Juhla" />
        <Picker.Item label="Ulkoilu" value="Ulkoilu" />
        <Picker.Item label="Urheilu" value="Urheilu" />
      </Picker> 

      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={vaate.sijainti}
        onValueChange={(itemValue, itemIndex) =>
          setVaate({...vaate, sijainti: itemValue})
        }>
        <Picker.Item label="Kaappi" value="Kaappi" />
        <Picker.Item label="Varasto" value="Varasto" />
      </Picker>

      <Button style={{width: 200 }} mode="contained" onPress={lisaaListalle}>
        Lisää listalle</Button>
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
