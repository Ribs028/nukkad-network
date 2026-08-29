import React from "react";
import { Button } from "@/components/ui/button";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface Footer1Props {
  logo: React.ReactNode;
  brandName: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterButtonText?: string;
  newsletterButtonHref: string;
  linkGroups: FooterLinkGroup[];
  copyright: string;
  /** Optional background image shown inside the card, behind the content */
  backgroundImage?: string;
}

export function Footer1({
  logo,
  brandName,
  newsletterTitle,
  newsletterDescription,
  newsletterButtonText = "Email us",
  newsletterButtonHref,
  linkGroups,
  copyright,
  backgroundImage,
}: Footer1Props) {
  return (
    <footer className=" w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="bg-background relative mx-auto max-w-7xl overflow-hidden rounded-none border p-8 shadow-sm sm:p-12">
        {backgroundImage && (
          <>
            <img
              src={backgroundImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
            />
            <div className="bg-background/35 absolute inset-0" />
          </>
        )}
        <div className="relative z-10 flex flex-col justify-between gap-12 xl:flex-row xl:gap-24">
          <div className="shrink-0 space-y-8 xl:w-[400px]">
            <div className="flex items-center gap-2">
              <div className="text-primary">{logo}</div>
              <span className="text-xl font-semibold">{brandName}</span>
            </div>

            <div className="space-y-4">
              <h3 className="text-foreground font-medium">{newsletterTitle}</h3>
              <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">
                {newsletterDescription}
              </p>
              <Button asChild className="rounded-none">
                <a href={newsletterButtonHref}>{newsletterButtonText}</a>
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-wrap justify-end gap-x-16 gap-y-8">
            {linkGroups.map((group, idx) => (
              <div key={idx} className="min-w-[140px] space-y-5">
                <h4 className="text-foreground text-sm font-medium">
                  {group.title}
                </h4>
                <ul className="space-y-4">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 mt-16 flex items-center justify-center border-t pt-8">
          <p className="text-muted-foreground text-center text-xs">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
