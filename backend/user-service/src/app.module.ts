import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PreferencesModule } from './preferences/preferences.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { PreferencesModule } from './preferences/preferences.module';

@Module({
  imports: [AuthModule, PreferencesModule, WishlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
