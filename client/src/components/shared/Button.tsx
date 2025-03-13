import { Link } from "react-router-dom";

export interface ButtonProps {
  link?: string;
  text?: string;
  title?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
}

const Button = ({
  link = "#",
  text,
  title,
  onAction,
  className,
  type = "button",
  disabled,
  icon,
  loading,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onAction}
      title={title}
      className={`btn  items-center+ ${className} `}
      disabled={disabled}
    >
      <Link to={link} className="flex items-center">
        {text && text}
        {icon && <i className={`maicon-${icon}`}></i>}
        {loading && !disabled && (
          <span className="loading loading-spinner text-black mr-3"></span>
        )}
      </Link>
    </button>
  );
};

export default Button;
