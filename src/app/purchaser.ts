export interface IPurchaser {
    TranscationID: number;
    DealerName: string;
    Address1: string;
    Address2: string;
    City: string;
    State: string;
    ZipCode: number;
    DateOfPurchase: Date | null;
    Amount: number;
    PaymentMode: string;
    PaymentNumber: number;
    EmployeeID: number;
    EmployeeSign: string;
    UploadReceipt: FormData | null; // Updated to use the File type
  }
  