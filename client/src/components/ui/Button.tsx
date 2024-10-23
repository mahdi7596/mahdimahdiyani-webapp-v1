interface Props {
  text?: string;
  className?: string;
  onAction?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  icon?: string;
  iconClassName?: string;
}

const Button = ({ text, className, onAction, disabled, icon }: Props) => {
  return (
    <button
      className={`btn + ${className}`}
      onClick={onAction}
      disabled={disabled}
    >
      {text && text}
      {icon && <i className={`maicon-${icon}`}></i>}
    </button>
  );
};

export default Button;
