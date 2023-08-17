// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const search = req.body.search;
    const type = req.body.type;

    try{

        let nurseries_data: any = [];
        if(type == "admin"){
            nurseries_data = await supabaseAdmin.from('nurseries')
                        .select("*")
                        // .ilike("name | email | phone_number | location | zip_code", `%${search}%`)
                        // .or(`name.ilike.%${search}%, description.ilike.%${search}%, email.ilike.%${search}%`)
                        .eq('tag', search);
        } else {
            nurseries_data = await supabaseAdmin.from('nurseries')
                        .select("*")    
                        // .ilike("name | email | phone_number | location | zip_code", `%${search}%`)
                        // .or(`name.ilike.%${search}%, description.ilike.%${search}%, email.ilike.%${search}%`)
                        .eq('tag', search)
                        .eq('status', true);   
        }
        
        if(!nurseries_data.error){
            for(let k = 0; k<nurseries_data.data.length; k++){
                const images: string[] = [];
                const image_data = await supabaseAdmin.from('nursery_images').select("*").eq("nurseries_id", nurseries_data.data[k].id);
                if(image_data.data) {
                    image_data.data.map((item) => {
                        images.push(item.image);
                    })
                }
                nurseries_data.data[k].images = images;
            }
            res.status(200).json(nurseries_data.data)
        } else{
            res.status(201).json([])
        }   
    } catch(e){
        console.log(e);
        res.status(202).json([])
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
