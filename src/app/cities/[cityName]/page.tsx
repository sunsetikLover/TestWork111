import { WeatherCard } from '@/components';

interface Props {
  params: Promise<{ cityName: string }>;
}

export const generateMetadata = async ({ params }: Props) => {
  const { cityName } = await params;

  const decodeCityName = decodeURIComponent(cityName);

  return {
    title: `${decodeCityName}`,
    description: `Прогноз погоды в городе ${decodeCityName}.`,
  };
};

export default async function CityWeatherInfo({ params }: Props) {
  const { cityName } = await params;

  return <>{cityName && <WeatherCard cityName={cityName} />}</>;
}
