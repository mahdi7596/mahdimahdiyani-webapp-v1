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
    text: "آموزشهای رایگان",
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
  {
    id: 7,
    text: "ورود - ثبت نام",
    link: "/login",
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
    text: "مدیریت آموزشهای رایگان",
    link: "/dashboard?tab=posts",
  },
];
