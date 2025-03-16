import { LoginUserDto } from "./loginUser.dto";

export class PayloadDto {
    sub: string;
    user: LoginUserDto;
    iat: number;
    exp: number;
}