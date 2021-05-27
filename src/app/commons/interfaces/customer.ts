export interface Customer {
    id?              :string;
    name?            : string;
    phone?           : string;
    gender?          : string;
    subscription?    : {
        periodicity? : string;
        service?     : string;
        amount?      : number;
    }
    schedule?        : string;
    createDate?      : Date;
    user?            : any;
    status?          : string;
}
