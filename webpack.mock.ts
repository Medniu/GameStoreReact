// eslint-disable-next-line import/no-extraneous-dependencies
import webpackMockServer from "webpack-mock-server";
// eslint-disable-next-line import/no-extraneous-dependencies
import express from "express";
// eslint-disable-next-line import/no-extraneous-dependencies
import bodyParser from "body-parser";
import { Item } from "@/types";

type User = {
  photo: string;
  login: string;
  address: string;
  phoneNumber: string;
  password: string;
  role: string;
};

const data: Array<Item> = [
  {
    id: 0,
    name: "Forza 5",
    price: 70,
    description: "someText",
    category: "PS",
    rating: 4.6,
    image: "https://upload.wikimedia.org/wikipedia/ru/b/b5/Forza_Motorsport_5_coverart.jpg",
    genre: "Racing",
    age: "12",
  },
  {
    id: 1,
    name: "Fifa 21",
    price: 120,
    description: "someText",
    category: "PS",
    rating: 4.4,
    image: "https://www.belconsole.by/pics/items/fifa21_ps42dpftfront_ru.jpg",
    genre: "Sport",
    age: "6",
  },
  {
    id: 2,
    name: "Pes 21",
    price: 85,
    description: "someText",
    category: "PC",
    rating: 3.5,
    image: "https://torrentigruha.net/uploads/posts/2020-09/1599991149_56fg.jpg",
    genre: "Sport",
    age: "6",
  },
  {
    id: 3,
    name: "Call of Duty 4",
    price: 75,
    description: "someText",
    category: "Xbox",
    rating: 4.8,
    image:
      "https://www.callofduty.com/content/dam/atvi/callofduty/legacy/modern-warfare-remastered/Standalone_Packshots_2D_PS4.jpg",
    genre: "Shooter",
    age: "18",
  },
  {
    id: 4,
    name: "Battlefield",
    price: 40,
    description: "someText",
    category: "Xbox",
    rating: 4.3,
    image: "https://image.api.playstation.com/cdn/EP0006/CUSA08670_00/l2B6pYvxHDYUjuhT0vTHcidJA2MpjWR4.png",
    genre: "Shooter",
    age: "18",
  },
  {
    id: 5,
    name: "Need for Speed",
    price: 65,
    description: "someText",
    category: "PC",
    rating: 5.0,
    image: "http://squarefaction.ru/files/game/16560/cover/need-for-speed-most-wanted-5-1_435c1034.jpg",
    genre: "Racing",
    age: "6",
  },
  {
    id: 6,
    name: "Warcraft 3",
    price: 30,
    description: "someText",
    category: "PC",
    rating: 5.0,
    image:
      "https://i09.kanobu.ru/c/407fda4859e10fe89a6950262b4f93d5/200x284/u.kanobu.ru/games/92/ccf81a89d0914102b1485605a814e119",
    genre: "Strategy",
    age: "12",
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
    role: "user",
  },
  {
    login: "Ilya@mail.ru",
    photo:
      "https://sun9-65.userapi.com/impf/c857732/v857732304/63454/UgwwpLEzlaE.jpg?size=2560x1707&quality=96&sign=c8c6b2d16cf0ee4804e69eed60e55047&type=album",
    address: "Minsk",
    phoneNumber: "+375295555555",
    password: "654321",
    role: "user",
  },
  {
    login: "Danik@mail.ru",
    photo:
      "https://sun9-67.userapi.com/impf/c637521/v637521328/8fe7d/laYTsQgfqnM.jpg?size=1532x2160&quality=96&sign=c3576763eab7b668b91bb6c612745f45&type=album",
    address: "Minsk",
    phoneNumber: "+375295555555",
    password: "123321",
    role: "user",
  },
  {
    login: "Cat@mail.ru",
    photo: "https://storage.theoryandpractice.ru/tnp/uploads/image_unit/000/156/586/image/base_87716f252d.jpg",
    address: "Pinsk",
    phoneNumber: "+375295555555",
    password: "111111",
    role: "admin",
  },
];

const criteriaType = {
  price: "price",
  rating: "rating",
};

const filterByAgeAndGenre = (age: string, genre: string, gameList: Array<Item>) => {
  let response: Array<Item> = gameList;
  if (genre.toUpperCase() !== "ALL") {
    response = response.filter((item: Item) => item.genre.toUpperCase().includes(genre.toUpperCase()));
  }
  if (age.toUpperCase() !== "ALL") {
    response = response.filter((item: Item) => Number(item.age) <= Number(age));
  }
  return response;
};

const sortByPriceOrRating = (criteria: string, type: string, gameList: Array<Item>) => {
  let response: Array<Item> = gameList;

  if (type.toUpperCase() === "DESC") {
    response = response.sort(
      (a, b) =>
        b[criteria.toLowerCase() as keyof typeof criteriaType] - a[criteria.toLowerCase() as keyof typeof criteriaType]
    );
  } else {
    response = response.sort(
      (a, b) =>
        a[criteria.toLowerCase() as keyof typeof criteriaType] - b[criteria.toLowerCase() as keyof typeof criteriaType]
    );
  }
  return response;
};

export default webpackMockServer.add((app, helper) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.json());

  app.post("/api/saveProfile", (_req, res) => {
    const { login, address, phoneNumber } = _req.body;
    const loginUser = userList.find((item: User) => item.login === login);
    if (loginUser) {
      loginUser.address = address;
      loginUser.phoneNumber = phoneNumber;
      res.json(loginUser);
    } else {
      res.status(400).json("Unvalid login or password");
    }
  });

  app.post("/api/changePassword", (_req, res) => {
    const { login, newPassword, oldPassword } = _req.body;
    const loginUser = userList.find((item: User) => item.login === login);
    if (loginUser && loginUser.password === oldPassword) {
      loginUser.password = newPassword;
      res.json(true);
    } else {
      res.status(400).json(false);
    }
  });

  app.post("/auth/signIn", (_req, res) => {
    const { login, password } = _req.body;
    const loginUser = userList.find((item: User) => item.login === login);
    if (loginUser && loginUser.password === password) {
      res.json(loginUser);
    } else {
      res.status(400).json("Unvalid login or password");
    }
  });
  app.post("/api/product", (_req, res) => {
    const { name, category, genre, age, price, image } = _req.body;
    const newItem: Item = { id: data.length, name, category, genre, age, price, image, rating: 0, description: "" };
    data.push(newItem);
    res.json(newItem.id);
  });

  app.put("/api/product", (_req, res) => {
    console.log(data);
    const changedItem = data.find((item: Item) => item.id === _req.body.id);
    if (changedItem) {
      Object.assign(changedItem, { ..._req.body, price: +_req.body.price });
      res.json(_req.body.id);
    } else {
      res.status(401).json(null);
    }
  });

  app.put("/auth/signUp", (_req, res) => {
    const { login, password } = _req.body;
    const loginUser = userList.find((item: User) => item.login === login);
    if (!loginUser) {
      const newUser: User = {
        login,
        password,
        photo:
          "https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51402215-stock-illustration-male-avatar-profile-picture-use.jpg",
        address: "",
        phoneNumber: "",
        role: "user",
      };
      res.json(newUser);
    } else {
      res.status(401).json(null);
    }
  });

  app.get("/api/getTopProducts", (_req, res) => {
    const response = data.sort((a, b) => (a.rating < b.rating ? 1 : -1)).slice(0, 3);
    res.json(response);
  });

  app.delete(`/api/product`, (_req, res) => {
    let response;
    if (_req.query && typeof _req.query.id === "string") {
      const { id } = _req.query;
      const indexOfDeletedItem = data.findIndex((item: Item) => item.id === +id);
      data.splice(indexOfDeletedItem, 1);
    }
    console.log(data);
    return res.json(response);
  });

  app.get(`/api/getGames`, (_req, res) => {
    let response;
    if (
      _req.query &&
      typeof _req.query.text === "string" &&
      typeof _req.query.category === "string" &&
      typeof _req.query.criteria === "string" &&
      typeof _req.query.type === "string" &&
      typeof _req.query.genre === "string" &&
      typeof _req.query.age === "string"
    ) {
      const { text, category, criteria, type, genre, age } = _req.query;
      console.log({ text, category, criteria, type, genre, age });

      if ((!text && !category) || category === "ALL") {
        response = data.filter((item: Item) => item.name.toUpperCase().includes(text.toUpperCase()));

        response = filterByAgeAndGenre(age, genre, response);
        response = sortByPriceOrRating(criteria, type, response);
      } else {
        response = data.filter(
          (item: Item) =>
            item.name.toUpperCase().includes(text.toUpperCase()) &&
            item.category.toUpperCase().includes(category.toUpperCase())
        );
        response = filterByAgeAndGenre(age, genre, response);
        response = sortByPriceOrRating(criteria, type, response);
      }
    }
    return res.json(response);
  });
});
