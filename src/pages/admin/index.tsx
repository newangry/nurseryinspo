import {
    Box,
    Text,
    Group,
    Button,
    Grid,
    Loader,
    Select
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { Item, Nurseries, NurseriesState } from '@/types/nurseries';
import { IconPlus } from '@tabler/icons-react';
import Nursires from '@/components/Admin/NursiresItem';
import EditModal from '@/components/Admin/EditModal';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Spaces = () => {

    useEffect(() => {
        getData();
    }, [])

    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [nurseries, setNurseries] = useState<Nurseries[]>([]);
    const [data, setData] = useState<Nurseries>(NurseriesState);
    const [search, setSearch] = useState<string>('boy');
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
                body: JSON.stringify({ search: search, type: 'admin' })
            });
            if (res.status != 200) {

            } else {

            }

            const data = await res.json();
            setNurseries(data);

        } catch (e) {
            console.log(e);
        }
        setIsLoad(false);
    }

    const setStatus = async (status: boolean, nurseries_id: number) => {
        setOpen(false);
        setIsLoad(true);
        const res = await fetch('/api/admin/set_status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: status, id: nurseries_id })
        });
        if (res.status == 200) {
            notifications.show({
                title: 'Status',
                message: 'Success',
                color: 'default'
            })
            getData();
        } else {
            notifications.show({
                title: 'Status',
                message: 'Error',
                color: 'red'
            })
        }
        setIsLoad(false);
    }

    const saveData = async (_data: Nurseries, images: string[], items: Item[]) => {
        setOpen(false);
        setIsLoad(true);
        setData(NurseriesState);
        if (images.length > 0) {
            _data['image'] = images[0];
        }

        try {
            const params = {
                type,
                data: _data,
                items
            }
            const res = await fetch('/api/admin/add_nurseries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            let id = 0;
            const data = await res.json();
            for (let k = 0; k < images.length; k++) {
                const res = await fetch('/api/admin/add_nusery_images', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: images[k], nurseries_id: data.id })
                });
            }


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

    const deleteNursery = async () => {
        setIsLoad(true);
        setOpen(false);
        const res = await fetch('/api/admin/delete_nurseries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: data.id })
        });
        getData();
        if (res.status == 200) {
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
                    {/* <Input
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
                     */}
                    <Select
                        data={[
                            { value: 'boy', label: 'nursery for boy' },
                            { value: 'girls', label: 'nursery for girls' },
                            { value: 'neutral', label: 'gender neutral nursery' },
                            { value: 'small_room', label: 'small room' },
                            { value: 'middle_room', label: 'middle room' },
                            { value: 'big_room', label: 'big room' },
                        ]}
                        value='boy'

                        onChange={(value) => { if (value) setSearch(value) }}
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
                isLoad ? <Loader variant='dots' mt={10} sx={(theme) => ({ margin: 'auto' })} /> :
                    nurseries.length == 0 ? <Text align='center' size='lg' mt={20}>  </Text> :
                        
                        <ResponsiveMasonry
                            columnsCountBreakPoints={{ 350: 2, 500: 2, 750: 3, 900: 4 }}
                            style={{marginTop: '20px'}}
                        >
                            <Masonry>
                                {
                                    nurseries.map((item, key) =>
                                        <Nursires
                                            data={item} open={() => { setOpen(p_o => (!p_o)); setType('edit') }}
                                            saveData={(data: Nurseries) => { setData(data) }}
                                            key={key}
                                        />
                                    )
                                }
                            </Masonry>
                        </ResponsiveMasonry>
            }
            <EditModal
                opened={open}
                open={() => { setOpen(p_o => (!p_o)) }}
                data={data}
                type={type}
                saveData={saveData}
                deleteNursery={deleteNursery}
                setStatus={setStatus}
            />
        </Box>
    )
}

export default Spaces;