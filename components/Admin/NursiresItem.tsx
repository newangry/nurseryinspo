import { Nurseries } from '@/types/nurseries';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { FC, useState } from 'react';
import EditModal from './EditModal';

interface Props {
    data: Nurseries,
    open: () => void,
    saveData: (data: Nurseries) => void;
}

const Nursires: FC<Props> = ({ data, open, saveData }) => {
    
    const { hovered, ref } = useHover();

    return (
        <Card
            shadow="sm"
            padding="lg" radius="md"
            withBorder
            sx={(theme) => ({
                cursor: 'pointer',
                opacity: hovered ? 0.7 : 1
            })}
            ref={ref}
            onClick={()=>{open(); saveData(data)}}
        >
            <Card.Section component="a">
                <Image
                    src={data.image}
                    height={200}
                    alt="Norway"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500} align='center'>{data.name}</Text>
            </Group>

            <Text size="sm" color="dimmed">
                {data.description}
            </Text>
        </Card>
    )
}

export default Nursires;