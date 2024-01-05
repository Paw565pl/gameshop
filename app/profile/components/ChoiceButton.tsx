"use client";

import { ReactNode } from "react";

interface ChoiceButtonProps {
  title: string;
  icon: ReactNode;
  handleClick: () => void;
}

const ChoiceButton = ({ title, icon, handleClick }: ChoiceButtonProps) => {
  return (
    <button
      className="btn btn-outline btn-lg btn-block rounded-none border-none text-lg font-medium"
      onClick={handleClick}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default ChoiceButton;
