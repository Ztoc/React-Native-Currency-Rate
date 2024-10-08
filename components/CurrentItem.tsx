import { View, Text } from 'react-native';
import { CurrencyRate } from '../constants/Types';
import { FontAwesome } from '@expo/vector-icons';

interface CurrentItemProps {
  item: CurrencyRate;
  lowest: boolean;
  highest: boolean;
}

const CurrentItem = ({ item, lowest, highest }: CurrentItemProps) => (
  <View
    className={`bg-gray-100 p-4 my-2 rounded-lg shadow-md ${
      lowest
        ? 'border-l-4 border-green-500'
        : highest
        ? 'border-l-4 border-red-500'
        : 'border-l-4 border-yellow-500'
    }`}
  >
    <View className="flex-row justify-between items-center">
      <Text className="text-lg font-bold text-blue-950">
        {item.name} ({item.code})
      </Text>
      <View className="flex-row items-center">
        {lowest && (
          <View className="flex-row items-center bg-green-100 px-2 py-1 rounded-full">
            <FontAwesome name="arrow-down" size={12} color="#22c55e" />
            <Text className="text-green-600 text-xs ml-1 font-semibold">
              Lowest
            </Text>
          </View>
        )}
        {highest && (
          <View className="flex-row items-center bg-red-100 px-2 py-1 rounded-full ml-2">
            <FontAwesome name="arrow-up" size={12} color="#ef4444" />
            <Text className="text-red-600 text-xs ml-1 font-semibold">
              Highest
            </Text>
          </View>
        )}
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

export default CurrentItem;
