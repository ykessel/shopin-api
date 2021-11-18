import { Pool } from "pg"

const poolConfig = {
    user: 'shopin-admin-group',
    host: 'localhost',
    database: 'shopin',
    password: '06fJ_l5B6if5sFhX5HJ_TcJB2_1S8Zd7',
    port: 5432
} 


export const pool = new Pool(poolConfig)   