import React, { useEffect, useMemo, useState } from 'react';
import { Dimensions, View, Image as RNImage, ActivityIndicator, StyleProp, ImageStyle } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ThemeColors } from '../../../assets/theme-colors';

interface ImageProps {
  source: string;
  width?: number;
  height?: number;
  imageStyle?: StyleProp<ImageStyle>;
}

const { width: dimensionsWidth, height: dimensionsHeight } = Dimensions.get('screen')

const Image = ({
  source,
  width: propsWidth,
  height: propsHeight,
  imageStyle = {}
}: ImageProps) => {
  const [uri, setUri] = useState(source);
  const [loadingImage, setLoadingImage] = useState(true);

  const cacheDirectory = useMemo(() => FileSystem.cacheDirectory, [])

  const FileToken = useMemo(() => {
    const [,token] = source.split('&token=');

    if(!token) throw new Error('No valid token')

    return token;
  }, [source])
  
  const { width, height } = useMemo(() => ({
    width: propsWidth || dimensionsWidth,
    height: propsHeight || dimensionsHeight,
  }), [propsWidth, propsHeight])

  useEffect(() => {
    const loadCache = async () => {
      setLoadingImage(true);
      const path = `${cacheDirectory}${FileToken}`;

      const image = await FileSystem.getInfoAsync(path);

      if(image.exists) {
        setLoadingImage(false);
        return image.uri;
      }

      const newCacheImage = await FileSystem.downloadAsync(source, path);

      setLoadingImage(false);
      return newCacheImage.uri;
    };

    loadCache()
      .then(uri => setUri(uri))
  }, [FileToken, cacheDirectory])

  return (
    <>
      {loadingImage
        ? (
          <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size={24} color={ThemeColors.green[100] || 'white'} />
          </View>
        ) : (
        <RNImage
          width={width}
          height={height}
          source={{
            uri,
            width,
            height
          }}
          style={imageStyle}
        />
      )}
    </>
  );
}

export default Image;