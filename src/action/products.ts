export interface ProductInfo {
    prd_cd: string;
    // frst_regist_pnttm: Date;
    // last_updt_pnttm: Date;
    // frst_register_id: string;
    // last_updusr_id: string;
    // deposit_period: number;
    // investment_asset: string;
    prd_nm: string;
    profit_rate: number;
    progress_status: string;
    sales_start_epoch: number;
    sales_end_epoch: number;
    operation_start_epoch: number;
    operation_end_epoch: number;
    revenue_payment_end_epoch: number;
    total_deposit: number;
}

export const ProductsTable: ProductInfo[] = [
    {
        prd_cd: 'PD0001',
        prd_nm: 'test1',
        profit_rate: 0.03,
        progress_status: 'Running',
        sales_start_epoch: 309,
        sales_end_epoch: 310,
        operation_start_epoch: 311,
        operation_end_epoch: 312,
        revenue_payment_end_epoch: 315,
        total_deposit: 100000
    }
]