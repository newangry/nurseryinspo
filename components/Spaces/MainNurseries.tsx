import { Nurseries } from '@/types/nurseries';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
    data: Nurseries
    index: number
}

const MainNurseries:FC<Props> = ( {data, index} ) => {
    
    const { hovered, ref } = useHover();
    
    let rotate = 0;
    if(index == 0){
        rotate = -7;
    } else if(index == 1) {
        rotate =2;
    } else if(index == 2) {
        rotate = -7;
    }
    
    return (
        <Card 
            shadow="sm" 
            padding="lg" radius="md" 
            withBorder 
            sx={(theme)=>({
                cursor: 'pointer',
                opacity: hovered?0.7:1,
                rotate: `${rotate}deg`
            })}
            ref={ref}
        >
            <Link href={`/${data.id}`}>
            <Card.Section component="a">
                <Image
                    src={data.image}
                    height={200}
                    alt="Norway"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500} align='center' size='2rem'  sx={(theme) =>({
                fontFamily: 'Caveat, sans-serif'
            })}>{data.name}</Text>
            </Group>

            <Text size="lg" color="dimmed" sx={(theme) =>({
                fontFamily: 'Caveat, sans-serif'
            })}>
               {data.description}
            </Text>
            </Link>
        </Card>
    )
}

export default MainNurseries;