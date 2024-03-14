export class ICustomer {
    ID?:number;
    CustomerID?: number;
    CorporationID!: number;
    CustomerName!: string;
    FederalID?: string;
    CompanyName?: string;
    ChecksToBePrintedAs?: string;
    DoingBusinessAs?: string;
    VendorID?: number;
    SalutionID?: number;
    FirstName?: string;
    MiddleName?: string;
    LastName?: string;
    MobileNumber?: bigint;
    AlternativeNumber?: bigint;
    WorkNumber?: number;
    FaxNumber?: number;
    EmailID?: string;
    CCEmailID?: string;
    Website?: string;
    AccountNumber?: bigint;
    OpeningBalance?: number;
    AsOfDate?: Date;
    BAName?: string;
    BAAddress?: string;
    CountryID?: number;
    StateID?: number;
    BACity?: string;
    ZipCode?: number;
    // Other fields...
  
    DAName?: string;
    DAAddress?: string;
    DACountryID?: number;
    DAStateID?: number;
    DABACity?: string;
    DABAZipCode?: number;
    // Other fields...
  
    BusinessTypeID?: number;
    // Other fields...
  
    CreditDayID?: number;
    // Other fields...
  
    DiscountPercentage?: number;
    DiscountAccount?: string;
    SendMethodID?: number;
    // Other fields...
  
    CustomerTypeID?: number;
    // Other fields...
  
    PaymentMethodID?: number;
    // Other fields...
  
    COI_ExpirationDate?: Date;
    MSA_ExpirationDate?: Date;

    Notes? : string;
    
    SameDeliveryAddress?:boolean;
    // Other fields...
  }
  