import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';


export default function LomakeScreen({route}) {

  const database = getDatabase(app);
  const {tiedostoUri} = route.params || {};
  //chatgpt apuna virheentunnistuksessa -> ||{} puuttui määrityksestä ja sen takia undefined virheviesti, eikä lomaketta saanut auki ennen kuvaa.
  const navigation = useNavigation();
  const [vaate, setVaate] = useState({
    keyId: '',
    kuvaus: '',
    tyyppi: '',
    vari: '',
    tilaisuus: '',
    sijainti: '',
    kuvaUri: '',
  });

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }

  const lisaaListalle = () => {
    if (vaate.kuvaus && vaate.tyyppi && vaate.vari && vaate.tilaisuus && vaate.sijainti) {
      const uusiVaate = push(ref(database, 'vaatteet/'));
      const uusiKey = uusiVaate.key; 
  
      set(uusiVaate, {
        keyId: uusiKey,  
        kuvaus: vaate.kuvaus,
        tyyppi: vaate.tyyppi,
        vari: vaate.vari,
        tilaisuus: vaate.tilaisuus,
        sijainti: vaate.sijainti,
        kuvaUri: tiedostoUri
      })
      .catch((error) => {
        console.error('Virhe tallennuksessa:', error);
      });
    } else {
      Alert.alert('Error', 'Täytä kaikki tiedot');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Lisää vaate</Text>
      <TextInput 
        style={{ width: '90%', marginBottom: 10}}
        label="Vaate"
        onChangeText={text => setVaate({...vaate, kuvaus: text})}
        value={vaate.kuvaus}
      />
      <View style={styles.picker}>
        <Picker
          style={{width: 150}}
          ref={pickerRef}
          selectedValue={vaate.tyyppi}
          onValueChange={(itemValue, itemIndex) =>
            setVaate({...vaate, tyyppi: itemValue})
          }>
          <Picker.Item label="Valitse" value="" />
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
          <Picker.Item label="Valitse" value="" />
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
          style={{width: 150}}
          ref={pickerRef}
          selectedValue={vaate.tilaisuus}
          onValueChange={(itemValue, itemIndex) =>
            setVaate({...vaate, tilaisuus: itemValue})
          }>
          <Picker.Item label="Valitse" value="" />
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
          <Picker.Item label="Valitse" value="" />
          <Picker.Item label="Kaappi" value="Kaappi" />
          <Picker.Item label="Varasto" value="Varasto" />
        </Picker>
      </View>

      <Button style={{width: 200 }} mode="contained" onPress={() => navigation.navigate('Kamera')}>
        Ota kuva</Button>
      
        <View style={{height: 200 }}>
          {tiedostoUri ? (
            <>
              <Image style={{ width: 100, height: 100 }} source={{ uri: tiedostoUri }} />
            </>
          ) : (
            <Text>No photo taken yet.</Text>
          )}      
        </View>

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
  picker: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginVertical: 10
  },
  camera: {
    flex: 1,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
});
