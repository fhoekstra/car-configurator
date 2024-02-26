import { Injectable, computed } from '@angular/core';
import { Color, Config } from '../types';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  totalCost = (
    selectedConfig: Config | undefined,
    selectedColor: Color | undefined,
    isTowIncluded: boolean,
    isYokeIncluded: boolean,
  ) => {
    let total = 0;
    if (selectedConfig) total += selectedConfig?.price ?? 0;
    if (selectedColor) total += selectedColor?.price ?? 0;
    if (isTowIncluded) total += this.towCost;
    if (isYokeIncluded) total += this.yokeCost;
    return total;
  };

  towCost = 1000;
  yokeCost = 1000;
  constructor() { }
}
