export interface IMenuItem {
  id: number;
  text: string;
  link: string;
  mobileOnly?: boolean;
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
    text: "مقالات",
    link: "/search",
  },
  {
    id: 5,
    text: "درباره من",
    link: "/about-me",
  },
  // {
  //   id: 6,
  //   text: "همکاری باما",
  //   link: "/work-with-us",
  // },
  // todo #1 i have to assign a different class for this menu item and implement a functionality where it shows it only in mobile view port
  {
    id: 7,
    text: "ورود - ثبت نام",
    link: "/register",
    mobileOnly: true, // Add a flag for mobile-only items
  },
];

export const profileMenuItems: IMenuItem[] = [
  {
    id: 1,
    text: "پروفایل کاربری",
    link: "/dashboard?tab=profile",
  },
  {
    id: 2,
    text: "مدیریت مقالات",
    link: "/dashboard?tab=posts",
  },
];
