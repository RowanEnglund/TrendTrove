import { Injectable } from '@nestjs/common';
import { Preferences } from './preferences.entity';

@Injectable()
export class PreferencesService {
  private preferences: Preferences[] = [];
  private nextId = 1;

  getPreferences(userId: number): Preferences {
    let userPreferences = this.preferences.find((p) => p.userId === userId);
    if (!userPreferences) {
      userPreferences = { id: this.nextId++, userId, categories: [] };
      this.preferences.push(userPreferences);
    }
    return userPreferences;
  }

  updatePreferences(userId: number, categories: string[]): Preferences {
    const userPreferences = this.getPreferences(userId);
    userPreferences.categories = categories;
    return userPreferences;
  }
}
