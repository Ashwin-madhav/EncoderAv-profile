
// Import React to resolve the 'Cannot find namespace React' error on line 6
import React from 'react';

export interface SlideContent {
  id: number;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  backgroundImage?: string;
  bgColor?: string;
}

export enum ServiceType {
  Audio = 'Audio',
  Visual = 'Visual',
  Lighting = 'Lighting',
  Truss = 'Truss'
}
