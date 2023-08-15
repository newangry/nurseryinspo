import { Item, Nurseries } from "@/types/nurseries";
import { Flex, TextInput, Textarea, Text, Button, Box, Image, Group, Select, List, Loader } from "@mantine/core";
import { FC, useEffect, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { IconCheck, IconCircleCheck, IconPhoto, IconTrash } from "@tabler/icons-react";
import { useForm } from '@mantine/form';
import Link from "next/link";
import { notifications } from '@mantine/notifications';

const Submit = ({

}) => {
    
    const [images, setImages] = useState<string[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [isLoad, setIsLoader] = useState<boolean>(false);

    const form = useForm({
        initialValues: {
            name: '',
            person_name: '',
            description: '',
            image: '',
            email: '',
            room_width: '',
            room_height: '',
            tag: ''
        },
        validate: {

        },
    });


    const itemForm = useForm({
        initialValues: {
            name: '',
            price: "0",
            url:''
        },
        validate: {

        },
    });

    useEffect(() => {
        setImages([]);
    }, [])

    const convertToBase64 = async (files: File[]) => {
        const _images: any = [];
        for (let k = 0; k < files.length; k++) {
            const file = files[k];
            const readAsDataURL = () => {
                return new Promise((resolve, reject) => {
                    const FR = new FileReader();

                    FR.addEventListener("load", function (evt) {
                        const event = evt as ProgressEvent<FileReader>; // Casting evt to ProgressEvent<FileReader>

                        if (event.target && typeof event.target.result === "string") { // Adding type check for result property
                            const target = event.target as FileReader & {
                                result: string; // Specify the correct type for result property
                            };

                            resolve(target.result);
                        } else {
                            reject(new Error("Invalid file format"));
                        }
                    });

                    FR.onerror = () => {
                        reject(new Error("Failed to read file"));
                    };

                    FR.readAsDataURL(file);
                });
            };
            try {
                const result = await readAsDataURL();
                _images.push(result);
            } catch (error) {
                console.error(error);
            }
        }
        setImages(_images);
    }

    const handleSave = async() => {
        setIsLoader(true);
        const data = form.values;
        if(images.length > 0){
            data['image'] = images[0];
        }

        try {

            const params = {
                type: 'create',
                data: data,
                items
            }

            const res = await fetch('/api/admin/add_nurseries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });

            let id=0;
            if(res.status == 200){
                const data = await res.json();
                for(let k =0; k<images.length; k++){
                    const res = await fetch('/api/admin/add_nusery_images', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({image: images[k], nurseries_id: data.id})
                    });
                }
            }

            notifications.show({
                title: 'Send ',
                message: 'Success',
                color: 'default'
            })
            inintValues();
        }catch(e){  
            console.log(e);
        }   
        setIsLoader(false);

    }

    const inintValues = () => {
        itemForm.setFieldValue("name", '');
        itemForm.setFieldValue("price", '0');
        itemForm.setFieldValue("url", '');
        form.setFieldValue('name', '');
        form.setFieldValue('person_name', '')
        form.setFieldValue('description', '')
        form.setFieldValue('image', '')
        form.setFieldValue('email', '')
        form.setFieldValue('id', '')
        form.setFieldValue('room_width', '')
        form.setFieldValue('room_height', '')
        form.setFieldValue('tag', '')
        setImages([]);
        setItems([]);

    }

    const addItem = () => {
        const p_i = JSON.parse(JSON.stringify(items));
        console.log(itemForm.values);
        p_i.push(itemForm.values);
        setItems(p_i);
        itemForm.setFieldValue("name", '');
        itemForm.setFieldValue("price", '0');
        itemForm.setFieldValue("url", '');

    }

    const removeItem = (index: number) => {
        
        let p_i = JSON.parse(JSON.stringify(items));
        p_i.splice(index, 1);
        setItems(p_i);
        
    }

    return (
        isLoad? <Loader variant='dots' mt={10} sx={(theme) =>({margin: 'auto'})}/> :
        <Flex
            gap={15}
            direction="column"
        >

            <TextInput
                placeholder=""
                label="Your name"
                value={form.values.person_name}
                withAsterisk
                onChange={(event) => form.setFieldValue('person_name', event.currentTarget.value)}
            />

            <TextInput
                placeholder=""
                label="Nursery name"
                withAsterisk
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
            />

            <Textarea
                placeholder=""
                label="Nursery Description"
                value={form.values.description}
                withAsterisk
                onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
            />
            <Select
                label="Tags"
                data={[
                    { value: 'girls', label: 'nursery for boy' },
                    { value: 'boy', label: 'nursery for girls' },
                    { value: 'neutral', label: 'gender neutral nursery' },
                ]}
                value={form.values.tag}
                onChange={(value) => {form.setFieldValue('tag', value??'')}}
            />
            <Group
                grow
            >
                <TextInput
                    placeholder=""
                    label="Email"
                    type="email"
                    value={form.values.email}
                    withAsterisk
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                />
                <TextInput
                    placeholder=""
                    label="Room width(m)"
                    value={form.values.room_width}
                    withAsterisk
                    type='number'
                    onChange={(event) => form.setFieldValue('room_width', event.currentTarget.value)}
                />
                <TextInput
                    placeholder=""
                    label="Room height(m)"
                    value={form.values.room_height}
                    withAsterisk
                    type='number'
                    onChange={(event) => form.setFieldValue('room_height', event.currentTarget.value)}
                />
            </Group>
            <Box>
                <Text mt={10} weight={500}>
                    Items
                </Text>
                
                {
                    items.length == 0?
                    <Text mt={10} ta='center'>No added items</Text>:
                    <List withPadding 
                        icon={
                            <IconCheck size='1rem'/>
                        }
                        center
                        mt={10}
                    >
                        {
                            items.map((item, key) => 
                                <List.Item key={key}>
                                    <Group>
                                    {
                                        item.url !== ''?
                                        <a href={item.url} target="blank">
                                            <Text>
                                                {item.name} (${item.price} )
                                            </Text>
                                            
                                        </a>:
                                        <Text>
                                            {item.name} (${item.price} )
                                        </Text>
                                    }
                                    <IconTrash size={'1rem'} className="cursor-pointer" onClick={() => {removeItem(key)}}/>
                                    </Group>
                                </List.Item>
                            )
                        }
                    </List>
                }
                <Group
                        grow
                    >
                    <TextInput
                        placeholder=""
                        label="Name"
                        value={itemForm.values.name}
                        withAsterisk
                        onChange={(event) => itemForm.setFieldValue('name', event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder=""
                        label="Price($)"
                        value={itemForm.values.price}
                        type='number'
                        onChange={(event) => itemForm.setFieldValue('price', event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder=""
                        label="Url"
                        value={itemForm.values.url}
                        onChange={(event) => itemForm.setFieldValue('url', event.currentTarget.value)}
                    />
                    <Button variant="outline" mt={22} onClick={() => {addItem()}}> Add Item</Button>
                </Group>
            </Box>
            
            {
                images?.length != 0 ?
                    <Box>
                        <Text color="red" sx={(theme) => ({
                            borderBottom: '1px solid red',
                            cursor: 'pointer',
                            textAlign: 'right'
                        })}
                            onClick={() => { setImages([]) }}
                        >Remove image</Text>
                        {
                            images?.map((item, key) =>
                            
                                <Image src={item} alt='' key={key} mt={10} />
                            )
                        }
                    </Box> :
                    <Dropzone
                        accept={{
                            'image/*': [], // All images
                            'text/html': ['.png', '.jpg'],
                        }}
                        onDrop={(files) => { convertToBase64(files) }}
                    >
                        <Flex
                            justify='center'
                            align='center'
                            h={200}
                        >
                            <Box>
                                <Dropzone.Idle>
                                    <IconPhoto size="3.2rem" stroke={1.5} color="#666666" />
                                </Dropzone.Idle>
                                <Text size="xl" inline>
                                    Drage a image here or click to select file ( jpg )
                                </Text>
                            </Box>
                        </Flex>
                    </Dropzone>
            }
            <Flex
                justify='flex-end'
                align='center'
                gap='md'
            >
                <Button variant="outline" onClick={() => { handleSave() }}>Save</Button>
            </Flex>
        </Flex>
    )
}

export default Submit;