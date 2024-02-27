const Box = ({title , price , finall} : {title : string , price : number , finall? : boolean }) =>{
    return(
        <div className={`w-72  rounded-lg ${finall && price > 0 ? 'bg-success bg-opacity-30 border-success' : price < 0 ? 'bg-danger bg-opacity-30 border-danger' : 'bg-gray-200 border-gray-300'  } border  p-6`}>
            <p className={'font-medium text-lg text-black'}>{title}</p>
            <p className={'font-medium text-lg mt-3 text-black'}>{price} $</p>
        </div>
    )
}
export default Box