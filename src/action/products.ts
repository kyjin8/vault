export interface ProductInfo {
  id: number;
  name: string;
  operation_start_epoch: number;
  operation_end_epoch: number;
}

export const products: ProductInfo[] = [
  {
    id: 1,
    name: "test1",
    operation_start_epoch: 307,
    operation_end_epoch: 310,
  },
  {
    id: 2,
    name: "test2",
    operation_start_epoch: 309,
    operation_end_epoch: 315,
  },
];
