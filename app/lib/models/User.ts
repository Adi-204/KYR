// src/lib/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IResume {
  url: string;
  publicId: string;
  uploadedAt: Date;
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  provider: string;
  resume?: IResume;
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
      maxlength: [50, 'First name cannot exceed 50 characters'],
    },
    lastName: {
      type: String,
      required: [false, 'Last name is optional'],
      trim: true,
      maxlength: [50, 'Last name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    provider: { type: String, enum: ["credentials", "google"], default: "credentials" },
    password: {
      type: String,
      required: function (this: any): boolean {
        return this.provider === "credentials";
      },
      select: false,
    },
    resume: {
      url: String,
      publicId: String,
      uploadedAt: Date
    }
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
