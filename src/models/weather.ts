export interface WeatherData {
  speedUnits?: string;
  temperatureUnits?: string;
  time: string;
  timezone: string;
  temperature?: number;
  humidity?: number;
  windSpeed?: number;
  uvIndex?: number;
}
