import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from './guards/jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false}),
        JwtModule.register({
            secretOrPrivateKey: 'Hier234234Koennte532409582Ihre890234890Werbung802934890Stehen!!29038490',
            signOptions: {
                expiresIn: 3600
            }
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {}