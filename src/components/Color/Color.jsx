import React, { useContext, memo } from "react";
import classNames from 'classnames'
import './Color.scss'

import { ColorContext } from "../GroutColor";



export const Color = memo(({ color, targetName, isActive = false }) => {

  const { handleClick, colorForDisplay } = useContext(ColorContext)
  const [colorName, colorNumber, rgb] = color || [];

  return (
    <li className="color">
      <div
        className={classNames(
          "color__body",
          { "color--active": isActive || 'selectedColorField' === targetName && colorForDisplay === color }
          )
        }
        style={{ backgroundColor: `rgb(${rgb})` }}
        onClick={() => handleClick({ targetName, color })}
      >
      </div>
      {targetName === 'aboutColorField' && <h6>{`${colorNumber} ${colorName}`}</h6>}
    </li>
  )
});

