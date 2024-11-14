export interface IMenuItem {
  id: number;
  text: string;
  link: string;
}

export const navMenuItems: IMenuItem[] = [
  {
    id: 1,
    text: "صفحه اصلی",
    link: "/",
  },
  {
    id: 2,
    text: "خدمات ما",
    link: "#services",
  },
  {
    id: 3,
    text: "محصولات ما",
    link: "#projects",
  },
  {
    id: 5,
    text: "درباره ما",
    link: "#aboutus",
  },
  {
    id: 6,
    text: "همکاری باما",
    link: "/work-with-us",
  },
  // todo #1 i have to assign a different class for this menu item and implement a functionality where it shows it only in mobile view port
  // {
  //   id: 7,
  //   text: "ورود - ثبت نام",
  //   link: "/register",
  // },
];

export const profileMenuItems: IMenuItem[] = [
  {
    id: 1,
    text: "پروفایل کاربری",
    link: "/dashboard?tab=profile",
  },
  {
    id: 2,
    text: "اضافه کردن پست",
    link: "/",
  },
];
