import {
  DropletsIcon,
  SunMediumIcon,
  ThermometerSunIcon,
  WindIcon,
} from "lucide-react";
import { ReactNode } from "react";

export interface IconProps {
  size?: number;
}
export const TemperatureIcon: (props: IconProps) => ReactNode = (props) => (
  <ThermometerSunIcon {...props} />
);
export const HumidityIcon: (props: IconProps) => ReactNode = (props) => (
  <DropletsIcon {...props} />
);
export const UvIndexIcon: (props: IconProps) => ReactNode = (props) => (
  <SunMediumIcon {...props} />
);
export const WindSpeedIcon: (props: IconProps) => ReactNode = (props) => (
  <WindIcon {...props} />
);
