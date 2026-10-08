import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

/** Data access for platform users (MongoDB). */
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  /**
   * Loads a user by id.
   *
   * @param id - MongoDB ObjectId string of the user.
   * @returns The matching user document.
   * @throws NotFoundException if the id is malformed or no user exists.
   */
  async findById(id: string): Promise<UserDocument> {
    const user = isValidObjectId(id) ? await this.userModel.findById(id) : null;
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  /**
   * Applies a partial update to a user's profile.
   *
   * @param id - MongoDB ObjectId string of the user.
   * @param changes - Profile fields to overwrite.
   * @returns The updated user document.
   * @throws NotFoundException if the user does not exist.
   */
  async updateProfile(id: string, changes: Partial<User>): Promise<UserDocument> {
    const user = isValidObjectId(id)
      ? await this.userModel.findByIdAndUpdate(id, changes, { new: true })
      : null;
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }
}


