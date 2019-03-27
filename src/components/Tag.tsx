import React from "react";

interface TagProps {
  text: string;
  isActive: boolean;
  onPress: () => void;
}


export default ({ text, isActive, onPress }: TagProps) => {
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onPress();
  };

  const active = isActive ? "active" : "";
  return (
    <button className={`tag ${active}`} onClick={onClick}>
      {text}
    </button>
  );
};
