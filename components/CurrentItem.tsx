import { View, Text } from 'react-native';
import { CurrencyRate } from '../constants/Types';

interface CurrentItemProps {
  item: CurrencyRate;
  lowest: boolean;
  highest: boolean;
}

const CurrentItem = ({ item, lowest, highest }: CurrentItemProps) => (
  <View
    className={`bg-white p-4 my-2 rounded-lg ${
      lowest
        ? 'border-2 border-green-500'
        : highest
        ? 'border-2 border-red-500'
        : 'border-2 border-gray-500'
    }`}
  >
    <Text className="text-lg text-blue-950">
      {item.name} ({item.code})
    </Text>
    <View className="flex-row justify-between">
      <Text className="text-base mt-1">Rate: {item.rate.toFixed(4)}</Text>
      <View className="flex-row">
        {lowest && <Text className="text-green-500 mr-2">Lowest</Text>}
        {highest && <Text className="text-red-500">Highest</Text>}
      </View>
    </View>
    <Text className="text-sm text-gray-600 mt-1">
      Last updated: {new Date(item.date).toLocaleString()}
    </Text>
  </View>
);

export default CurrentItem;
