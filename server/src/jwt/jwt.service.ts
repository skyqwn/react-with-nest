import * as jwt from 'jsonwebtoken';

import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  signAccessToken(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey, {
      expiresIn: '20m',
    });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
