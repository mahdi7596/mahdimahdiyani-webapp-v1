import { Link } from "react-router-dom";

interface Props {
  link?: string;
  text?: string;
  className?: string;
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: string;
}

const Button = ({
  link = "#",
  text,
  className,
  onAction,
  disabled,
  icon,
}: Props) => {
  return (
    <Link to={link}>
      <button
        className={`btn + ${className}`}
        onClick={onAction}
        disabled={disabled}
      >
        {text && text}
        {icon && <i className={`maicon-${icon}`}></i>}
      </button>
    </Link>
  );
};

export default Button;
