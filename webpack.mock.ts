// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";

type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
};
const data: Array<Item> = [
  {
    id: 1,
    name: "Forza 5",
    price: 70,
    description: "someText",
    category: "PS",
    rating: 4.6,
    image: "https://upload.wikimedia.org/wikipedia/ru/b/b5/Forza_Motorsport_5_coverart.jpg",
  },
  {
    id: 2,
    name: "Fifa 21",
    price: 70,
    description: "someText",
    category: "PS",
    rating: 4.4,
    image: "https://www.belconsole.by/pics/items/fifa21_ps42dpftfront_ru.jpg",
  },
  {
    id: 3,
    name: "Pes 21",
    price: 70,
    description: "someText",
    category: "PC",
    rating: 3.5,
    image: "https://torrentigruha.net/uploads/posts/2020-09/1599991149_56fg.jpg",
  },
  {
    id: 4,
    name: "Call of Duty 4",
    price: 70,
    description: "someText",
    category: "Xbox",
    rating: 4.8,
    image:
      "https://www.callofduty.com/content/dam/atvi/callofduty/legacy/modern-warfare-remastered/Standalone_Packshots_2D_PS4.jpg",
  },
  {
    id: 5,
    name: "Battlefield",
    price: 70,
    description: "someText",
    category: "Xbox",
    rating: 4.3,
    image: "https://image.api.playstation.com/cdn/EP0006/CUSA08670_00/l2B6pYvxHDYUjuhT0vTHcidJA2MpjWR4.png",
  },
  {
    id: 6,
    name: "Need for Speed",
    price: 70,
    description: "someText",
    category: "PC",
    rating: 5.0,
    image: "http://squarefaction.ru/files/game/16560/cover/need-for-speed-most-wanted-5-1_435c1034.jpg",
  },
  {
    id: 7,
    name: "Warcraft 3",
    price: 70,
    description: "someText",
    category: "PC",
    rating: 5.0,
    image:
      "https://i09.kanobu.ru/c/407fda4859e10fe89a6950262b4f93d5/200x284/u.kanobu.ru/games/92/ccf81a89d0914102b1485605a814e119",
  },
];

export default webpackMockServer.add((app, helper) => {
  app.get("/api/getTopProducts", (_req, res) => {
    const response = data.sort((a, b) => (a.rating < b.rating ? 1 : -1)).slice(0, 3);
    res.json(response);
  });

  app.get(`/api/getGames`, (_req, res) => {
    console.log(_req);
    let response;
    if (_req.query && typeof _req.query.text === "string" && typeof _req.query.category === "string") {
      const { text, category } = _req.query;

      console.log(text);
      console.log(category);
      if ((!text && !category) || category === "ALL") {
        response = data.filter((item: Item) => item.name.toUpperCase().includes(text.toUpperCase()));
      } else {
        response = data.filter(
          (item: Item) =>
            item.name.toUpperCase().includes(text.toUpperCase()) &&
            item.category.toUpperCase().includes(category.toUpperCase())
        );
      }
    }
    return res.json(response);
  });
});
