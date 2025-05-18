import React from "react";

interface SocialButtonProps {
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  url: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  name,
  icon,
  colorClass,
  url,
}) => {
  return (
    <a
      href={url}
      className="group relative flex flex-col items-center transition-all duration-300 transform hover:-translate-y-1"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="w-24 h-24 flex items-center justify-center mb-3">
        <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
      </div>
      <span className="text-sm font-medium">{name}</span>
    </a>
  );
};

export default SocialButton;
