const Button = ({ children, type = "button", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`w-full py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none text-white rounded-lg transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
