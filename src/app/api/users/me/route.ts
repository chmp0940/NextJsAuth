import { getDataFromToken } from "@/helper/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
  try {
    const username = await getDataFromToken(req);

    const user = await User.findOne({ username }).select("-password "); // remember it excludes the password field
    return NextResponse.json(
      {
        message: "User fetched successfully",
        success: true,
        info: user,
        
        // this user is from your databse format so use it likelwise  in frontend page
        /*
        It sends the user’s information (like username, email, etc.) to the frontend.
        On the frontend, you can access this data as response.info after making the API call.
        */
      
      },
      { status: 200 }
    );
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
