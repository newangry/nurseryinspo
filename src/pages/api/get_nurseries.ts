// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const search = req.body.search;
    try{
        const { data, error } = await supabaseAdmin.from('nurseries')
                        .select("*")
                        // .ilike("name | email | phone_number | location | zip_code", `%${search}%`)
                        .or(`name.ilike.%${search}%, description.ilike.%${search}%, email.ilike.%${search}%, phone_number.ilike.%${search}%, location.ilike.%${search}%, zip_code.ilike.%${search}%`)
        if(!error){
            for(let k = 0; k<data.length; k++){
                const images: string[] = [];
                const image_data = await supabaseAdmin.from('nursery_images').select("*").eq("nurseries_id", data[k].id);
                if(image_data.data) {
                    image_data.data.map((item) => {
                        images.push(item.image);
                    })
                }
                data[k].images = images;
            }
            res.status(200).json(data)
        } else{
            res.status(429).json([])
        }   
    } catch(e){
        res.status(429).json([])
    }
}

export  async function getNurseryNames() {
    try{
        const { data, error } = await supabaseAdmin.from('nurseries').select("*");
        if(!error){
            return data;
        } else{
            return [];
        }   
    } catch(e){
        return[]
    }
}

export async function getNursery(id: number) {
    try{
        const { data, error } = await supabaseAdmin.from('nurseries').select("*").eq("id", 5);
        if(!error){
            return data[0];
        } else{
            return [];
        }   
    } catch(e){
        return[]
    }
}
