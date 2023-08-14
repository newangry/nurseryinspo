// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Nurseries } from '@/types/nurseries';
import { supabaseAdmin } from '@/utils/server/supabase-admin';
import type { NextApiRequest, NextApiResponse } from 'next'

interface Response {
    data: Nurseries;
    images: string[]
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response | null>
  ) {

    const id = req.body.id;
    try{
        const { data, error } = await supabaseAdmin.from('nurseries').select("*").eq("id", id);
        const images_data = await supabaseAdmin.from('nursery_images').select("*").eq("nurseries_id", id);
        
        if(!error){
            const images:string[] = [];
            if(images_data.data){
                images_data.data.map((item) => {
                    images.push(item.image);
                })
            }
            
            res.status(200).json({data: data[0], images: images})
        } else{
            res.status(201).json(null);
        }   
    } catch(e){
        res.status(429).json(null);
    }
  }
  