import { 
    Box,
    Text,
    Flex,
    Image,
    Loader
 } from '@mantine/core';
import { getNursery, getNurseryNames } from './api/get_nurseries';
import { Nurseries } from '@/types/nurseries';
import { useRouter } from 'next/router';
import { NurseriesState } from '../../types/nurseries';
import { useState, useEffect } from 'react';

const ProductItem = () => {
    
    const router = useRouter();
    const { nurseries } = router.query;
    const [ data, setData ] = useState<Nurseries>(NurseriesState) 
    const [ isload, setIsLoad] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, [])

    const getData = async() => {
        
        setIsLoad(true);
        try{
            const res = await fetch('/api/get_nurseries_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: nurseries}),
            })
    
            if(res.status == 200){
                const _data = await res.json();
                setData(_data);
            }
        }catch(e){
            console.log(e);
        }
        
        setIsLoad(false);
    }

    return(
        isload || data.name == ""?<Loader variant='dots' sx={(theme) =>({margin: "auto"})} mt={20}/>:
        <Box
        >
            <Text weight={400} sx={(theme) =>({
                fontSize: '1.7rem'
            })}>
                {data.name}
            </Text>
            <Text mt={15}>
                {data.description}
            </Text>
            <Text mt={15}>
                Location: {data.location}
            </Text>
            <Text mt={5}>
                Person name: {data.person_name}
            </Text>
            <Text mt={5}>
                Email: {data.phone_number}
            </Text>
            <Text mt={5}>
                Phone number: {data.phone_number}
            </Text>
            <Text mt={5}>
                Room size(m): {`${data.room_width} × ${data.room_height}`}
            </Text>
            <Box mt={20}>
                <Image src={data.image} alt='product_item'/>
            </Box>

        </Box>
    )
}

interface Pathpros {
    nurseries: string
}

// export const getStaticProps = async (context:any) => {
    
//     const nursery_info = await getNursery(Number(context.params.nurseries));
//     return {
//         props: nursery_info
//     };
// };
// export const getStaticPaths = async () => {

//     const nurseries = await getNurseryNames();
//     let paths: {
//         params: Pathpros
//     }[] = [];

//     nurseries.map((item) => {
//         paths.push({
//             params: {nurseries: item.id.toString()}
//         })
//     })

//     return {
//         paths,
//         fallback: false,
//     };
// }


export default ProductItem;