import React from "react";
import { Color } from '../Color'
import './Colors.scss'


export const Colors = ({ colors }) => {

  return (
    <ul className="colors">
      {
        colors.map((color) => (
          <React.Fragment key={color}>
            <Color color={color} targetName={'selectedColorField'}/>
          </React.Fragment>
        ))
      }
    </ul>
  )
}