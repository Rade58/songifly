import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// PAGES WE WANT TO PROTECT
const pagesToProtect = ["/", "/library", "/liked-songs", "/search"];

// YOU DEFINE A NAMED IMPORT (NOT DEFAULT)

export function middleware(req: NextRequest) {
  if (pagesToProtect.find((p) => req.nextUrl.pathname === p)) {
    const token = req.cookies.get("SONGIFY_ACCESS_TOKEN");

    if (!token) {
      // YOU NEED ABSOLUTE URLS FOR REDIRECT
      return NextResponse.redirect(`${req.nextUrl.origin}/auth`);
    }
  }
}

// THIS ARE PATHS
