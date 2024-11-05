import React, { useState } from "react";

import statciFeaturedImage from "../assets/images/auth-thumbnail.png";
import demo from "../assets/images/demo-pic.png";

import Card from "../components/shared/Card";
import { useNavigate } from "react-router-dom";

const mockData = [
  {
    id: 1,
    url: "#",
    featuredImage: statciFeaturedImage,
    name: "1 عنوان آگهی",
    description:
      "با دیدن این ویدیو شما امتیاز میگیرد و از این امتیاز میتونید استفاده کنید و بلیط سینما تهیه کنید",
    rate: 4,
  },
  {
    id: 2,
    url: "#",
    featuredImage: demo,
    name: "2 عنوان آگهی",
    description:
      "با دیدن این ویدیو شما امتیاز میگیرد و از این امتیاز میتونید استفاده کنید و بلیط سینما تهیه کنید",
    rate: 3,
  },
  {
    id: 3,
    url: "#",
    featuredImage: statciFeaturedImage,
    name: "3 عنوان آگهی",
    description:
      "با دیدن این ویدیو شما امتیاز میگیرد و از این امتیاز میتونید استفاده کنید و بلیط سینما تهیه کنید",
    rate: 1,
  },
  {
    id: 4,
    url: "#",
    featuredImage: demo,
    name: "4 عنوان آگهی",
    description:
      "با دیدن این ویدیو شما امتیاز میگیرد و از این امتیاز میتونید استفاده کنید و بلیط سینما تهیه کنید",
    rate: 2,
  },
  {
    id: 5,
    url: "#",
    featuredImage: statciFeaturedImage,
    name: "5 عنوان آگهی",
    description:
      "با دیدن این ویدیو شما امتیاز میگیرد و از این امتیاز میتونید استفاده کنید و بلیط سینما تهیه کنید",
    rate: 3,
  },
  {
    id: 6,
    url: "#",
    featuredImage: demo,
    name: "6 عنوان آگهی",
    description:
      "با دیدن این ویدیو شما امتیاز میگیرد و از این امتیاز میتونید استفاده کنید و بلیط سینما تهیه کنید",
    rate: 5,
  },
];

const Test = () => {
  const [selectedVideo, setSelectedVideo] = useState({});
  const navigate = useNavigate();

  console.log(selectedVideo);

  return (
    <section className="section-container py-8">
      <div className="grid grid-cols-4 gap-x-6 gap-y-12">
        {mockData.map((data) => (
          <Card
            key={data.id}
            title={data.name}
            img={data.featuredImage}
            featured={data.rate + " امتیاز"}
            cardClassName="hover:-translate-y-3 transition-all"
            actionButton={{
              onAction: () => {
                const selectedVideo2 = mockData.filter((f) => f.id === data.id);
                setSelectedVideo(selectedVideo2);
                navigate("/signletest", {
                  replace: true,
                  state: { selectedVideo2 },
                });
              },
              text: "مشاهده تبلیغ",
              className: "btn-primary",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Test;
