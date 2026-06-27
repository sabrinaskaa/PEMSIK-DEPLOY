const Input = ({
  type = "text",
  name,
  id,
  required = false,
  placeholder = "",
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      name={name}
      id={id}
      required={required}
      placeholder={placeholder}
      className={`mt-1 w-full px-4 py-2 border border-color rounded-lg focus:outline-none focus:ring focus:ring-blue-300 sm:text-sm ${className}`}
      {...props}
    />
  );
};

export default Input;
