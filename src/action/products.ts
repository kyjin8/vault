export interface ProductInfo {
    prdCd: string;
    // frst_regist_pnttm: Date;
    // last_updt_pnttm: Date;
    // frst_register_id: string;
    // last_updusr_id: string;
    // deposit_period: number;
    // investment_asset: string;
    prdNm: string;
    profitRate: number;
    progressStatus: string;
    salesStartEpoch: number;
    salesEndEpoch: number;
    operationStartEpoch: number;
    operationEndEpoch: number;
    revenuePaymentEndEpoch: number;
    totalDeposit: number;
}

export const products: ProductInfo[] = [
    {
        prdCd: 'PD0001',
        prdNm: 'test1',
        profitRate: 0.03,
        progressStatus: 'Running',
        salesStartEpoch: 309,
        salesEndEpoch: 310,
        operationStartEpoch: 310,
        operationEndEpoch: 312,
        revenuePaymentEndEpoch: 315,
        totalDeposit: 100000
    },
    {
        prdCd: 'PD0002',
        prdNm: 'test2',
        profitRate: 0.05,
        progressStatus: 'Running',
        salesStartEpoch: 312,
        salesEndEpoch: 313,
        operationStartEpoch: 314,
        operationEndEpoch: 317,
        revenuePaymentEndEpoch: 320,
        totalDeposit: 200000
    },
]
//   id: number;
//   name: string;
//   operation_start_epoch: number;
//   operation_end_epoch: number;
// }

// export const products: ProductInfo[] = [
//   {
//     id: 1,
//     name: "test1",
//     operation_start_epoch: 307,
//     operation_end_epoch: 310,
//   },
//   {
//     id: 2,
//     name: "test2",
//     operation_start_epoch: 309,
//     operation_end_epoch: 315,
//   },
// ];
