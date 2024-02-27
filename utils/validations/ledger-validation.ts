import {z} from "zod";

export const ledgerValidation = z.object({
    title : z.string().min(1 , 'required'),
    description : z.string().min(1 , 'required'),
    credit : z.coerce.number().gte(1 , 'required'),
    debit : z.coerce.number().gte(1 , 'required'),
})
export type ledgerType = z.infer<typeof ledgerValidation>