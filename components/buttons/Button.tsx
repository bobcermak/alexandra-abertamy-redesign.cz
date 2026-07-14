"use client";

import Link from "next/link";
import type { FC, MouseEvent, ReactNode } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "danger" | "light";
type ButtonSharedProps = {
  variant?: ButtonVariant,
  isArrow?: boolean,
  isShadow?: boolean,
  ariaLabel: string,
  className?: string,
  wFull?: boolean,
  disabled?: boolean,
  children: ReactNode
};
type LinkButtonProps = ButtonSharedProps & {
  href: string,
  type?: never,
  onClick?: never
};
type NativeButtonProps = ButtonSharedProps & {
  href?: never,
  type: "submit" | "reset" | "button",
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
};
type ButtonProps = LinkButtonProps | NativeButtonProps;
const EXTERNAL_HREF_PATTERN = /^https?:\/\//i;
const Button: FC<ButtonProps> = (props) => {
    const { variant = "primary", isArrow = true, isShadow = true, ariaLabel, className, wFull = false, disabled = false, children } = props;
    const showArrow = variant === "primary" && isArrow;
    const isJoiningArrow = showArrow && !disabled;
    const defaultStyles = `font-medium lowercase text-base m-0 px-8 py-3 text-center flex flex-col rounded-[32px] transform-gpu transition-[background-color,color,border-color,border-radius] duration-250 ease-in-out ${disabled ? "opacity-40" : ""} ${isJoiningArrow ? "group-hover:rounded-r-none group-active:rounded-r-none" : ""}`;
    const variantStyles: Record<ButtonVariant, string> = {
        primary: "bg-red text-white",
        secondary: "text-green border border-green hover:bg-green hover:text-white active:bg-green active:text-white",
        tertiary: "bg-white text-red hover:bg-red hover:text-white active:bg-red active:text-white",
        danger: "text-red border border-red hover:bg-red hover:text-white active:bg-red active:text-white",
        light: "bg-transparent text-white border border-white/70 hover:bg-white/10 active:bg-white/10"
    };
    const dropShadowStyles: Record<ButtonVariant, string> = {
        primary: "drop-shadow-button--red",
        secondary: "drop-shadow-button--green",
        tertiary: "drop-shadow-button--black",
        danger: "drop-shadow-button--red",
        light: ""
    };
    const wrapperStyles = twMerge(
        "group inline-flex items-center",
        wFull ? "w-full" : "w-fit",
        isShadow ? dropShadowStyles[variant] : "",
        disabled ? "pointer-events-none cursor-not-allowed" : "",
        className
    );
    const content = (
        <span className={`flex items-center gap-2 ${wFull ? "w-full" : ""}`}>
            <span className={`${defaultStyles} ${variantStyles[variant]} ${wFull ? "flex-1" : ""}`}>
                {children}
            </span>
            {showArrow && (
                <span className={`bg-red rounded-full size-12 flex items-center justify-center shrink-0 transform-gpu transition-[opacity,translate,border-radius] duration-250 ease-in-out ${disabled ? "opacity-40" : "group-hover:-translate-x-2 group-active:-translate-x-2 group-hover:rounded-l-none group-active:rounded-l-none"}`}>
                    <ArrowUpRightIcon
                        size={18}
                        weight="bold"
                        className="text-white transition-[rotate] duration-250 ease-in-out group-hover:rotate-90 group-active:rotate-90"
                    />
                </span>
            )}
        </span>
    );
    if (props.type) {
        return (
            <button
                type={props.type}
                onClick={props.onClick}
                disabled={disabled}
                aria-label={ariaLabel}
                className={wrapperStyles}
            >
                {content}
            </button>
        );
    }
    const isExternal = EXTERNAL_HREF_PATTERN.test(props.href);
    if (disabled) {
        return (
            <span aria-label={ariaLabel} aria-disabled="true" className={wrapperStyles}>
                {content}
            </span>
        );
    }
    return (
        <Link
            href={props.href}
            aria-label={ariaLabel}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={wrapperStyles}
        >
            {content}
        </Link>
    );
};
export default Button;