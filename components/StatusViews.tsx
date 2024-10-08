import React from 'react';
import { View, Text, ActivityIndicator, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { backgroundImage } from '@/constants/Images';

export const ErrorView = ({ error }: { error: string }) => (
  <ImageBackground
    source={backgroundImage}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <View className="flex-1 p-4 items-center justify-center">
      <FontAwesome name="exclamation-circle" size={50} color="#DC2626" />
      <Text className="text-lg text-red-600 text-center mt-4">{error}</Text>
    </View>
  </ImageBackground>
);

export const LoadingView = () => (
  <ImageBackground
    source={backgroundImage}
    style={{ flex: 1 }}
    resizeMode="cover"
  >
    <View className="flex-1 p-4 items-center justify-center">
      <ActivityIndicator size="large" color="#3B82F6" />
      <Text className="text-lg mt-4">Loading currency rates...</Text>
    </View>
  </ImageBackground>
);
