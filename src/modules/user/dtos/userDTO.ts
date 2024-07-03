import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserResponseDTO {
  id!: number;
  name!: string;
  email!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
