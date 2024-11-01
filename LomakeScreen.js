import { StatusBar } from 'expo-status-bar';
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useState, useRef } from 'react';

export default function LomakeScreen() {

  const [vaate, setVaate] = useState();
  const [valittuTyyppi, setValittuTyyppi] = useState();
  const [valittuVari, setValittuVari] = useState();
  const [valittuTilaisuus, setValittuTilaisuus] = useState();

  const pickerRef = useRef();
  function open() {
    pickerRef.current.focus();
  }
  function close() {
    pickerRef.current.blur();
  }


  return (
    <View style={styles.container}>
      <Text>Tänne lomake</Text>
      <TextInput 
        style={{ width: '90%', marginBottom: 10}}
        label="Vaate"
        onChangeText={text => setVaate(text)}
        value={vaate}
      />
      <Picker
        style={{width: 150}}
        ref={pickerRef}
        selectedValue={valittuTyyppi}
        onValueChange={(itemValue, itemIndex) =>
          setValittuTyyppi(itemValue)
        }>
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
        <Picker.Item label="Arki" value="Arki" />
        <Picker.Item label="Juhla" value="Juhla" />
        <Picker.Item label="Ulkoilu" value="Ulkoilu" />
        <Picker.Item label="Urheilu" value="Urheilu" />
      </Picker> 

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
