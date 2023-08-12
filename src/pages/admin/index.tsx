import {
    Box,
    Text,
    Input,
    Group,
    Button,
    Grid,
    Loader
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import NurseriesItem from '@/components/Spaces/Nurseries';
import { useEffect, useState } from 'react';
import { Nurseries, NurseriesState } from '@/types/nurseries';
import { IconPlus } from '@tabler/icons-react';
import Nursires from '@/components/Admin/NursiresItem';
import EditModal from '@/components/Admin/EditModal';

const Spaces = () => {

    useEffect(() => {
        getData();
    }, [])

    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [nurseries, setNurseries] = useState<Nurseries[]>([]);
    const [data, setData] = useState<Nurseries>(NurseriesState);
    const [search, setSearch] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [type, setType] = useState<string>('edit');

    const getData = async () => {
        setIsLoad(true);
        try {
            const res = await fetch('/api/get_nurseries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ search: search })
            });
            if (res.status != 200) {
            } else {

            }
            const data = await res.json();
            let count = 3;
            if (data.length < 3) {
                count = data.length;
            }

            setNurseries(data);
        } catch (e) {
            console.log(e);
        }
        setIsLoad(false);
    }

    const saveData = async(_data: Nurseries) => {
        setOpen(false);
        setIsLoad(true);
        
        try {
            const params = {
                type,
                data:_data
            }
            const res = await fetch('/api/admin/add_nurseries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });
            getData();
            notifications.show({
                title: 'Send ',
                message: 'Success',
                color: 'default'
            })
        } catch (e) {
            console.log(e);
        }
        setIsLoad(false);
    }

    const addNew = () => {
        setType('new');
        setData(NurseriesState);
        setOpen(true);
    }
    
    const deleteNursery = async() => {
        alert();
        setIsLoad(true);
        setOpen(false);
        const res = await fetch('/api/admin/delete_nurseries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: data.id})
        });
        getData();
        if(res.status == 200){
            notifications.show({
                title: 'Delete',
                message: 'Success',
                color: 'default'
            })
        } else {
            notifications.show({
                title: 'Delete ',
                message: 'Error',
                color: 'red'
            })
        }
        setIsLoad(false);
        
    }

    return (
        <Box>
            <Box
                className='text-center mt-[40px]'
                sx={(theme) => ({
                    color: theme.colors.gray[6]
                })}
            >
                <Group spacing='xs'>
                    <Input
                        value={search}
                        onChange={(event) => {
                            setSearch(event.target.value)
                        }}
                        onKeyUp={(event) => {
                            if (event.keyCode == 13) {
                                getData();
                            }
                        }}
                        placeholder='Search baby nurseries'
                    />
                    <Button variant='outline' onClick={() => { getData() }}>
                        {
                            isLoad ? <Loader variant='dots' /> : 'Search'
                        }
                    </Button>
                    <Button variant='outline' onClick={() => { addNew() }}>
                        <IconPlus />Add new nursery
                    </Button>
                </Group>
            </Box>
           
            {
                nurseries.length == 0?<Text align='center' size='lg' mt={20}> No Data </Text>:
                <Grid className='mt-[20px]' >
                    {
                        nurseries.map((item, key) =>
                            <Grid.Col md={6} lg={4} sm={1} key={key}>
                                <Nursires 
                                    data={item} open={() => { setOpen(p_o => (!p_o)); setType('edit')}}
                                    saveData={(data: Nurseries) => {setData(data)}}
                                />
                            </Grid.Col>
                        )
                    }
                </Grid>
            }
            <EditModal 
                opened={open}
                open={() => { setOpen(p_o => (!p_o)) }}
                data={data}
                type={type}
                saveData={saveData}
                deleteNursery={deleteNursery}
            />
        </Box>
    )
}

export default Spaces;