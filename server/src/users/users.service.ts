import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    nickname,
    verifyPassword,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      if (password !== verifyPassword) {
        return {
          ok: false,
          error: '비밀번호가 같지않습니다.',
        };
      }
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: '이미 사용중인 이메일입니다.' };
      }
      await this.users.save(this.users.create({ email, password, nickname }));
      return { ok: true };
    } catch (error) {
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: '찾을 수 없는 아이디입니다.',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: '아이디 또는 비밀번호가 일치하지 않습니다.',
        };
      }
      const token = this.jwtService.signAccessToken(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }
}
