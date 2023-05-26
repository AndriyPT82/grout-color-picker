import React from "react";
import './TogglePalette.scss'

export const TogglePalette = ({ value, onSetIsOpenPalette, isOpen }) => {

  return (
    <button 
      className="toggle-palette" 
      onClick={() => {onSetIsOpenPalette(isOpen)}}
    > 
    {value}
    </button>
  )
};
