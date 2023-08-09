import { 
    Flex,
    Image,
    Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Link from 'next/link';
const Product = () => {
    const { hovered, ref } = useHover();
    return (
        <Link href='/test'>
            <Flex
                mt={40}
                gap="md"
                justify="flex-start"
                align="flex-start"
                direction="column"
                wrap="wrap"
                sx={(theme)=>({
                    cursor: 'pointer'
                })}
                ref={ref}
            >
                <Image src='/product.png' alt='product' radius={10} sx={(theme)=>({
                    opacity: hovered?0.7:1
                })}/>
                <Text
                    sx={(theme) =>({
                        color: theme.colors.gray[7]
                    })}
                    weight={700}
                    size='xl'
                >
                    334 - Gem Zape
                </Text>
            </Flex>
        </Link>
    )
}

export default Product;