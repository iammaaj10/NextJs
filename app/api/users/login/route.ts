import { connectDB } from "@/app/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();
export async function POST(resquest: NextRequest) {
  try {
    const reqBody = await resquest.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid username " });
    }

    // check for the password
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return NextResponse.json(
        { error: "Please check the password" },
        { status: 400 }
      );
    }

    // create the token
    const generateToken = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(generateToken, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      success: true,
      message: "Login successfull",
    });

    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}
