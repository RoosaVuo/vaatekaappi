import { StatusBar } from 'expo-status-bar';
import { TextInput } from 'react-native-paper';
import { StyleSheet, Button, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const navigation = useNavigation();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //Chat gpt neuvoi, että tilamuuttuja on tässä turha, kun photo.urin voi välittää suoraan parametrinä
  //ChatGpt kysyin neuvoa kuvan tallentamisesta ja sain ohjeen, että kuva kannattaa tallentaa laitteelle tai firebase storageen. base65 on sen verran iso, että ei kannata välittää parametrinä.
  // Yksi vaihtoehto välittää vain photo.uri ja convertoida se toisella sivulla. 

  const snap = async () => {
    if (camera) {
      const photo = await camera.current.takePictureAsync({base64: true});
      setPhotoBase64(photo.base64); 
    }
    navigation.navigate('Lisää vaate', {photoName: photo.uri});
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={camera}>
        <View style={styles.buttonContainer}>
            <Button title="Take Photo" onPress={snap} />
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
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
  });
  
  