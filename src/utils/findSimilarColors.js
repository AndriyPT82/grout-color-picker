const threshold = 50

export const findSimilarColors = (targetColor, colorCollection) => {


  return colorCollection.filter((color) => {
    const rgb = color[2].split(',')
    const distance = calculateColorDistance(targetColor.split(','), rgb);

    return distance <= threshold
  });
};

const calculateColorDistance = (color1, color2) => {
  // console.log(color1, color2);
  const rDiff = color1[0] - +color2[0];
  const gDiff = color1[1] - +color2[1];
  const bDiff = color1[2] - +color2[2];

  const distance = Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);

  return distance;  
};
