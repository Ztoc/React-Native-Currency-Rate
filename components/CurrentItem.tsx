import React from 'react';
import { View, Text } from 'react-native';
import { CurrencyRate } from '../constants/Types';
import { FontAwesome } from '@expo/vector-icons';

interface CurrentItemProps {
  item: CurrencyRate;
  lowest: boolean;
  highest: boolean;
}

const CurrentItem: React.FC<CurrentItemProps> = ({ item, lowest, highest }) => {
  const getBorderColor = () => {
    if (lowest) return 'border-green-500';
    if (highest) return 'border-red-500';
    return 'border-yellow-500';
  };

  const StatusBadge: React.FC<{ isLowest: boolean }> = ({ isLowest }) => (
    <View
      className={`flex-row items-center bg-${
        isLowest ? 'green' : 'red'
      }-100 px-2 py-1 rounded-full ${!isLowest ? 'ml-2' : ''}`}
    >
      <FontAwesome
        name={`arrow-${isLowest ? 'down' : 'up'}`}
        size={12}
        color={isLowest ? '#22c55e' : '#ef4444'}
      />
      <Text
        className={`text-${
          isLowest ? 'green' : 'red'
        }-600 text-xs ml-1 font-semibold`}
      >
        {isLowest ? 'Lowest' : 'Highest'}
      </Text>
    </View>
  );

  return (
    <View
      className={`bg-gray-100 p-4 my-2 rounded-lg shadow-md border-l-4 ${getBorderColor()}`}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold text-blue-950">
          {item.name} ({item.code})
        </Text>
        <View className="flex-row items-center">
          {lowest && <StatusBadge isLowest={true} />}
          {highest && <StatusBadge isLowest={false} />}
        </View>
      </View>
      <Text className="text-2xl font-bold text-blue-950 mt-2">
        {item.rate.toFixed(4)}
      </Text>
      <Text className="text-sm text-gray-600 mt-1">
        Last updated: {new Date(item.date).toLocaleString()}
      </Text>
    </View>
  );
};

export default CurrentItem;
