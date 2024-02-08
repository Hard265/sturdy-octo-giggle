import { useColorScheme } from "nativewind";
import { Text } from "react-native";
import Themes from "../misc/theme";

export default function ThemeText({ ...props }) {
  const { colorScheme } = useColorScheme();
  const theme = Themes[colorScheme];

  return (
    <Text
      style={{
        color: theme.text,
      }}
      {...props}
    />
  );
}
