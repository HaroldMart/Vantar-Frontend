import { icons } from 'lucide-react';
import { IconProps } from '../interfaces';

export const Icon = ({ name, color, size }: IconProps) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} />;
};
