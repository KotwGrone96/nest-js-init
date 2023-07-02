import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user.dto';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post('login')
	login(@Body() user: UserDto) {
		return this.authService.login(user);
	}
}
