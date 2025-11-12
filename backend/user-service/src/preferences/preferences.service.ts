import { Injectable } from '@nestjs/common';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';

@Injectable()
export class PreferencesService {
  getPreferences(userId: string) {
    // a-64: placeholder to get user preferences
    return {
      userId,
      categories: ['electronics', 'fashion'],
    };
  }

  updatePreferences(userId: string, updatePreferencesDto: UpdatePreferencesDto) {
    // a-64: placeholder to update user preferences
    return {
      userId,
      ...updatePreferencesDto,
    };
  }
}
