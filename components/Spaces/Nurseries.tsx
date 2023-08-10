import { Nurseries } from '@/types/nurseries';
import { 
    Flex,
    Image,
    Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
    data: Nurseries
}

const NurseriesItem:FC<Props> = ({data}) => {
    const { hovered, ref } = useHover();
    return (
        <Link href={`/${data.id}`}>
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
                    {data.name}
                </Text>
            </Flex>
        </Link>
    )
}

export default NurseriesItem;