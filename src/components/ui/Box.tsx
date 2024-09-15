import { useState } from "react";
interface Props {
  children: React.ReactNode;
}

const Box = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="box">
      <button
        type="button"
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Box;
