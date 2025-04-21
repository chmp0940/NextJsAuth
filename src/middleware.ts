import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  /*
  if request.nextUrl is not used, you cannot directly access request.pathname because the NextRequest object in Next.js does not have a pathname property. Instead, request.nextUrl is the way to access and manipulate the URL of the incoming request, including its pathname.
  */
  /*
Key Difference
Feature	             nextUrl                      NextURL
What it is	  A property of NextRequest.   	  A class in Next.js.
Type	        Instance of NextURL.	         Class definition.
Purpose	      Used to access/manipulate      Provides methods to work 
              the request URL in middleware. with URLs.	
Usage	        Accessed via request.nextUrl.	 Used indirectly through  

                                              nextUrl.
 */

  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // If the user is already authenticated and tries to access a public path, redirect them to the profile page
    return NextResponse.redirect(new URL("/", request.nextUrl));
    /*
      1)The new URL constructor creates a new URL object
      2)The first argument ("/") specifies the path to redirect to (in this case, the home page)
      3)The second argument (request.nextUrl) is the base URL for the redirect.
      */
  }

  if (!isPublicPath && !token) {
    // If the user is not authenticated and tries to access a protected path, redirect them to the login page
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

//Specifies that the middleware should only run for the following paths:
export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
