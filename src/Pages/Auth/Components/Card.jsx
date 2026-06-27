const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full max-w-md bg-white rounded-2xl shadow-lg p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
