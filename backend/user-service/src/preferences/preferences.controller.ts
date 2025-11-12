import { Controller, Get, Put, Body } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  getPreferences() {
    // a-64: placeholder user id
    const userId = '123';
    return this.preferencesService.getPreferences(userId);
  }

  @Put()
  updatePreferences(@Body() updatePreferencesDto: UpdatePreferencesDto) {
    // a-64: placeholder user id
    const userId = '123';
    return this.preferencesService.updatePreferences(userId, updatePreferencesDto);
  }
}
