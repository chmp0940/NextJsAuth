import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";
/*
request.json(): Parses the request body as JSON.
request.headers: Access the request headers.
request.cookies: Access cookies sent with the request.
request.url: The full URL of the request.

NextResponse.json(data, options): Sends a JSON response.
NextResponse.redirect(url): Redirects the client to another URL.
NextResponse.rewrite(url): Rewrites the request to a different URL.
NextResponse.cookies: Set cookies in the response.

The POST method in this context refers to an HTTP POST request. It is used to send data from the client

*/
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, username, password } = reqBody;
    // Check if user already exists
    if (!email || !username || !password) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 400 }
      );
    }
    console.log("reqBody", reqBody);
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      // alert("User already exists");
      console.log("User already exists");
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    // Hash password
    /*
      A salt is a random string added to the password to make it more secure.
      The bcryptjs.genSalt(10) function generates a salt with a complexity factor of 10.
      The higher the number (e.g., 10), the more secure the salt, but it also takes more time to generate.
          */

    /*
        The bcryptjs.hash(password, salt) function takes the user's plain-text password and the generated salt.
        It combines them and applies a hashing algorithm to produce a hashed password.
        The hashed password is a scrambled version of the original password that cannot be easily reversed.
          
      */

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    return NextResponse.json({
      message: "User created successfully",
      successs: true,
      savedUser,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in signup route:", error.message); // Log the error
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
