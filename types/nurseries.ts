export interface Nurseries{
    name: string,
    description: string,
    image: string,
    location: string,
    id?:number,
    phone_number: string,
    zip_code: string,
    email: string
}

export const NurseriesState = {
    name: '',
    description: '',
    image: '',
    location: '',
    phone_number: '',
    zip_code: '',
    email: ''
}