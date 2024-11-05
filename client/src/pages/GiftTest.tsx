import { useLocation } from "react-router-dom";

import metro from "../assets/metro.svg.png";
import brt from "../assets/brt.jpeg";
import snapfood from "../assets/snapfood.png";
import snap from "../assets/snap.png";
import Card from "../components/shared/Card";

const mockData = [
  {
    id: 1,
    featuredImage: metro,
    name: "50 هزارتومان شارژ بلیط مترو",
  },
  {
    id: 2,
    featuredImage: brt,
    name: "10 هزارتومان شارژ بلیط بی آر تی",
  },
  {
    id: 3,
    featuredImage: snapfood,
    name: "10% تخفیف بر روی سفارش آبمیوه و بستنی از اسنپ فود به شرطی که سفارش بالا 200 هزارتومان داشته باشی",
  },
  {
    id: 4,
    featuredImage: snap,
    name: "25% تخفیف روی اسنپ",
  },
];

const GiftTest = () => {
  const location = useLocation();

  console.log(location);

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content">
        <div className="w-1/2 flex flex-col gap-y-3">
          <h1 className=" text-5xl font-bold ">
            مهدی عزیز به مرحله ی کسب جایزه خوش اومدی
          </h1>
          <p className="text-lg">
            خوشحالیم از اینکه با ما همراه بودی و به ما اعتماد کردی و الان نوبت
            ماست که ازت تشکر کنیم بابت وقتی که گذاشتی
          </p>
          <p className="text-lg">
            تو در حال حاضر الان
            <span className="font-extrabold text-3xl">
              {location.state.reserved.rate}
            </span>
            امتیاز داری و میتونی از بین ۵ گزینه یک انتخاب داشته باشی،اگر بخوای
            میتونی به تبلغ دیدنت ادامه بدی و اینجوری جایزه های بیشتری خواهی گرفت
          </p>
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-6">
          {mockData.map((data) => (
            <Card
              key={data.id}
              title={data.name}
              img={data.featuredImage}
              cardClassName="hover:-translate-y-3 transition-all"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftTest;
