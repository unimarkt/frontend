import React from "react";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input ref={ref} {...props} />
));
 
export default Input; 