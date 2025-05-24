import React from "react";
import SectionHeading from "./SectionHeading";
import ServiceCard from "./ServiceCard";

const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 1,
      icon: "PieChart",
      title: "مشاوره",
      description: "متناسب با نیازهای فردی به طور کامل متعادل شده است.",
      color: "bg-primary200",
      hoverColor: "hover:bg-primary400",
      textColor: "text-primary-500",
      link: "/reservations",
    },
    {
      id: 2,
      icon: "LineChart",
      title: "حسابرسی",
      description: "متناسب با نیازهای فردی به طور کامل متعادل شده است.",
      color: "bg-primary200",
      hoverColor: "hover:bg-primary400",
      textColor: "text-primary-500",
      link: "#",
    },
    {
      id: 3,
      icon: "Users",
      title: "آموزش تخصصی",
      description: "متناسب با نیازهای فردی به طور کامل متعادل شده است.",
      color: "bg-primary200",
      hoverColor: "hover:bg-primary400",
      textColor: "text-primary-500",
      link: "#",
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 animate-fade-in">
        <SectionHeading
          title="خدمات"
          highlightedTitle="ما"
          highlightColor="bg-primary-100"
        />
        <p className="max-w-3xl mx-auto mt-6 text-neutral-700 leading-relaxed">
          ماموریت ما پیشبرد و بهبود زندگی مشتریان از طریق ارائه محصولات و خدمات
          برتر است که فراتر از انتظارات است.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          return (
            <div
              key={service.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                hoverColor={service.hoverColor}
                textColor={service.textColor}
                link={service.link}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ServicesSection;
