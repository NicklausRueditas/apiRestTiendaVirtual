import { Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { UsersService } from '../services/users.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtAuthService } from '../services/jwt-auth.service';


@Controller('auth')
export class AuthController {
  
  constructor(private readonly authService: AuthService, private readonly userService: UsersService, private readonly jwtAuthService: JwtAuthService) { }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // La autenticación de Google será manejada por Passport
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Res() res, @Req() req) {
    const user = req.user;

    // Generar el token JWT utilizando JwtAuthService
    console.log(user)
    const token = await this.jwtAuthService.generateJwtToken(user);
    console.log(token)
    res.cookie('sessionToken', token, { httpOnly: true });
    res.redirect('http://localhost:4200/business/inventory'); // Redirige al usuario a la página principal después de la autenticación de Google
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res): Promise<void> {
    const { email, password } = loginUserDto;
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const token = this.jwtAuthService.generateJwtToken(user);
    res.cookie('sessionToken', token, { httpOnly: true });
    res.send();
  }
}