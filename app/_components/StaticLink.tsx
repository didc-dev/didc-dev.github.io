import type { AnchorHTMLAttributes, ReactNode } from "react";

type StaticLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

/** A normal anchor is the most reliable navigation primitive on GitHub Pages. */
export function StaticLink({ href, children, ...props }: StaticLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
