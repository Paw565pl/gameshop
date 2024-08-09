interface Address {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  street: string;
  street_number: string;
  flat_number: string | null;
  city: string;
  post_code: string;
  state: string;
  country: string;
}

export default Address;
