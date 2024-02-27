import {getCompany, getLedger} from "@/pocketbase/users";
import Box from "@/components/box";
import LedgerList from "@/components/lists/ledger-list";
const Ledger = async ({params} : {params : {id : string}}) =>{
    console.log(params.id)
    let company
    let dataLedger
    try {
        dataLedger = await getLedger(params.id || '')
        company = await getCompany(params.id)
    }catch (e){
        console.log(e)
        throw new Error('error !')
    }
    
    return(
        <div className={'w-full px-36 py-10'}>
            <p className={'text-lg font-medium flex items-center gap-3'}>
                Ledger Of <span className={'text-primary-700'}>{company.name}</span>
            </p>
            <div className={'w-full flex items-center justify-between mt-6'}>
                <Box title={'Total Credits'}
                     price={dataLedger.items?.map(item => item.credit)?.reduce((a: number, b: number) => a + b ,  0)}/>
                <Box title={'Total Debits'}
                     price={dataLedger.items?.map(item => item.debit)?.reduce((a: number, b: number) => a + b  , 0) }/>
                <Box title={'Total Subtract'}
                     price={dataLedger.items?.map(item => item.credit)?.reduce((a: number, b: number) => a + b  , 0) - dataLedger.items.map(item => item.debit).reduce((a: number, b: number) => a + b , 0)}
                     finall={true}/>
            </div>
            <LedgerList ledger={dataLedger} companyId={params.id} isAdmine={true}/>
        </div>
    )
}
export default Ledger