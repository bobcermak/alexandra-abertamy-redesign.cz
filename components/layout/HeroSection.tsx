import { Button, RevealSection } from "@/components";
import { type FC } from "react";

type HeroSectionProps = {
    title?: string,
    heading?: string,
    isMainHero?: boolean,
    imgSrc?: string,
    imgAlt?: string
}
const HeroSection: FC<HeroSectionProps> = ({ title = "Celá horská chata jen pro vás", heading, isMainHero = true, imgSrc = "/images/content/hero.webp", imgAlt = "Chata Alexandra v Hřebečné u Abertam" }) => {
    return (
        <RevealSection
            scrollTrigger={false}
            id="hero"
            aria-label={imgAlt}
            className={`relative flex ${isMainHero ? "h-[calc(100dvh-1rem)]" : "h-[calc(70dvh-1rem)]"} flex-col justify-end overflow-hidden rounded-[15px] bg-cover bg-position-[50%_42%] bg-no-repeat ${isMainHero ? "pb-12 tablet:pb-20 desktop:pb-36" : "pb-6 tablet:pb-10 desktop:pb-18"} m-1.5 tablet:m-2`}
            style={{ backgroundImage: `url(${imgSrc})` }}
        >
            <figure className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <svg className="hero-lines-anim pointer-events-none" viewBox="0 0 1920 3618" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
                <path
                    d="M1115.37 2014.78C1167.97 1396.9 1461.72 -4.00459 2215.91 -664.624M3232.02 1834.88C2667.95 1253.31 1280.91 88.3425 245.356 81.0324M819.758 2902.09C1257.32 2475.22 2169.41 1444.04 2317.23 734.23M2494.4 941.325C1739.95 910.073 287.071 963.597 -148.594 354.811M3866.04 3616.96C3088.16 2691.49 982.215 608.878 832.543 -620.896"
                    stroke="#FFFFFF"
                    strokeOpacity="0.15"
                />
                </svg>
            </figure>
            <div className="mx-auto flex w-container flex-col items-start gap-8 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-10">
                <div className="max-w-190">
                    <header data-reveal>
                        {!isMainHero ? (
                            <>
                                <h1 className="text-sub uppercase font-semibold text-yellow">
                                    {title}
                                </h1>
                                <h2 className="text-sub-heading uppercase laptop:text-heading desktop:text-display font-bold leading-tight text-white text-left mb-4 laptop:mb-5 desktop:mb-6 bg-transparent p-0 -mt-5">
                                    {heading}
                                </h2>
                            </>
                        ) : (
                            <h1>
                                {title}
                            </h1>
                        )}
                        <p className="-mt-3 mb-6 text-white tablet:max-w-152 laptop:mb-8">
                            <span className="rounded-md bg-red px-1 py-px [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                                Až 15 hostů
                            </span>
                            , vlastní sauna, plně vybavená kuchyň a klid Krušných hor — po celý rok. V provozu od roku{" "}
                            <span className="rounded-md bg-green px-2 py-px text-white [-webkit-box-decoration-break:clone] [box-decoration-break:clone]">
                                1927.
                            </span>
                        </p>
                    </header>
                    {isMainHero && (
                    <div data-reveal className="mb-6 flex flex-col items-stretch gap-3 stablet:flex-row stablet:items-center">
                        <Button href="/rezervace" variant="primary" ariaLabel="Rezervovat" className="w-full stablet:w-auto">
                            Rezervovat
                        </Button>
                        <Button
                            href="/rezervace"
                            variant="tertiary"
                            isArrow={false}
                            ariaLabel="Zkontrolovat volné termíny"
                            className="w-full stablet:w-auto slaptop:hidden"
                        >
                            Zkontrolovat volné termíny
                        </Button>
                        <Button
                            href="/rezervace"
                            variant="light"
                            isArrow={false}
                            ariaLabel="Zkontrolovat volné termíny"
                            className="hidden w-full stablet:w-auto slaptop:inline-flex"
                        >
                            Zkontrolovat volné termíny
                        </Button>
                    </div>
                    )}
                    {isMainHero && (
                        <div data-reveal className="flex items-center gap-2">
                            <span className="relative flex size-3.5 shrink-0">
                                <span className="absolute inline-flex size-full animate-ping rounded-sm bg-lime opacity-75"/>
                                <span className="relative size-3.5 rounded-sm bg-lime"/>
                            </span>
                            <p className="text-body text-white tablet:text-sub">
                                Volných termínů tento měsíc: <span className="font-semibold">6</span>
                            </p>
                        </div>
                    )}
                </div>
                {isMainHero && (
                    <div data-reveal className="hidden slaptop:flex flex-col items-center gap-2 self-start rounded-[15px] bg-white px-6 py-4 shadow-primary tablet:self-auto">
                        <p className="text-[2.75rem] leading-none font-semibold text-red tablet:text-[3.8125rem]">1927</p>
                        <p className="text-sub leading-none text-dark tablet:text-[1.5625rem]">od roku</p>
                    </div>
                )}
            </div>
        </RevealSection>
    );
};
export default HeroSection;