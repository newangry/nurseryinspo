export interface Nurseries{
    name: string,
    description: string,
    image: string,
    id?:number,
    email: string,
    person_name: string,
    room_width: string,
    room_height: string,
    images?:string[] | undefined
    items?:any,
    status?: boolean,
    tag: string
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
    images:[],
    items: [],
    status: false,
    tag: ''

}

export interface Item {
    name: string,
    price: string,
    url: string
}