"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-sans",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/work", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/workshops", label: "Workshops" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className={`${archivo.variable} ${mono.variable} border-b border-[#DEDFDA] bg-[#F6F6F3]`}
    >
      <nav className="mx-auto w-full max-w-7xl px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="navbar-name"
            aria-label="Prashant Gupta portfolio home"
            onClick={() => setIsMenuOpen(false)}
          >
            Prashant Gupta
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-x-5 font-mono text-[12px] sm:gap-x-7 sm:text-[13px] md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-2 transition ${
                    isActive
                      ? "font-medium text-[#16191C]"
                      : "text-[#565B60] hover:text-[#16191C]"
                  }`}
                >
                  {link.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-px w-full bg-[#1F6F5C]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Hamburger Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#D5D6D1] text-[#16191C] transition hover:bg-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-[#DEDFDA] pt-4 md:hidden">
            <div className="flex flex-col font-mono text-[13px]">
              {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`border-b border-[#DEDFDA] py-3 transition last:border-b-0 ${
                      isActive
                        ? "font-medium text-[#16191C]"
                        : "text-[#565B60] hover:text-[#16191C]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>

                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1F6F5C]" />
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
