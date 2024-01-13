"use client";
import { usePathname } from "next/navigation";
import classes from "./nav-link.module.css";
import Link from "next/link";

function NavLink({ href, children }) {
  const currentPath = usePathname();
  return (
    <Link
      href={href}
      className={
        currentPath.startsWith(href)
          ? `${classes.link} ${classes.active}`
          : `${classes.link}`
      }
    >
      {children}
    </Link>
  );
}

export default NavLink;
