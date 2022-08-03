import type { NextRequest, NextResponse } from "next/server";

// PAGES WE WANT TO PROTECT
const pagesToProtect = ["/"];

// YOU DEFINE A NAMED IMPORT (NOT DEFAULT)

export function middleware(req: NextRequest) {
  //
}

// THIS ARE PATHS
