// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.20.3
// source: proto/menu.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "menu";

export interface CreateDishDto {
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  dishType: string;
  category: string;
  imageUrl: string;
}

export interface UpdateDishDto {
  id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  dishType: string;
  category: string;
  imageUrl: string;
}

export interface FindOneDishDto {
  id: string;
}

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  isAvailable: boolean;
  dishType: string;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dishes {
  dishes: Dish[];
  total: number;
}

export interface PaginationDto {
  page: number;
  limit: number;
}

export const MENU_PACKAGE_NAME = "menu";

export interface MenuServiceClient {
  createDish(request: CreateDishDto): Observable<Dish>;

  findAllDishes(request: PaginationDto): Observable<Dishes>;

  findOneDish(request: FindOneDishDto): Observable<Dish>;

  updateDish(request: UpdateDishDto): Observable<Dish>;

  removeDish(request: FindOneDishDto): Observable<Dish>;
}

export interface MenuServiceController {
  createDish(request: CreateDishDto): Promise<Dish> | Observable<Dish> | Dish;

  findAllDishes(request: PaginationDto): Promise<Dishes> | Observable<Dishes> | Dishes;

  findOneDish(request: FindOneDishDto): Promise<Dish> | Observable<Dish> | Dish;

  updateDish(request: UpdateDishDto): Promise<Dish> | Observable<Dish> | Dish;

  removeDish(request: FindOneDishDto): Promise<Dish> | Observable<Dish> | Dish;
}

export function MenuServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createDish", "findAllDishes", "findOneDish", "updateDish", "removeDish"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MenuService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MenuService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MENU_SERVICE_NAME = "MenuService";
