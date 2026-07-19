/** Shape returned by the /DeliveryAddress API. */
export interface DeliveryAddress {
  id: number;
  label: string;
  recipientName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}

/** Frontend-friendly alias kept for component consumption. */
export type Address = DeliveryAddress;

export interface AddressFormValues {
  label: string;
  recipient_name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  phone?: string;
  is_default?: boolean;
}

/** Paginated wrapper returned by the API. */
export interface AddressApiResponse {
  data: {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    data: DeliveryAddress[];
  };
}
