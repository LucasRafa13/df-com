import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await argon2.hash(createUserDto.password);

      const createdUser = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      return createdUser.save();
    } catch (error) {
      return error;
    }
  }

  findAll() {
    try {
      return this.userModel.find().select('-password');
    } catch (error) {
      return error;
    }
  }

  findOne(id: string) {
    try {
      return this.userModel.findById(id);
    } catch (error) {
      return error;
    }
  }

  findByEmail(email: string) {
    try {
      return this.userModel.findOne({ email });
    } catch (error) {
      return error;
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return this.userModel.findByIdAndUpdate(id, updateUserDto, {
        new: true,
      });
    } catch (error) {
      return error;
    }
  }

  remove(id: string) {
    try {
      return this.userModel.findByIdAndDelete(id);
    } catch (error) {
      return error;
    }
  }
}
