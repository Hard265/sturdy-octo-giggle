import { Pressable } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ToggleProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function Toogle({ value, onChange }: ToggleProps) {
  const progress = useSharedValue(value ? 1 : 0);

  const handlePress = () => {
    progress.value = withTiming(progress.value === 1 ? 0 : 1, {
      duration: 200,
    });
    onChange(progress.value === 1 ? false : true);
  };

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#18181B", "#D1D5DB"]
      ),
      transform: [{ translateX: progress.value * 52 }],
    };
  });
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["#18181B", "#D1D5DB"]
      ),
    };
  });

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        className="border rounded-full dark:border-gray-800 w-[52px] h-8"
        style={[animatedContainerStyle]}
      >
        <Animated.View
          className="w-7 h-7 rounded-full"
          style={[animatedThumbStyle]}
        />
      </Animated.View>
    </Pressable>
  );
}
