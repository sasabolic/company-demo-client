import {Owner} from "./owner";

export class CompanyDetails {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  email: string;
  phone_number: string;
  owners: Owner[] = [];
}
