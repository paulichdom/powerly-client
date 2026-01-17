export type RegisterBody = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  latitude?: number;
  longitude?: number;
  country_id?: number;
  vat_id?: string;
  currency?: string;
};

export type RegisterResponse = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified: number;
  vat_id: string;
  currency: string;
  balance: string;
  latitude: string;
  longitude: string;
  country_id: number;
};

export type VerifyEmailBody = {
  code: string;
  email: string;
};

export type VerifyEmailResponse = {
  id: number;
  customer_type: string;
  first_name: string;
  last_name: string;
  full_name: string;
  contact_number: string;
  email: string;
  balance: string;
  access_token: string;
};
