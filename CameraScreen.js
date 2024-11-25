import { Button } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import {  useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef(null);
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Sovellus tarvitsee luvan kameran käyttämiselle</Text>
        <Button onPress={requestPermission} title="Myönnä lupa" />
      </View>
    );
  }
  //Chat gpt neuvoi, että tilamuuttuja on tässä turha, kun photo.urin voi välittää suoraan parametrinä. Base64 ei ole tarpeelinen, kun kuva näytetään urin avulla.
  //ChatGpt kysyin neuvoa kuvan tallentamisesta ja sain ohjeen, että kuva kannattaa tallentaa laitteelle tai firebase storageen.  
  // luin ChatGpt ohjeita, mutta ne eivät tuntuneet täysin järkeviltä vaan sovelsin omaan koodiin
  // virheilmoitus "possible unhandled promise rejection (id:0)..." chatgpt avulla sain lisättyä oikeat try -catch yhdistelmät, jolla tunnistaa virheet.

   const snap = async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePictureAsync({base64: true}); 
        const tiedostoUri = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;
        try {
          await FileSystem.copyAsync({
            from: photo.uri,
            to: tiedostoUri,
            }); 
        } catch (fileError) {
            console.error('Virhe tallennuksessa:', fileError);
          };
          navigation.navigate('Lisää vaate', { tiedostoUri});
        } else {
          console.log('Kameraa ei alustettu')
        }  
    } catch (cameraError) {
      console.error('virhe kuvan ottamisessa:' , cameraError)
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={camera}>
        <View style={styles.buttonContainer}>
            <Button  mode="contained" onPress={snap}>
        Ota kuva</Button>
        </View>
      </CameraView>
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
    camera: {
      flex: 1,
      minWidth: "100%",
    },
    message: {
      textAlign: 'center',
      paddingBottom: 10,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        margin: 64,
        marginTop: 400,
      },
  });
  
  