import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
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

  if (error) {
    return (
      <View className="flex-1 p-4 bg-gray-100 items-center justify-center">
        <Text className="text-lg text-red-600 text-center">{error}</Text>
      </View>
    );
  }

  if (rates.length === 0) {
    return (
      <View className="flex-1 p-4 bg-gray-100 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text className="text-lg mt-4">Loading currency rates...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4 bg-gray-100 pt-10">
      <Text className="text-3xl mb-4 text-center text-gray-800">
        Currency Conversion Rates
      </Text>
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
  );
};

export default CurrencyList;
