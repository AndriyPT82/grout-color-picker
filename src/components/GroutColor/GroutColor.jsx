import React, { useState, useEffect, createContext } from "react";
import { formatData } from "../../utils/formatData";
import { TogglePalette } from "../TogglePalette/TogglePalette";
import { ColorPalette } from "../ColorPalette";
import { Colors } from "../Colors/Colors";
import { Color } from "../Color";
import './GroutColor.scss'

export const ColorContext = createContext();

export const GroutColor = () => {

  const [colorList, setColorList] = useState([])
  
  const [addedColors, setAddedColors] = useState([])
  const [colorForDisplay, setColorForDisplay] = useState(null)
  const [isOpenPalette, setIsOpenPalette] = useState(false)

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/1asiaKWRxS1RnmKkNRLDQljK-frZIOGlUB1BJcLAwznA/gviz/tq?')
      .then(e => e.text())
      .then(res => {
        const data = JSON.parse(res.substring(47).slice(0, -2))
        setColorList(formatData(data))

        // видалити обовязково
        const clrs = formatData(data)
        // setAddedColors(clrs.slice(0, 4))

      })
      .catch(e => console.log(e))
  }, [])

  const handleClick = (obj) => {
    const { targetName, color } = obj;
    switch (targetName) {
      case 'selectedColorField':
        setColorForDisplay(color)
        setIsOpenPalette(true)
        break;
      case 'matchingColorsField':
        setAddedColors(prev => {
          return [...prev, ...color]
        })
        break

      default:
        break;
    }
  }

  return (
    <ColorContext.Provider value={{
      handleClick,
      setColorForDisplay,
      colorForDisplay
    }}>
      <div className="grout-color">
        <h4>Grout Color</h4>
        <Colors colors={addedColors} />
        <div className="grout-color__info-block">
          {
            colorForDisplay && <Color color={colorForDisplay} targetName={'aboutColorField'} />
          }
          <TogglePalette value="+" onSetIsOpenPalette={setIsOpenPalette} isOpen={true} />
          {
            isOpenPalette && <ColorPalette
              colorList={colorList}
              color={colorForDisplay}
              onSetIsOpenPalette={setIsOpenPalette}
            />
          }
        </div>
      </div>
    </ColorContext.Provider>
  )
}