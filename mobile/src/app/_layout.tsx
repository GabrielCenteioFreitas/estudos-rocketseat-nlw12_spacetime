import { Stack } from 'expo-router';
import { styled } from 'nativewind';
import { ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store'

import {
  BaiJamjuree_700Bold,
} from '@expo-google-fonts/bai-jamjuree';
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto';

import blurBg from '../assets/bg-blur.png';
import Stripes from '../assets/stripes.svg';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

const StyledStripes = styled(Stripes)

export default function RootLayout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  });

  useEffect(() => {
    SecureStore.getItemAsync('token').then(token => {
      setIsUserAuthenticated(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={ { position: 'absolute', left: '-50%' } }
    >
      <StyledStripes className="absolute left-2" />
      <StatusBar style="light" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: 'fade'
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuthenticated as boolean | undefined} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
