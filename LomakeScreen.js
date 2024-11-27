import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View, Alert, Image, Platform, Keyboard} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState, useRef, useEffect } from 'react';
import { app } from './firebaseConfig';
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigation } from '@react-navigation/native';

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
        kuvaUri: tiedostoUri || null
      })
      .catch((error) => {
        console.error('Virhe tallennuksessa:', error);
      });
    
      Alert.alert('Haluatko siirtyä listalle?',  '',[
        {
          text: 'Siirry listalle',
          onPress: () => siirryListalle()
        },
        {text: 'lisää uusi vaate', onPress: () => lisaaUusiVaate()},
      ])      
    } else {
      Alert.alert('Error', 'Täytä kaikki tiedot');
    }
  };

  const siirryListalle = () => {
    setVaate({
      keyId: '',
      kuvaus: '',
      tyyppi: '',
      vari: '',
      tilaisuus: '',
      sijainti: '',
      kuvaUri: null,
    });
    navigation.navigate('Vaatelista')
  }


  const lisaaUusiVaate = () => {
    setVaate({
      keyId: '',
      kuvaus: '',
      tyyppi: '',
      vari: '',
      tilaisuus: '',
      sijainti: '',
      kuvaUri: '',
    });
    navigation.navigate('Lisää vaate')
  }

  return (
    <View style={styles.container}>
      <Text>Lisää vaate</Text>
      <TextInput 
        style={{ width: '90%', marginBottom: 10}}
        label="Vaate"
        onChangeText={text => setVaate({...vaate, kuvaus: text})}
        value={vaate.kuvaus}
        onEndEditing={() => Keyboard.dismiss()}
      />
      <View style={styles.picker}>
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={vaate.tyyppi}
            onValueChange={(itemValue, itemIndex) =>
              setVaate({...vaate, tyyppi: itemValue})
            }>
            <Picker.Item label="Valitse tyyppi" value="" />
            <Picker.Item label="Housut" value="Housut" />
            <Picker.Item label="Paita" value="Paita" />
            <Picker.Item label="Takki" value="Takki" />
            <Picker.Item label="Mekko" value="Mekko" />
          </Picker>
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={vaate.vari}
            onValueChange={(itemValue, itemIndex) =>
              setVaate({...vaate, vari: itemValue})
            }>
            <Picker.Item label="Valitse väri" value="" />
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
            selectedValue={vaate.tilaisuus}
            onValueChange={(itemValue, itemIndex) =>
              setVaate({...vaate, tilaisuus: itemValue})
            }>
            <Picker.Item label="Valitse tilaisuus" value="" />
            <Picker.Item label="Arki" value="Arki" />
            <Picker.Item label="Juhla" value="Juhla" />
            <Picker.Item label="Ulkoilu" value="Ulkoilu" />
            <Picker.Item label="Urheilu" value="Urheilu" />
          </Picker>
        
          <Picker
            style={{width: 200}}
            ref={pickerRef}
            selectedValue={vaate.sijainti}
            onValueChange={(itemValue, itemIndex) =>
              setVaate({...vaate, sijainti: itemValue})
            }>
            <Picker.Item label="Valitse sijainti" value="" />
            <Picker.Item label="Kaappi" value="Kaappi" />
            <Picker.Item label="Varasto" value="Varasto" />
          </Picker>
      </View>

      <Button style={styles.button} mode="contained" onPress={() => navigation.navigate('Kamera')}>
        Ota kuva</Button>
      
        <View>
          {tiedostoUri ? (
            <>
              <Image style={styles.kuva} source={{ uri: tiedostoUri }} />
            </>
          ) : (
            <Text>Ei kuvaa</Text>
          )}      
        </View>

      <Button style={styles.button} mode="contained" onPress={lisaaListalle}>
        Lisää listalle</Button>
      <StatusBar style="auto" />
    </View>
  );
}

// chatgpt neuvoilla platform käyttöän ja dokumentaatiolla tarkemmat ohjeet 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    ...Platform.select({
      android: {
        justifyContent: 'center',
      },
      ios: {
        justifyContent: 'top',
      },
      default: {
        justifyContent: 'center',
      }
    })
  },
  picker: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        marginTop: 0,
      },
      ios: {
        marginTop: 50,
      },
      default: {
        marginTop: 0,
      }
    }),
    height: 40,
    marginVertical: 10
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: 200,
  },
  kuva: {
    

    ...Platform.select({
      android: {
        width: 150, 
        height: 200,
      },
      ios: {
        width: 100, 
        height: 100,
      },
      default: {
        width: 150, 
        height: 200,
      }
    }),

  }
});
