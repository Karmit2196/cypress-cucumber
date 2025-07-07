export interface UserData {
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export interface CheckoutData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  mobileNumber: string;
  country: string;
}

export interface PaymentData {
  cardName: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
} 