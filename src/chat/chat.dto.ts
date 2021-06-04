import { UserInfoDto } from '../user/dto/user.dto';

export interface CreateConversationDto {
  owner: UserInfoDto;
  participant: UserInfoDto;
}
