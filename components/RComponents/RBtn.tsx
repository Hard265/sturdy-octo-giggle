
import React from "react";
import { Text, Pressable, ViewStyle, TextStyle } from "react-native";

enum RBtnVariant {
  Outlined= "outlined",
  Flat= "flat",
}

type RBtnProps = {
  title: string;
  onPress: () => void;
  variant: RBtnVariant;
  color?: string;
};

const getStyle = (color: string, variant: RBtnVariant): {container: string, text: string} => {
  switch(variant){
    case RBtnVariant.Outlined:
      return {
        container: "py-2.5 px-5 border border-$color-300 rounded-lg bg-transparent",
        text: "text-$color-700"
      }
    case RBtnVariant.Flat:
      return {
        container: "py-2.5 px-5 bg-$color-500 rounded-lg",
        text: "text-white"
      }
    default:
      return {
      container: "",
      text: ""
    }
  }
}

const RBtn: React.FC<RBtnProps> = ({ title, onPress, variant, color="blue" }: RBtnProps) => {
  const [focus, setFocus] = React.useState(false);

  const style = getStyle(color, variant)


  return (
    <Pressable onPress={onPress} className={style.container.replace("$color", color)}>
      <Text className={style.text.replace("$color", color)}>{title}</Text>
    </Pressable>
  );
};

export {RBtn as default, RBtnVariant};
