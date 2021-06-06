import {
  CanActivate,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../user/user.service';
import { Observable } from 'rxjs';
import { JWT_SECRET } from '../../shared/constants';

@Injectable()
export class WsGuard implements CanActivate {
  private logger: Logger = new Logger('WsAuthGuard');
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const tokenHeader = context.args[0].handshake.query.token;

    try {
      if (!tokenHeader) {
        this.logger.error('No authorization token provided');
        return false;
      }
      const bearerToken = tokenHeader.split(' ')[1];
      const decoded = jwt.verify(bearerToken, JWT_SECRET) as any;

      return new Promise((resolve, reject) => {
        return this.userService
          .findUserByEmail(decoded.user.email)
          .then((user) => {
            if (user) {
              resolve(user);
            } else {
              this.logger.error('User was not found');
              reject(false);
            }
          });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
