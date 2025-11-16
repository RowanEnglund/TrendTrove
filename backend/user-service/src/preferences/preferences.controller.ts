import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { Preferences } from './preferences.entity';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get(':userId')
  getPreferences(@Param('userId') userId: string): Preferences {
    return this.preferencesService.getPreferences(+userId);
  }

  @Put(':userId')
  updatePreferences(
    @Param('userId') userId: string,
    @Body() body: { categories: string[] },
  ): Preferences {
    return this.preferencesService.updatePreferences(+userId, body.categories);
  }
}
