import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import CurrentItem from '@/components/CurrentItem';

import { useStore } from '@/store/useStore';
import Constants from 'expo-constants';

const CurrencyList = () => {
  const { rates, setRates } = useStore();
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async () => {
    try {
      const response = await axios.get(Constants.expoConfig?.extra?.apiUrl);
      const fetchedRates = Object.values(response.data).map((rate: any) => ({
        code: rate.code,
        name: rate.name,
        rate: rate.rate,
        date: rate.date,
      }));
      setRates(fetchedRates);
      setError(null);
    } catch (error) {
      console.error('Error fetching rates:', error);
      setError('Failed to fetch currency rates. Please try again later.');
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, []);

  const sortedRates = [...rates].sort((a, b) => a.rate - b.rate);
  const lowestRate = sortedRates[0];
  const highestRate = sortedRates[sortedRates.length - 1];

  const backgroundImage = require('@/assets/images/background.jpg'); // Add this line

  if (error) {
    return (
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
  }

  if (rates.length === 0) {
    return (
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
  }

  return (
    <ImageBackground
      source={backgroundImage}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View className="flex-1 p-4 pt-10">
        <View className="flex-row items-center justify-center mb-4">
          <FontAwesome name="money" size={24} color="#4B5563" />
          <Text className="text-3xl ml-2 text-center text-gray-800">
            Currency Conversion Rates
          </Text>
        </View>
        <FlatList
          data={[
            lowestRate,
            highestRate,
            ...rates.filter((r) => r !== lowestRate && r !== highestRate),
          ].filter(Boolean)}
          renderItem={({ item }) => (
            <CurrentItem
              item={item}
              lowest={lowestRate === item}
              highest={highestRate === item}
            />
          )}
          keyExtractor={(item) => item.code}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default CurrencyList;
