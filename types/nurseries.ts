export interface Nurseries{
    name: string,
    description: string,
    image: string,
    location: string,
    id?:number,
    phone_number: string,
    zip_code: string,
    email: string,
    person_name: string,
    room_width: string,
    room_height: string,
    images?:string[] | undefined
}

export const NurseriesState = {
    name: '',
    description: '',
    image: '',
    location: '',
    phone_number: '',
    zip_code: '',
    email: '',
    person_name:'',
    room_width: "0",
    room_height: '0',
    images:[]
}