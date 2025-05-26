import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import User from "@/app/lib/models/User";
import { getAuthenticatedUser } from "@/app/utils/auth";
import dbConnect from "@/app/lib/db/connect";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();

  if (!user || !user.id) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const formData = await request.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Validate file type (e.g., only allow PDFs)
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString("base64");
    const dataUri = `data:${file.type};base64,${base64String}`;

    // Delete old resume if it exists
    const existingUser = await User.findById(user.id);
    if (existingUser?.resume?.publicId) {
      await cloudinary.uploader
        .destroy(existingUser.resume.publicId)
        .catch(console.error);
    }

    // Upload new resume to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: "resumes",
      resource_type: "auto"
    });

    // Update user in DB
    await User.findByIdAndUpdate(user.id, {
      resume: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        uploadedAt: new Date(),
      },
    }); 

    return NextResponse.json({
      resumeUrl: uploadResult.secure_url,
      userId: user.id,
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

