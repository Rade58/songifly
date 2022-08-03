import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// PAGES WE WANT TO PROTECT
const pagesToProtect = [
  "/",
  "/library",
  "/liked-songs",
  "/search",
  "/playlist",
];
const dynamicPagesToProtect = ["/playlist/"];

// YOU DEFINE A NAMED IMPORT (NOT DEFAULT)

export function middleware(req: NextRequest) {
  const token = req.cookies.get("SONGIFY_ACCESS_TOKEN");

  if (pagesToProtect.find((p) => req.nextUrl.pathname === p)) {
    if (!token) {
      // YOU NEED ABSOLUTE URLS FOR REDIRECT
      return NextResponse.redirect(`${req.nextUrl.origin}/auth`);
    }
  }

  if (dynamicPagesToProtect.find((p) => req.nextUrl.pathname.includes(p))) {
    if (!token) {
      // YOU NEED ABSOLUTE URLS FOR REDIRECT
      return NextResponse.redirect(`${req.nextUrl.origin}/auth`);
    }
  }
}

// THIS ARE PATHS
