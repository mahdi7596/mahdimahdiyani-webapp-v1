import React from "react";

interface SectionHeadingProps {
  title: string;
  highlightedTitle: string;
  highlightColor: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  highlightedTitle,
  highlightColor,
}) => {
  return (
    <h2 className="text-4xl md:text-5xl font-bold inline-flex flex-wrap justify-center">
      <span className="mr-4">{title}</span>
      <span
        className={`relative inline-block ${highlightColor} px-4 py-1 rounded-lg`}
      >
        {highlightedTitle}
      </span>
    </h2>
  );
};

export default SectionHeading;
