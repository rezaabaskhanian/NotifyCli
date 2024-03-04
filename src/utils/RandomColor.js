import { Colors } from "../styles";

export  const getRandomColor = () => {
    const colors = [Colors.BLUE_LIGHT_HEADER,Colors.GRAY_LIGHT_HEADER,Colors.GREEN_LIGHT_HEADER,Colors.GREEN_PISTACHIO_HEADER];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
  };