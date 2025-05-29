import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // Check if user already exists
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }
    // Check password
    const validPassword = await bcryptjs.compare(password, user.password);
    // it first convert it into hashed password and then compare it with the hashed password stored in the database
    // if the password is not valid, it will return false
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }
    // create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    // create token

    /*
    This data will be encoded into the token and can be decoded later to identify the user.
    This is the secret key used to sign the token.
    It ensures that only the server (which knows the secret key) can verify the token's authenticity.
        */
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    /*
    jwt.sign creates a JSON Web Token (JWT).
    It takes tokenData (user info like id, email, username) and encodes it into a secure token.
    It uses your secret key (process.env.TOKEN_SECRET) to sign the token, so only your server can verify it.
    */

    // console.log("token", token);

    // always use vairable to set the cookie
    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      // user: tokenData,
    });
    response.cookies.set("token", token, {
      httpOnly: true, 
      // makes the cookie inaccessible to JavaScript on the  client side, which helps prevent XSS attacks.
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 500 });
  }
}
