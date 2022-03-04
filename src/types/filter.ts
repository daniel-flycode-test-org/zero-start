export interface Filter {
  property: {
    name: string;
    type: string;
  };
  operator: {
    value: string;
    typesAccepted: string[];
  };
  value: string;
}
