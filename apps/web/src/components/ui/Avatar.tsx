import React from "react";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
}

const Avatar: React.FC<AvatarProps> = ({ size = "md", ...props }) => (
  <img {...props} style={{ width: size === "sm" ? 32 : size === "lg" ? 64 : 40, height: size === "sm" ? 32 : size === "lg" ? 64 : 40, borderRadius: "50%", objectFit: "cover", ...props.style }} />
);

export default Avatar; 