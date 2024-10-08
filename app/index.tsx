import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';

import CurrentItem from '@/components/CurrentItem';
import { useStore } from '@/store/useStore';
import { backgroundImage } from '@/constants/Images';
import { ErrorView, LoadingView } from '@/components/StatusViews';
import { sortRates, filterUniqueRates } from '@/utils/rateUtils';

const CurrencyList = () => {
  const { rates, setRates } = useStore();
  const [error, setError] = useState<string | null>(null);

  const fetchRates = useCallback(async () => {
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
  }, [setRates]);

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 10000);
    return () => clearInterval(interval);
  }, [fetchRates]);

  const sortedRates = sortRates(rates);
  const [lowestRate, highestRate] = [
    sortedRates[0],
    sortedRates[sortedRates.length - 1],
  ];

  if (error) return <ErrorView error={error} />;
  if (rates.length === 0) return <LoadingView />;

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
          data={filterUniqueRates(lowestRate, highestRate, rates)}
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
