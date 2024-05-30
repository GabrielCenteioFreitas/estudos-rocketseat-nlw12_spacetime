import { StatusBar, Text, View } from "react-native";

export default function Index() {
  return (
    <View className="bg-gray-950 flex-1 items-center justify-center">
      <Text className="text-zinc-50 font-bold text-4xl">Hello World</Text>
      <StatusBar barStyle="dark-content" translucent />
    </View>
  );
}
