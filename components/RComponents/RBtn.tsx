
import React from "react";
import { Text, Pressable } from "react-native";

type RBtnVariantOptions = {
  outlined: string;
  flat: string;
}

type RBtnProps = {
  title: string;
  onPress: () => void;
  variant: keyof RBtnVariantOptions;
};

type focusStyle = {
  focus: "ring-4 ring-$color-300";
}

type RBtnVariantStyles = RBtnVariantOptions & {
 outlined: focusStyle & {
    container: "border border-$color-300 rounded-lg bg-transparent";
    content: "text-$color-700";
    hover: ""
  };
  flat: focusStyle & {
    container: "bg-$color-500 rounded-lg";
    content: "text-white";
    hover: ""
  };
}

const RBtn: React.FC<RBtnProps> = ({ title, onPress, variant }: RBtnProps) => {
  const [focus, setFocus] = React.useState(false);



  return (
    <Pressable onPress={onPress} className={[RBtnVariantStyles[variant].container.replace("$color" color),RBtnVariantStyles[variant].focus.replace("$color", color) ]}>
      <Text className={RBtnVariantStyles[variant]. content.replace("$color", color)}>{title}</Text>
    </Pressable>
  );
};

export default RBtn;
