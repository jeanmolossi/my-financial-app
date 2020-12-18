import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, CameraCapturedPicture } from 'expo-camera';
import { Image, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import { ThemeColors } from '../../../assets/theme-colors';
import { Text, CameraAction, ActionButtonsContainer } from './styles';

interface CameraComponentProps {
  onCameraReady?: () => void;
  onTakePicture?: () => void;
  onTakePictureEnds?: (pic: CameraCapturedPicture) => void;
  onSave?: (pic: CameraCapturedPicture) => void;
  onDiscard?: () => void;
}

const { width } = Dimensions.get('screen');

const CameraComponent = ({
  onCameraReady: onCameraReadyAction,
  onTakePicture,
  onTakePictureEnds,
  onSave,
  onDiscard
}: CameraComponentProps) => {
  const camRef = useRef<Camera>(null);
  const [ready, setReady] = useState(false);
  const [takingPic, setTakingPic] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [image, setImage] = useState('');
  const [picture, setPicture] = useState({} as CameraCapturedPicture)

  const handleCapture = useCallback(() => {
    setTakingPic(true);
    if(onTakePicture) onTakePicture();

    if(ready){
      camRef.current
        ?.takePictureAsync()
        .then(async response => {
          const { uri } = response;

          const imageResult = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { height: 1080, width: 1080 } }],
            { compress: 0.7 }
          )

          console.log('IMAGE RESULT', imageResult)

          setImage(imageResult.uri);
          setPicture(imageResult);
          setTakingPic(false);

          if( onTakePictureEnds ) onTakePictureEnds(imageResult)
        })
        .catch(() => {
          setTakingPic(false);
        });
    }
  }, [ready, onTakePictureEnds, onTakePicture]);

  const handleSave = useCallback(() => {
    if(onSave) onSave(picture);

    setImage('')
  }, [onSave, picture]);
  
  const handleDiscard = useCallback(() => {
    if(onDiscard) onDiscard();

    console.log('DISCARD')

    setImage('')
  }, [onDiscard]);

  const onCameraReady = useCallback(() => {
    if(onCameraReadyAction) onCameraReadyAction();
    setReady(true);
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted')
    })()
  }, []);

  return (
    <>
      {!image && hasPermission && (
        <Camera
          ref={camRef}
          onCameraReady={onCameraReady}
          pictureSize="1:1"
          ratio="1/1"
          style={{ flex: 1, position: 'relative' }}
        >
          <TouchableOpacity
            onPress={() => {
              if(!takingPic)
                handleCapture()
            }}
            activeOpacity={0.7}
            style={{
              backgroundColor: '#fff',
              borderWidth: 12,
              borderColor: '#fff5',
              width: 80,
              height: 80,
              borderRadius: 80 / 2,
              position: 'absolute',
              bottom: 50,
              left: '50%',
              transform: [
                { translateX: -(80/2) }
              ],
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {takingPic && <ActivityIndicator size={30} color="black" />}
          </TouchableOpacity>
        </Camera>
      )}

      {!!image && (
        <View style={{ flex: 1, position: 'relative', backgroundColor: ThemeColors.darkShade[100] }}>
          <Image source={{ uri: image }} style={{ width, height: width, backgroundColor: '#fff' }} resizeMode="contain" resizeMethod="scale" />

          <SafeAreaView style={{ flex: 1, width }}>
            <ActionButtonsContainer >
              <CameraAction onPress={handleDiscard} style={{ backgroundColor: ThemeColors.purple[100] }}>
                <Text>
                  <Feather name="x" size={16} />
                  Descartar
                </Text>
              </CameraAction>

              <CameraAction onPress={handleSave}>
                <Text>
                  <Feather name="save" size={16} />
                  Manter
                </Text>
              </CameraAction>
            </ActionButtonsContainer>
          </SafeAreaView>

        </View>
      )}
    </>
  );
}

export default CameraComponent;