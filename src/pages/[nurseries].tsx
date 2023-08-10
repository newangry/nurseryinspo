import { 
    Box,
    Text,
    Flex,
    Image
 } from '@mantine/core';
import { getNursery, getNurseryNames } from './api/get_nurseries';
import { Nurseries } from '@/types/nurseries';

const ProductItem = (data: Nurseries) => {
    
    return(
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
                Phone number: {data.phone_number}
            </Text>
            {/* <Text mt={30} weight={400} sx={(theme) =>({
                fontSize: '1.3rem'
            })}>
                
            </Text> */}

            <Box mt={20}>
                <Image src='/item.jpg' alt='product_item'/>
            </Box>
        </Box>
    )
}

interface Pathpros {
    nurseries: string
}

export const getStaticProps = async (context:any) => {
    
    const nursery_info = await getNursery(Number(context.params.nurseries));
    return {
        props: nursery_info
    };
};
export const getStaticPaths = async () => {

    const nurseries = await getNurseryNames();
    let paths: {
        params: Pathpros
    }[] = [];

    nurseries.map((item) => {
        paths.push({
            params: {nurseries: item.id.toString()}
        })
    })

    return {
        paths,
        fallback: false,
    };
}


export default ProductItem;