import React from "react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  color: string;
  hoverColor: string;
  textColor: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  color,
  hoverColor,
  textColor,
  link,
}) => {
  return (
    <a href={link} className="block h-full">
      <div
        className={`card h-full bg-white p-8 rounded-3xl shadow-sm transition-all duration-300 border border-primary200 ${hoverColor} group hover:shadow-md`}
      >
        <div className="flex flex-col h-full">
          <div
            className={`${color} w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}
          >
            <img src={icon} className="w-8 h-8" alt={title} />
          </div>

          <h3 className="text-2xl font-semibold mb-3 text-neutral-800 transition-colors duration-300 group-hover:text-neutral-900">
            {title}
          </h3>

          <p className="text-neutral-600 mb-8 leading-relaxed flex-grow">
            {description}
          </p>

          <div className="mt-auto">
            <div
              className={`flex items-center ${textColor} font-medium transition-all duration-300 group-hover:opacity-80`}
            >
              بیشتر بخوانید
              <svg
                className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ServiceCard;
