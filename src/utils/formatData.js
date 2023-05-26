export function formatData(data) {
  const headers = {
    'A': 'Color Name',
    'B': 'Color Number',
    'C': 'RGB',
  }

  // формуємо масив [colorName, colorNumber, RGB] з значеннями які не 
  // потрапили в data.table.rows а зберігаються в полі data.table.cols
  const arrRows = data.table.rows.map((element, index) => {
    const colorName = element.c[0].v;
    const colorNumber = element.c[1]?.f || index + 1;
    const RGB = element.c[2].v;

    return [
      colorName,
      colorNumber,
      RGB
    ]
  });

  // формуємо масив [[colorNames],[colorNumbers],[RGBs]] які зберігаються
  // під ключем data.table.rows: [
  //    {d: 'A', label: 'Color Name Frostine Gardenia...'},
  //    {d: 'B', label: 'Color Number AF-5 AF-10 AF-15 AF-20...'},
  //    {d: 'C', label:  'RGB 239,242,236 244,241,234 241...'}
  //  ]
  const arrColls = data.table.cols.map((item) => {
    const { id, label } = item;
    const valueArr = label.replace(headers[id], '')
    return valueArr.trim().split(' ')
  })

  // Доповнюємо масив arrRows в правильному форматі: [colorName, colorNumber, RGB]
  for (let i = 0; i < arrColls[0].length; i++) {
    arrRows.push([
      arrColls[0][i],
      arrColls[1][i],
      arrColls[2][i],
    ])
  }

  return arrRows;
}