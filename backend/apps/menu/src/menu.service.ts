import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';
import {
  Dish,
  CreateDishDto,
  UpdateDishDto,
  PaginationDto,
  Dishes
} from './menu';

interface DishDocument {
  _id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class MenuService {
  constructor(@InjectModel('Dish') private readonly dishModel: Model<DishDocument>) {}

  async create(createDishDto: CreateDishDto): Promise<Dish> {
    const dish = new this.dishModel({
      ...createDishDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await dish.save();
    return this.mapToDish(dish);
  }

  async findAll(paginationDto: PaginationDto): Promise<Dishes> {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;
    const dish = await this.dishModel.find().skip(skip).limit(limit).exec();
    const total = await this.dishModel.countDocuments().exec();
    return { dishes: dish.map(this.mapToDish), total };
  }

  async findOne(id: string): Promise<Dish> {
    const dish = await this.dishModel.findById(id).exec();
    if (!dish) {
      throw new RpcException({ statusCode: 404, message: `Không tìm thấy món ăn với id ${id}` });
    }
    return this.mapToDish(dish);
  }

  async update(id: string, updateDishDto: UpdateDishDto): Promise<Dish> {
    const dish = await this.dishModel.findById(id).exec();
    if (!dish) {
      throw new RpcException({ statusCode: 404, message: `Không tìm thấy món ăn với id ${id}` });
    }
    Object.assign(dish, updateDishDto);
    dish.updatedAt = new Date();
    await dish.save();
    return this.mapToDish(dish);
  }

  async remove(id: string): Promise<Dish> {
    const dish = await this.dishModel.findByIdAndDelete(id).exec();
    if (!dish) {
      throw new RpcException({ statusCode: 404, message: `Không tìm thấy món ăn với id ${id}` });
    }
    return this.mapToDish(dish);
  }

  private mapToDish(dish: DishDocument): Dish {
    return {
      id: dish._id.toString(),
      name: dish.name,
      description: dish.description,
      price: dish.price,
      isAvailable: dish.isAvailable,
      category: dish.category,
      createdAt: dish.createdAt.toISOString(),
      updatedAt: dish.updatedAt.toISOString(),
    };
  }
}