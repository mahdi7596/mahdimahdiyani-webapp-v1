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
  state?: any;
}

const Button = ({
  text,
  title,
  onAction,
  type = "button",
  icon,
  loading,
  className = "",
  disabled = false,
  link,
  state,
}: ButtonProps) => {
  const buttonContent = (
    <>
      {text && text}
      {icon && <i className={`maicon-${icon}`}></i>}
      {loading && !disabled && (
        <span className="loading loading-spinner text-black mr-3"></span>
      )}
    </>
  );

  if (link) {
    return (
      <Link
        to={link}
        state={state} // Forward the state
        className={`btn flex items-center ${className}`}
        title={title}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onAction}
      title={title}
      className={`btn flex items-center ${className}`}
      disabled={disabled}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
