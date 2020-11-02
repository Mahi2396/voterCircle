export interface Recipes {
  href: string;
  ingredients: string;
  thumbnail: string;
  title: string;
}

export interface List {
  title: string;
  results: Recipes[];
}

export interface Filter {
  pageNo: number;
  searchWord: string;
  ingredients: string[];
}
