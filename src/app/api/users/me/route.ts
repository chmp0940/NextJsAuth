
import { getDataFromToken } from "@/helper/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function GET(req: NextRequest) {
  try {
    const username = await getDataFromToken(req);

    const user = await User.findOne({ username }).select("-password ");
    return NextResponse.json(
      {
        message: "User fetched successfully",
        success: true,
        info: user, // this user is from your databse format so use it likelwise  in frontend page
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
