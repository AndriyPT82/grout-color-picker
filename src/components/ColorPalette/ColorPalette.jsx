import React, { useContext, memo, useState, useEffect } from "react";
import { ColorPicker } from "../ColorPicker";
import { v4 as uuidv4 } from 'uuid';
import { Color } from "../Color";
import { findSimilarColors } from "../../utils/findSimilarColors";
import { TogglePalette } from "../TogglePalette/TogglePalette";
import './ColorPalette.scss'

import { ColorContext } from "../GroutColor";


export const ColorPalette = ({ colorList, color, onSetIsOpenPalette }) => {


  const [currentColor, setCurrentColor] = useState(null)
  const [matchingColors, setMatchingColors] = useState([])
  const [chosenColors, setСhosenColors] = useState([])

  const { handleClick, colorForDisplay } = useContext(ColorContext)

  useEffect(() => {
    if(!colorForDisplay) return
    console.log('нема входу');
    setCurrentColor(color || [,,'100,150,35'])
  }, [color])

  useEffect(() => {
    if (!currentColor) return;

    const rgb = currentColor[2]
    const res = findSimilarColors(rgb, colorList).slice(0, 3)
    setMatchingColors(res)
  }, [currentColor])


  // console.log(currentColor, '100,150,35');

  return (
    <div className="palette">
      <TogglePalette value="+" onSetIsOpenPalette={onSetIsOpenPalette} isOpen={false} />
      <div className="palette__field">
        <ColorPicker setCurrentColor={setCurrentColor} />
      </div>
      <div className="palette__colors-block">
        <h4>Matching Grout Colors</h4>

        <ul className="palette__matching-colors">
          {currentColor && <Color color={currentColor} isActive={true} />}
          {
            matchingColors.map(color => (

              <div
                key={uuidv4()}
                onClick={() => setСhosenColors(prev => {
                  return chosenColors.includes(color)
                    ? chosenColors.filter(item => item !== color)
                    : [...prev, color]
                })}>
                <Color
                  color={color}
                  targetName='matchingColorField'
                  isActive={chosenColors.includes(color)}
                />
              </div>
            ))
          }
        </ul>
        <button
          className="palette__button-apply"
          onClick={() => {
            console.log(chosenColors);

            handleClick({targetName: 'matchingColorsField',color: chosenColors})
            setСhosenColors([])
            setMatchingColors([])
          }}
          disabled={!chosenColors.length}
        >
          Apply
        </button>
      </div>


    </div>
  )
};
