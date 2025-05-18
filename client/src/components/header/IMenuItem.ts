export interface IMenuItem {
  id: number;
  text: string;
  link: string;
  mobileOnly?: boolean;
}

export const navMenuItems: IMenuItem[] = [
  {
    id: 1,
    text: "خانه",
    link: "/",
  },
  {
    id: 2,
    text: "مشاوره",
    link: "/reservations",
  },
  // {
  //   id: 3,
  //   text: "خدمات ",
  //   link: "/services",
  // },
  {
    id: 5,
    text: "آموزش رایگان",
    link: "/search",
  },
  {
    id: 6,
    text: "حضور در رسانه",
    link: "/media",
  },
  {
    id: 6,
    text: "درباره من",
    link: "/about-me",
  },
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
    text: "مدیریت آموزش رایگان",
    link: "/dashboard?tab=posts",
  },
];
