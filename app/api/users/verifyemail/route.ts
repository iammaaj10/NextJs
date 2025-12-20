import { connectDB } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyExpiryToken: { $gt: Date.now() }, // checks token  is greater than the expiry token
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid tokens" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyExpiryToken = undefined;
    await user.save();
    
    return NextResponse.json({
      message: "email is verify successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
