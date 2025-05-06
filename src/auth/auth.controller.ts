import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDTO } from './dto/signup-user.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { Public } from './public-auth-decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('/signup')
	async create(@Body() paylod: SignUpUserDTO) {
		return await this.authService.createNewUser(paylod);
	}

	@Public()
	@Post('/signin')
	signin(@Body() payload: SignInUserDTO) {
		return this.authService.signin(payload);
	}

	@Get('/user/:id')
	findOne(@Param('id') id: string) {
		return this.authService.findOneById(id);
	}
}
