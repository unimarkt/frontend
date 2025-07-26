import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: "sm" | "md" | "lg";
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  shadow = "md",
  ...rest 
}) => {
  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-lg", 
    lg: "shadow-xl"
  };

  return (
    <div
      className={`bg-white rounded-[20px] ${shadowClasses[shadow]} p-[32px] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default React.memo(Card); 