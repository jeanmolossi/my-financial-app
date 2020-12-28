import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { Image, TouchableOpacity, View, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import { ThemeColors } from '../../../assets/theme-colors';
import { Text, CameraAction, ActionButtonsContainer } from './styles';

interface CameraComponentProps {
  onCameraReady?: () => void;
  onTakePicture?: () => void;
  onTakePictureEnds?: (pic: Blob) => void;
  onSave?: (pic: Blob) => void;
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

  const handleCapture = useCallback(async () => {
    setTakingPic(true);
    if(onTakePicture) onTakePicture();

    if(ready){
      const uri = await camRef.current
        ?.takePictureAsync()
        .then(({ uri }) => uri)
        .catch(() => {
          setTakingPic(false);
        });
        
      if(!uri){
        console.log('Empty uri')

        setTakingPic(false);
        return;
      }
      
      const imageResult = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { height: 1080, width: 1080 } }],
        { compress: 0.7 }
      )

      const blob = await fetch(imageResult.uri)
        .then(response => response)
        .then(response => response.blob());

      setImage(imageResult.uri);

      if( onTakePictureEnds && blob ) onTakePictureEnds(blob)
      
      setTakingPic(false);
    }
  }, [ready, onTakePictureEnds, onTakePicture]);

  const handleSave = useCallback(async () => {
    const blobPicture = await fetch(image)
      .then(response => response)
      .then(response => response.blob())

    if(onSave && blobPicture) onSave(blobPicture);

    setImage('')
  }, [onSave, image]);
  
  const handleDiscard = useCallback(() => {
    if(onDiscard) onDiscard();

    setImage('')
  }, [onDiscard]);

  const onCameraReady = useCallback(() => {
    if(onCameraReadyAction) onCameraReadyAction();
    setReady(true);
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      
      setHasPermission(status === 'granted')
    };

    requestPermissions();

    return () => {
      // UNMOUNT COMPONENT
    }
  }, []);

  return (
    <View style={{ flex: 1, position: 'relative', backgroundColor: ThemeColors.darkShade[100] }}>
      {!image && hasPermission && (
        <>
          <Camera
            ref={camRef}
            onCameraReady={onCameraReady}
            ratio={'1:1'}
            style={{ width, height: width }}
            useCamera2Api={false}
          />

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
        </>
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
    </View>
  );
}

export default CameraComponent;