import { User } from "firebase/auth";
import { atom } from "recoil";

export const burgerMenuState = atom<boolean>({
  key: "burgerMenuState",
  default: false,
});

export const userHeightState = atom<number>({
  key: "userHeightState",
  default: 0,
});

export const pages: PageProps[] = [
  { name: "Overview", link: "/" },
  { name: "Portfolio", link: "/portfolio" },
  { name: "Watch List", link: "/watchlist" },
  { name: "Battle", link: "/battle" },
];

export interface PageProps {
  name: string;
  link: string;
}

export const pageState = atom<any>({
  key: "pageState",
  default: pages[0],
});

export const coinDataState = atom<MainCoinData[] | []>({
  key: "coinDataState",
  default: [],
});


export const favoriteCoin = atom<boolean>({
  key: "favoriteCoin",
  default: false,
});


export const userState = atom<any>({
  key: "userState",
  default: null,
});

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
});



