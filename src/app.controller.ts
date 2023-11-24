import { Body, Controller, Get, HttpCode, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { RegistrationDto } from './registration.dto';
import { user } from './user';
import { product } from './product';
import { Response } from 'express';

const users: user[] = [new user('admin@example.com', 'asdf12', 33)];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('register')
  @Render('regsterFrom')
  registerForm() {
    return { errors: [] };
  }

  @Post('register')
  @HttpCode(200)
  @Render('regsterFrom')
  register(@Body() registration: RegistrationDto, @Res() res: Response) {
    const errors: string[] = [];
    if (!registration.email.includes('@')) {
      errors.push('Az email cim formatumaa nem megfelelo');
    }
    if (registration.password.length < 8) {
      errors.push('A jelszo legalabb 8 karalterbol kell alnia');
    }
    if (registration.password !== registration.password_again) {
      errors.push('A két jelszo nem egyezik');
    }
    const age = parseInt(registration.age);
    if (age < 18 || isNaN(age)) {
      errors.push('Az életkornak nagyobbnak kell lenie 18-nál');
    }
    if (errors.length > 0) {
      return {
        errors,
      };
    } else {
      users.push(new user(registration.email, registration.password, age));
      res.redirect('/');
      return {};
    }
  }

  @Post('product')
  @Render('productForm')
  product() {
    return {
      
    };
  }
}
