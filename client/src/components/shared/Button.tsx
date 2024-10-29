import { Link } from "react-router-dom";

export interface ButtonProps {
  link?: string;
  text?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: string;
}

const Button = ({
  link = "#",
  text,
  onAction,
  className,
  type = "button",
  disabled,
  icon,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onAction}
      className={`btn + ${className}`}
      disabled={disabled}
    >
      <Link to={link}>
        {text && text}
        {icon && <i className={`maicon-${icon}`}></i>}
      </Link>
    </button>
  );
};

export default Button;
