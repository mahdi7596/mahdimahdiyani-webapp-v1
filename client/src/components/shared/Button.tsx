import { Link } from "react-router-dom";

interface Props {
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
}: Props) => {
  return (
    <Link to={link}>
      <button
        type={type}
        onClick={onAction}
        className={`btn + ${className}`}
        disabled={disabled}
      >
        {text && text}
        {icon && <i className={`maicon-${icon}`}></i>}
      </button>
    </Link>
  );
};

export default Button;
