export interface DispersionResponse {
  meta: Meta;
  data: DataDispersion[];
}

export interface DataDispersion {
  dispersionId:       string;
  totalAmount:        number;
  totalChargeAmount:  number;
  totalAmountOffLoad: number;
  totalRecords:       number;
  sourceAccount:      null;
  bankId:             string;
  status:             string;
  createDt:           Date;
  statusRecords:      StatusRecords;
}

export interface StatusRecords {
  withError:   number;
  approved:    number;
  unApproved:  number;
  processed:   number;
  unProcessed: number;
}

export interface Meta {
  messageUid:   string;
  requestDt:    Date;
  requestAppId: null;
}
