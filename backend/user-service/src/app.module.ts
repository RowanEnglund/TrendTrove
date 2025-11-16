import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { PreferencesModule } from './preferences/preferences.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, WishlistModule, PreferencesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
