interface IInternalApiResponse<T> {
  error?: string;
  data?: T;
}

interface IHasChild {
  children: React.ReactNode | React.JSX.Element;
}

interface PocketbaseResponse<T> {
  error?: string;
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}
interface ICompanies{
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  id: string;
  founder: string;
  location: string;
  name: string;
  foundationDate : string,
  creator : string,
  employeesNumber : number
}