import {
    Box,
    Text,
    Flex,
    Image,
    Loader,
    Card,
    Button,
    Group,
    Input,
    List
} from '@mantine/core';

import { getNursery, getNurseryNames } from './api/get_nurseries';
import { Item, Nurseries } from '@/types/nurseries';
import { useRouter } from 'next/router';
import { NurseriesState } from '../../types/nurseries';
import { useState, useEffect } from 'react';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useMediaQuery } from "@mantine/hooks";

const ProductItem = () => {

    const router = useRouter();
    const { nurseries } = router.query;
    const [data, setData] = useState<Nurseries>(NurseriesState)
    const [isload, setIsLoad] = useState<boolean>(false);
    const [images, setImages] = useState<string[]>([]);
    const [email, setEmail] = useState<string>('');
    const [sendingMail, setSendingMail] = useState<boolean>(false);
    const isMobile = useMediaQuery(`(max-width: 760px)`);

    useEffect(() => {
        getData();
    }, [])

    const sendEmail = async () => {
        setSendingMail(true);
        try {
            const res = await fetch('/api/send_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email })
            });

            if (res.status == 200) {
                notifications.show({
                    title: 'Send your email',
                    message: 'Success',
                    color: 'default'
                })
                setEmail('');
            } else {
                const data = await res.json();
                notifications.show({
                    title: 'Send your email',
                    message: data.msg,
                    color: 'red',
                })
            }
        } catch (e) {

        }
        setSendingMail(false);

    }

    const getData = async () => {

        setIsLoad(true);
        try {
            const res = await fetch('/api/get_nurseries_item', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: nurseries }),
            })

            if (res.status == 200) {
                const _data = await res.json();
                setData(_data.data);
                setImages(_data.images);
            }
        } catch (e) {
            console.log(e);
        }

        setIsLoad(false);
    }

    return (
        isload || data.name == "" ? <Loader variant='dots' sx={(theme) => ({ margin: "auto" })} mt={20} /> :

            <Flex
                justify='space-around'
            >
                <Box
                    sx={(theme) => ({
                        width: isMobile?'100%':'68%'
                    })}
                >

                    <Flex

                        gap='sm'
                        direction='column'
                    >

                        <Text mt={15} sx={(theme) => ({
                            fontSize: '2rem',
                            color: theme.colors.gray[7]
                        })}>
                            {data.description}
                        </Text>
                        <Text mt={5} size='1.2rem' weight={400} sx={(theme) => ({
                            color: theme.colors.gray[7]
                        })}>
                            Email: {data.email}
                        </Text>
                        <Text mt={5} size='1.2rem' sx={(theme) => ({
                            color: theme.colors.gray[7]
                        })}>
                            Room size(m): {`${data.room_width} × ${data.room_height}`}
                        </Text>
                        <Text mt={5} size='1.2rem' sx={(theme) => ({
                            color: theme.colors.gray[7]
                        })}>
                            Tag: {data.tag}
                        </Text>
                    </Flex>
                    
                    <Text mt={20} size='1.5rem' weight={500}>
                        Nursery Rooms
                    </Text>
                    <Box>
                        {
                            images.map((image, key) =>
                                <Image src={image} alt='product_item' key={key} width='100%' mt={5} radius="sm" />
                            )
                        }
                    </Box>
                    <Text mt={15} size='1.5rem' weight='500'>
                        Items:
                    </Text>
                    <List withPadding
                        icon={
                            <IconCheck size='1rem' />
                        }
                        center
                        mt={10}
                    >
                        {
                            data.items.map((item: Item, key: number) =>
                                <List.Item key={key}>
                                    {
                                        item.url !== '' ?
                                            <a href={item.url} target="blank">
                                                <Text>
                                                    {item.name} (${item.price} )
                                                </Text>

                                            </a> :
                                            <Text>
                                                {item.name} (${item.price} )
                                            </Text>
                                    }
                                </List.Item>
                            )
                        }
                    </List>
                </Box>
                {
                    !isMobile?
                    <Box
                        p={10}
                        sx={(theme) => ({
                            position: 'sticky',
                            top: '100px',
                            width: '30%',
                            height: '150px'
                        })}
                    >
                        <Card shadow="sm" padding="lg" radius="md" withBorder>
                            <Text size="sm" color="dimmed">
                                Thanks for reading Workspaces! Subscribe below to receive new workspace in your inbox every Saturday and Sunday!
                            </Text>

                            <Group position="center" className='mt-[15px]' spacing='xs' grow>
                                <Input
                                    placeholder='you@example.com'
                                    value={email}
                                    onChange={(event) => { setEmail(event.target.value) }}
                                    type='email'
                                    onKeyUp={(event) => {
                                        if (event.keyCode == 13) {
                                            sendEmail()
                                        }
                                    }}
                                />
                                <Button variant='outline'>
                                    Subscribe for free
                                </Button>
                            </Group>
                        </Card>
                    </Box>:<></>
                }
                
            </Flex>
    )
}

interface Pathpros {
    nurseries: string
}

export default ProductItem;