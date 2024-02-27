import {z} from "zod";

export const companyValidation = z.object({
    name : z.string().min(1 , 'required'),
    employeesNumber : z.coerce.number().gte(1 , 'required'),
    founder : z.string().min(1 , 'required'),
    location : z.string().min(1 , 'required'),
})
export type CompanyValidationType = z.infer<typeof companyValidation>