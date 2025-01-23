import { CitiesBaseService } from '@/api';
import { ApiMethods, CitiesTypes } from '@/types';

export class CitiesService extends CitiesBaseService {
  public static async getCitiesByFilters(namePrefix: string) {
    return await this.fetch<CitiesTypes>({
      url: `${ApiMethods.Cities}?&namePrefix=${namePrefix}&languageCode=RU&types=CITY&namePrefixDefaultLangResults=True&sort=-population&limit=10`,
      method: 'GET',
    });
  }
}
