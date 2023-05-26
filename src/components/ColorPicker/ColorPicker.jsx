import React, { useState, useContext, useEffect } from "react";
import "./ColorPicker.css";
import { RgbColorPicker } from "react-colorful";

import { ColorContext } from "../GroutColor";

export const ColorPicker = ({ setCurrentColor }) => {
  const { colorForDisplay, setColorForDisplay } = useContext(ColorContext);

  const [color, setColor] = useState({ r: 100, g: 150, b: 35 });

  useEffect(() => {
    if (!colorForDisplay) {
      const rgb = Object.values(color).toString()
      setCurrentColor([, , rgb])
      return
    };

    const [r, g, b] = colorForDisplay[2].split(',');

    setColor({ r: +r, g: +g, b: +b })
  }, [colorForDisplay])


  const handleClick = (value) => {
    const rgb = Object.values(value).toString()
    setCurrentColor([, , rgb])
    setColorForDisplay(null)
  }

  return (
    <div className="my">
      <RgbColorPicker
        color={color}
        onChange={handleClick}
      />
    </div>
  );
}
