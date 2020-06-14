import { ApiProperty } from "@nestjs/swagger";

export class UserRequest {
  @ApiProperty({
    description: "Venko user Id",
    example: "202001089",
  })
  userId: string;

  @ApiProperty({
    description: "Full name",
    example: "Rodrigo Ibanez",
  })
  fullName: string;

  @ApiProperty({
    description: "First name",
    example: "Rodrigo",
  })
  firstName: string;

  @ApiProperty({
    description: "Last name",
    example: "Ibanez",
  })
  lastName: string;

  @ApiProperty({
    description: "Avatar url",
    example: "www.avatar.com/myavatar.jpg",
  })
  avatarUrl: string;

  @ApiProperty({
    description: "Nick name",
    example: "rsibanez89",
  })
  nickName: string;

  @ApiProperty({
    description: "User type",
    example: "User",
  })
  userType: string;

  @ApiProperty({
    description: "Email",
    example: "rodrigo@mail.com",
  })
  email: string;
}