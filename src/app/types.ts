export type Options = {
  configs: Config[];
  towHitch: boolean;
  yoke: boolean;
};

export type Config = {
  description: string;
  id: number;
  price: number;
  range: number;
  speed: number;
};

export type Model = {
  description: string;
  code: string;
  colors: Color[];
};

export type Color = {
  code: string;
  description: string;
  price: number;
};
