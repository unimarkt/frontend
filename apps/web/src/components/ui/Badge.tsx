import React from "react";

const Badge: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (props) => (
  <span {...props}>{props.children}</span>
);

export default Badge; 