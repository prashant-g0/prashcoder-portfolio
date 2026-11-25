import Link from "next/link";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { contact } from "@/data/prash/about";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
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

export default function Footer() {
  return (
    <footer
      className={`${archivo.variable} ${mono.variable} border-t border-[#DEDFDA] bg-[#F6F6F3]`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-10 lg:px-10">
        {/* Brand + Navigation */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Brand + Vision */}
          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-wider text-[#1F6F5C]">
              Prashant Gupta / developer
            </p>

            <h2 className="mt-5 mb-7 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#16191C] sm:text-4xl">
              Build useful things.
              <br />
              <span className="text-[#1F6F5C]">Share what works.</span>
            </h2>

            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-mono text-xs text-[#565B60] hover:text-[#176b58]">
              {contact.email} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Navigation */}
          <div className="lg:justify-self-end">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-wider text-[#7A7F83]">
              Explore
            </p>

            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-1 font-mono text-[13px] text-[#565B60] transition hover:text-[#1F6F5C]"
                >
                  {link.label}

                  <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-[#DEDFDA] pt-6 font-mono text-[11px] text-[#7A7F83] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {contact.name}</p>

          <div className="flex flex-wrap items-center gap-4">
            {contact.socialLinks.slice(0, 4).map((social) => (
              <Link key={social.label} href={social.href} target="_blank" rel="noreferrer" className="transition hover:text-[#176b58]">
                {social.label}
              </Link>
            ))}
            <Link href="#top" aria-label="Back to top" title="Back to top" className="flex h-9 w-9 items-center justify-center rounded-md border border-[#d8dad4] transition hover:border-[#176b58] hover:text-[#176b58]">
              <ArrowUp className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
