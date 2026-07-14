"use client";

import Link from "next/link";
import Image from "next/image";
import { type FC, type ReactNode, useState, useEffect, useRef } from "react";
import { Button, Hamburger } from "@/components";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { PhoneIcon } from "@phosphor-icons/react/dist/icons/Phone";

type NavbarProps = {
  logo: string | StaticImport;
  button: string;
  className?: string;
  href: string;
  children: ReactNode;
};
const Navbar: FC<NavbarProps> = ({ logo, button, className, href, children }) => {
  //Hooks
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLaptop, setIsLaptop] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const classes: string = className ? className : "";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1401px)");
    const updateIsLaptop = () => {
      setIsLaptop(mediaQuery.matches);
    };
    updateIsLaptop();
    mediaQuery.addEventListener("change", updateIsLaptop);
    return () => {
      mediaQuery.removeEventListener("change", updateIsLaptop);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = isMenuOpen ? "hidden" : original;
    return () => {
      document.body.style.overflow = original;
    };
  }, [isMenuOpen]);
  return (
    <>
      <nav className={classes} ref={navRef}>
        <Link href="/" className="w-19 h-15 z-50" onClick={() => setIsMenuOpen(false)}>
          <Image className="img-responsive" src={logo} alt="Alexandra Abertamy - logo" width={172} height={95} unoptimized loading="eager"/>
        </Link>
        <ul
          onClick={() => setIsMenuOpen(false)}
          className={`grid bg-white sdesktop:flex sdesktop:items-center absolute sdesktop:static top-[calc(100%+1rem)] left-0 w-full py-2 sdesktop:p-0 shadow-primary sdesktop:shadow-none rounded-[0.625rem] sdesktop:rounded-none sdesktop:w-auto sdesktop:justify-center transition-all duration-550 ease-in-out sdesktop:opacity-100 sdesktop:pointer-events-auto ${
            isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none sdesktop:translate-x-0 sdesktop:pointer-events-auto"
          }`}
        >
          {children}
        </ul>
        <div className="flex items-center justify-end grow tablet:grow-0 tablet:gap-2">
            <div className="flex items-center gap-4 sdesktop:gap-6 justify-center absolute z-[500] -left-[1000%] tablet:static">
                <Link
                    href="tel:+420602726090"
                    aria-label="Telefonní číslo"
                    className="text-green font-medium hover:text-red active:text-red transition-all duration-250 flex gap-2 items-center"
                >
                    <PhoneIcon size={20}/>
                    +420 602 726 090
                </Link>
                <Button
                    href={href}
                    variant={isLaptop ? "primary" : "danger"}
                    isShadow={false}
                    ariaLabel={button}
                    >
                    {button}
                </Button>
            </div>
            <Hamburger
                className="p-5 px-3 tablet:px-5 pr-0 sdesktop:absolute"
                isOpen={isMenuOpen}
                onToggle={() => {
                setTimeout(() => setIsMenuOpen((prev) => !prev), 100);
                }}
            />
        </div>
      </nav>
    </>
  );
};
export default Navbar;