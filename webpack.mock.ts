// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from "body-parser";

type Item = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
};

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
  password: string;
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

const userList: Array<User> = [
  {
    login: "Vlad@mail.ru",
    photo:
      "https://sun9-35.userapi.com/impg/2cpBpAiji0xC6u75MErAeMtclGfNSOGoH2pnAQ/ASSS7I4JVCQ.jpg?size=1620x2160&quality=96&sign=dc7f92272dd6e93b590001203e0b8fbf&type=album",
    address: "Minsk",
    phoneNumber: "+375295555555",
    password: "123456",
  },
  {
    login: "Ilya@mail.ru",
    photo:
      "https://sun9-65.userapi.com/impf/c857732/v857732304/63454/UgwwpLEzlaE.jpg?size=2560x1707&quality=96&sign=c8c6b2d16cf0ee4804e69eed60e55047&type=album",
    address: "Minsk",
    phoneNumber: "+375295555555",
    password: "654321",
  },
  {
    login: "Danik@mail.ru",
    photo:
      "https://sun9-67.userapi.com/impf/c637521/v637521328/8fe7d/laYTsQgfqnM.jpg?size=1532x2160&quality=96&sign=c3576763eab7b668b91bb6c612745f45&type=album",
    address: "Minsk",
    phoneNumber: "+375295555555",
    password: "123321",
  },
  {
    login: "Cat@mail.ru",
    photo: "https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg",
    address: "Pinsk",
    phoneNumber: "+375295555555",
    password: "111111",
  },
];
export default webpackMockServer.add((app, helper) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  app.post("/auth/signIn", (_req, res) => {
    const { login, password } = _req.body;
    const loginUser = userList.find((item: User) => item.login === login);
    if (loginUser && loginUser.password === password) {
      res.json(loginUser);
    } else {
      res.status(400).json("Unvalid login or password");
    }
  });

  app.put("/auth/signUp", (_req, res) => {
    const { login, password } = _req.body;
    const loginUser = userList.find((item: User) => item.login === login);
    if (!loginUser) {
      userList.push({ login, password, photo: "", address: "", phoneNumber: "" });
      console.log(userList);
      res.json({ login, password, photo: "", address: "", phoneNumber: "" });
    } else {
      res.status(401).json("User already exists");
    }
  });

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
