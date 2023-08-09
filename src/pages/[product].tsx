import { 
    Box,
    Text,
    Flex,
    Image
 } from '@mantine/core';

const ProductItem = () => {
    return(
        <Flex
            gap="md"
            justify="flex-start"
            align="flex-start"
            direction="row"
        >
            <Box
                sx={(theme) =>({
                    width: '75%'
                })}
            >
                <Text weight={400} sx={(theme) =>({
                    fontSize: '1.7rem'
                })}>
                    288-Mandy Thao
                </Text>
                <Text>
                    Description
                </Text>
                <Text mt={30} weight={400} sx={(theme) =>({
                    fontSize: '1.3rem'
                })}>
                    Inside Mandy's Workspace
                </Text>
                <Box>
                    <Image src='/item.jpg' alt='product_item'/>
                </Box>
            </Box>
            <Box sx={(theme) => ({
                width: '20%',
            })}>
                <Box sx={(theme) => ({
                    position: 'sticky',
                    top: '20px'
                })}>
                    test
                </Box>
            </Box>
        </Flex>
    )
}

interface Pathpros {
    product: string
}

export const getStaticProps = async ({ params }) => {

    return {
        props: {
            content: ''
        }
    };
};
export const getStaticPaths = async () => {

    let paths: {
        params: Pathpros
    }[] = [];

    paths.push({params: {product: "test"}});
    
    return {
        paths,
        fallback: false,
    };
}


export default ProductItem;