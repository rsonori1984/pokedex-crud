export interface Pokemon {
  name: string;
  description?: string;
  url?: string;
  details?: {
    id?: string | number;
    height?: string | number;
    weight?: string | number;
    abilities?: string[];
    types?: string[];
  };
}