export default interface IPersistStorage{
    getValue() : string | null,
    setValue(value : string) : void  
} 