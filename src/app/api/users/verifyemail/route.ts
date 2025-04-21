/* eslint-disable @typescript-eslint/no-explicit-any */
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user=await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
              //greater than current time
    });

    if(!user)
    {
      return NextResponse.json({message:"Token is invalid or expired"}, {status:400});
    }
    console.log(user);

    user.isVerified=true;
    user.verifyToken=undefined; //remove token from user
    user.verifyTokenExpiry=undefined; //remove token expiry from user

    await user.save();
    //send email to user that email is verified
    


    return NextResponse.json({message:"Email verified successfully"}, {status:200});



  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

