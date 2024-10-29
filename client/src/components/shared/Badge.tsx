import { Link } from "react-router-dom";

export interface BadgeProps {
  link?: string;
  text: string;
  className?: string;
}

const Badge = ({ link = "#", text, className }: BadgeProps) => {
  return (
    <Link to={link}>
      <span className={`badge + ${className}`}>{text}</span>
    </Link>
  );
};

export default Badge;
