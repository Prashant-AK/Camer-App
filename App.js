import React, {useState} from 'react';

import {
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{fontSize: 30, color: 'red'}}> Loading ...</Text>
  </View>
);

const App = () => {
  const [image, setimage] = useState(null);
  const takePicture = async camera => {
    try {
      const options = {qualit: 0.9, base64: false};
      const data = await camera.takePictureAsync(options);
      setimage(data.uri);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {image ? (
          <View style={styles.preview}>
            <View>
              <Text style={styles.camtext}>Here is your New Profile</Text>
            </View>
            <Image
              style={styles.clicked}
              source={{uri: image, width: '100%', height: '80%'}}
            />
            <Button title="Click New Image" onPress={() => setimage(null)} />
          </View>
        ) : (
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.front}
            captureAudio={false}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'permission to use camera',
              message: 'longer text to use camera',
              buttonPositive: 'OK',
              buttonNegative: 'cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'permission to use audio',
              message: 'longer text to use audio',
              buttonPositive: 'OK',
              buttonNegative: 'cancel',
            }}>
            {({camera, status}) => {
              if (status != 'READY') return <PendingView />;
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.capture}
                    onPress={() => {
                      takePicture(camera);
                    }}>
                    <Text>Snap</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </RNCamera>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A79DF',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
  },
  camtext: {
    backgroundColor: '#3498DB',
    color: '#FFFFFF',

    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 20,
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150,
    marginVertical: '50%',
  },
});

export default App;
