import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../../common/enums';

export type UserDocument = HydratedDocument<User>;

/** Platform user, stored in MongoDB. Travelers, providers and drivers share it. */
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  displayName: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop({ trim: true, maxlength: 500 })
  bio?: string;

  @Prop({ trim: true })
  avatarUrl?: string;

  @Prop({ type: [String], enum: Object.values(UserRole), default: [UserRole.TRAVELER] })
  roles: UserRole[];

  @Prop({ type: [String], default: [] })
  interests: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);


