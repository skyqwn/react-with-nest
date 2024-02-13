import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from 'src/common/dtos/output.dto';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'nickname',
]) {
  @Field((type) => String)
  verifyPassword: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
