import { type FC } from "react";

type HamburgerProps = {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  className?: string;
};
const Hamburger: FC<HamburgerProps> = ({ isOpen, onToggle, className }) => {
  return (
    <button
      aria-label="Otevřít navigaci"
      onClick={() => {
        onToggle(!isOpen);
      }}
      className={`flex items-center justify-center cursor-pointer sdesktop:hidden ${className}`}
    >
      <div className="relative block w-6 h-6 overflow-hidden">
        <span
          className={`absolute h-[1.5px] bg-dark rounded-2xl left-0 right-0 transition-all ease-in-out ${isOpen ? "top-[50%] translate-y-[-50%]" : "top-0"}`}
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: isOpen ? "top 150ms ease-in-out, transform 150ms ease-in-out 250ms" : "top 150ms ease-in-out 250ms, transform 150ms ease-in-out",
          }}
        ></span>
        <span className={`absolute h-[1.5px] bg-dark rounded-2xl left-0 top-[50%] translate-y-[-50%] right-0 transition-all ease-in-out delay-150 ${isOpen ? "opacity-0" : "opacity-100"}`}></span>
        <span
          className={`absolute h-[1.5px] bg-dark rounded-2xl left-0 right-0 transition-all ease-in-out ${isOpen ? "bottom-[50%]" : "bottom-0"}`}
          style={{
            transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
            transition: isOpen ? "bottom 150ms ease-in-out, transform 150ms ease-in-out 250ms" : "bottom 150ms ease-in-out 250ms, transform 150ms ease-in-out",
          }}
        ></span>
      </div>
    </button>
  );
};
export default Hamburger;