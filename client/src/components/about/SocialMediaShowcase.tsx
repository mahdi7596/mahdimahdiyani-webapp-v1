import React from "react";
import SocialButton from "./SocialButton";
import linkedin from "../../assets/images/social-icons/linkedin.png";
import instagram from "../../assets/images/social-icons/instagram.png";
import youtube from "../../assets/images/social-icons/youtube.png";
import x from "../../assets/images/social-icons/x.png";
import telegram from "../../assets/images/social-icons/telegram.png";

const SocialMediaShowcase: React.FC = () => {
  const socialPlatforms = [
    {
      name: "لینکدین",
      icon: <img src={linkedin} alt="LinkedIn" className="w-14 h-14" />,
      color: "text-[#0077B5]",
      url: "#",
    },
    {
      name: "اینستاگرام",
      icon: <img src={instagram} alt="Instagram" className="w-14 h-14" />,
      color: "text-[#E1306C]",
      url: "#",
    },
    {
      name: "یوتیوب",
      icon: <img src={youtube} alt="YouTube" className="w-14 h-14" />,
      color: "text-[#FF0000]",
      url: "#",
    },
    {
      name: "توییتر",
      icon: <img src={x} alt="X (Twitter)" className="w-14 h-14" />,
      color: "text-[#1DA1F2]",
      url: "#",
    },
    {
      name: "تلگرام",
      icon: <img src={telegram} alt="Telegram" className="w-14 h-14" />,
      color: "text-[#0088cc]",
      url: "#",
    },
  ];

  return (
    <div className="my-24  card container mx-auto  bg-gradient-to-br from-primary100 via-primary200/10 to-primary100    overflow-hidden border border-primary200">
      <div className="card-body relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary600/5 to-primary100/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary300/5 to-primary900/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

        <div className="relative">
          <h2 className="card-title text-3xl font-bold text-right mb-6 bg-clip-text text-neutrals500">
            با من در ارتباط باشید
          </h2>

          <p className="text-right text-lg font-medium leading-relaxed mb-12 text-neutral/80">
            برای دنبال کردن تازه‌ترین مطالب، رویدادها و دیدگاه‌های من در حوزه
            مدیریت مالی و حسابداری، من را در شبکه‌های اجتماعی همراهی کنید.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl -m-4 blur-xl"></div>
            {socialPlatforms.map((platform) => (
              <SocialButton
                key={platform.name}
                name={platform.name}
                icon={platform.icon}
                colorClass={platform.color}
                url={platform.url}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaShowcase;
