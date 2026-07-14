"use client";

import { Navbar, Button } from "@/components";
import { usePathname } from "next/navigation";
import logoImage from "@/public/images/assets/logo.webp";
import Link from "next/link";
import { PhoneIcon } from "@phosphor-icons/react/dist/icons/Phone";

const NAV_ITEMS = [
  { href: "/", label: "Úvod" },
  { href: "/o-nas", label: "Ubytování" },
  { href: "/blog", label: "Rezervace" },
  { href: "/e-shop", label: "Kontakt" },
  { href: "/sluzby", label: "Akce & Blog" },
  { href: "/otazky", label: "Otázky" }
] as const;
const NavbarClient = () => {
  //Hooks
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? "text-center tablet:text-left text-red uppercase font-medium text-body block w-full px-6 py-3 sdesktop:inline-block sdesktop:w-auto sdesktop:py-5 sdesktop:px-3"
      : "text-center tablet:text-left text-dark uppercase font-medium text-body block w-full px-6 py-3 sdesktop:inline-block sdesktop:w-auto sdesktop:py-5 sdesktop:px-3";
  return (
    <>
      <Navbar
        logo={logoImage}
        button="Rezervovat"
        className="mt-5 bg-white slaptop:mt-8 absolute z-50 right-0 left-[50%] translate-x-[-50%] flex items-center justify-between px-6 py-1 w-container rounded-[15px] shadow-primary"
        href="/sluzby"
      >
        {NAV_ITEMS.map((item, index) => (
          <li key={item.href} className={index === 0 ? "laptop:ml-8 laptop:m-0" : "laptop:m-0"}>
            <Link
              href={item.href}
              aria-label={item.label}
              className={`${linkClass(item.href)} font-normal hover:text-green active:text-green transition-all duration-250`}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li className="tablet:hidden mt-5 -mb-2">
            <Link
                href="tel:+420602726090"
                aria-label="Telefonní číslo"
                className="text-center tablet:text-left text-green font-medium w-full px-6 py-3 hover:text-red active:text-red transition-all duration-250 flex gap-2 items-center justify-center"
            >
                <PhoneIcon size={20}/>
                +420 602 726 090
          </Link>
        </li>
        <li className="tablet:hidden px-6 py-3 flex justify-center tablet:justify-start">
          <Button
              href="/rezerevovat"
              variant="danger"
              isShadow={false}
              ariaLabel="Rezervovat"
              wFull={true}
              >
              Rezervovat
          </Button>
        </li>
      </Navbar>
    </>
  );
};
export default NavbarClient;