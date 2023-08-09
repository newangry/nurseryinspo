import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import Link from 'next/link';

const MainProduct = () => {
    const { hovered, ref } = useHover();
    return (
        <Card 
            shadow="sm" 
            padding="lg" radius="md" 
            withBorder 
            sx={(theme)=>({
                cursor: 'pointer',
                opacity: hovered?0.7:1
            })}
            ref={ref}
        >
            <Link href='/test'>
            <Card.Section component="a">
                <Image
                    src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                    height={200}
                    alt="Norway"
                />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
                <Text weight={500} align='center'>Norway Fjord Adventures</Text>
            </Group>

            <Text size="sm" color="dimmed">
                With Fjord Tours you can explore more of the magical fjord landscapes with tours and
                activities on and around the fjords of Norway
            </Text>
            </Link>
        </Card>
    )
}

export default MainProduct;