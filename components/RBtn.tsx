import { Pressable } from "react-native";
import React from "react";

type RBtnVariants = {
  outlined: {
    focus: 300
    background: "transparent"
  }
}

const RBtn = ({
  title,
  rounded="lg",
  color="blue"
}: keyof RBtnVariants) => {
  const [focused, setFocus] = React.useState(false);
  
  const roundedStyle = (size)=>`rounded-${size}`;
  const bgColorStyle = (color, variant) => {
    const shade = RBtnVariants[variant].background;
    return typeof shade == "string" ? `bg-${color}` : `bg-${color}-${shade}`;
  }
  const contentColorStyle = (color, variant) => {
    const shade = RBtnVariants[variant].content;
    return typeof shade == "string" ? `text-${color}` : `text-${color}-${shade}`;
  }


  
  return (
    <Pressable
      className=`py-2.5 px-5 focus:ring-4 ${bgColorStyle()} ${roundedStyle()}`
    >
      <Text
        className=`text-sm font-medium ${contentColorStyle()}`
      >{title}</Text>
    </Pressable>
  );
}

export { RBtn }
