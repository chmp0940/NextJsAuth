
import { NextResponse } from "next/server";
// http methods are explianed in the end of this file

export async function GET(){
  try {
    const response = NextResponse.json(
      {
        message: "Logout successful",
        success: true,
      },
      { status: 200 }
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set the expiration date to the past to delete the cookie
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// HTTP METHODS CHEAT SHEET
// ========================
//
// GET
// - Purpose: Retrieve (get) data from the server.
// - Example: Loading a webpage or fetching user info.
// - Analogy: Reading a book (you only look, you don’t change anything).
//
// POST
// - Purpose: Send (create) new data to the server.
// - Example: Submitting a signup or login form.
// - Analogy: Adding a new page to a book.
//
// PUT
// - Purpose: Update/replace existing data (usually the whole object).
// - Example: Saving all changes to your profile.
// - Analogy: Replacing an entire page in a book.
//
// PATCH
// - Purpose: Update/modify part of existing data (not the whole object).
// - Example: Changing just your profile picture.
// - Analogy: Correcting a typo on a page.
//
// DELETE
// - Purpose: Remove data from the server.
// - Example: Deleting your account or a post.
// - Analogy: Tearing a page out of a book.
//
// | Method  | What it does         | Analogy                        |
// |---------|----------------------|--------------------------------|
// | GET     | Read data            | Read a book                    |
// | POST    | Create new data      | Add a new page                 |
// | PUT     | Replace data         | Replace a whole page           |
// | PATCH   | Update part of data  | Edit a line on a page          |
// | DELETE  | Remove data          | Tear out a page                |
//
// Tip:
// - GET = Get data
// - POST = Post (send) new data
// - PUT = Put (replace) data
// - PATCH = Patch (fix part of) data
// - DELETE = Delete data