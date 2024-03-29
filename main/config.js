const titles = [
  'clicker@Игра Clicker',
  'snake@Игра Змейка',
  'tanks@Игра Танчики',
  'memory@Игра Memory',
  'dragon-shooter@Dragon Shooter',
];

function getData(list) {
  const data = list.map((item, index) => {
    const [link, title] = item.split('@');
    const url = `./${link}/index.html`;
    const img = `./main/img/${link}.png`;

    return {id: index, url, img, title};
  });

  return data;
}

const model = getData(titles);

// const modelExample = [
//   {
//     id: 1,
//     title: 'Ипотечный калькулятор',
//     url: './mortgage/index.html',
//     img: './main/img/mortgage.png',
//   },
// ]
