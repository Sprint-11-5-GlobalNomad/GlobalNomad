// User DTOs
export interface UserServiceResponseDto {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserBodyDto {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateUserBodyDto {
  nickname?: string;
  profileImageUrl?: string;
  newPassword?: string;
}
