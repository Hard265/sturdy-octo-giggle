
import React from "react";
import { Text, Pressable, ViewStyle, TextStyle } from "react-native";

type RBtnVariant = "outlined" | "flat";

type RBtnProps = {
  title: string;
  onPress: () => void;
  variant: RBtnVariant;
  color?: string;
};

const getStyle = (color: string, variant: RBtnVariant): { container: string, text: string } => {
  switch (variant) {
    case "outlined":
      return {
        container: "w-full flex justify-center items-center py-3.5 px-5 rounded-lg border border-$color-300".replace("$color", color),
        text: "text-sm font-medium text-$color-800".replace("$color", color)
      }
    case "flat":
      return {
        container: "w-full flex justify-center items-center py-3.5 px-5  rounded-lg bg-$color-600 mb-3".replace("$color", color),
        text: "text-sm font-medium text-white"
      }
    default:
      return {
        container: "",
        text: ""
      }
  }
}

const RBtn: React.FC<RBtnProps> = ({ title, onPress, variant, color = "blue" }: RBtnProps) => {
  const [focus, setFocus] = React.useState(false);

  const style = getStyle(color, variant)


  return (
    <Pressable onPress={onPress} className={style.container}>
      <Text className={style.text}>{title}</Text>
    </Pressable>
  );
};

export { RBtn as default, RBtnVariant };
