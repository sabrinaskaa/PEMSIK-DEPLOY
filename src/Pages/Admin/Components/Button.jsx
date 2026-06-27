const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  danger: "bg-red-500 hover:bg-red-600 text-white",
  secondary: "bg-gray-400 hover:bg-gray-500 text-white",
};

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`rounded transition ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
