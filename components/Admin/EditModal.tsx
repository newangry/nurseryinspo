import { Item, Nurseries } from "@/types/nurseries";
import { Flex, Modal, TextInput, Textarea, Text, Button, Box, Image, Group, List, Select } from "@mantine/core";
import { FC, useEffect, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { IconCheck, IconPhoto, IconTrash } from "@tabler/icons-react";
import { useForm } from '@mantine/form';

interface Props {
    open: () => void,
    opened: boolean,
    data: Nurseries,
    type: string,
    saveData: (data: Nurseries, images: string[], items: Item[]) => void
    deleteNursery: () =>void
    setStatus: (status: boolean, nursires_id: number)=>void
}

const EditModal: FC<Props> = ({
    opened,
    open,
    data,
    type,
    saveData,
    deleteNursery,
    setStatus
}) => {

    const [ images, setImages] = useState<string[] | undefined>([]);
    const [items, setItems] = useState<Item[]>([]);

    const itemForm = useForm({
        initialValues: {
            name: '',
            price: "0",
            url:''
        },
        validate: {

        },
    });

    const form = useForm({
        initialValues: {
            name: data.name,
            person_name: data.person_name,
            description: data.description,
            image: data.image,
            email: data.email,
            room_width: data.room_width,
            room_height: data.room_height,
            tag:  data.tag
        },
        validate: {

        },
    });

    useEffect(() => {
        if(type != "edit"){
            setImages([]);
        }
    }, [type])

    const convertToBase64 = async(files: File[]) => {
        const _images:any = [];
        for(let k=0; k<files.length; k++){
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

    const removeItem = (index: number) => {
        
        let p_i = JSON.parse(JSON.stringify(items));
        p_i.splice(index, 1);
        setItems(p_i);
        
    }
    const handleSave = () => {
        if(images){
            saveData(form.values, images, items);
        }
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

    useEffect(() => {
        form.setFieldValue('name', data.name);
        form.setFieldValue('person_name', data.person_name)
        form.setFieldValue('description', data.description)
        form.setFieldValue('image', data.image)
        form.setFieldValue('email', data.email)
        form.setFieldValue('id', data.id)
        form.setFieldValue('room_width', data.room_width)
        form.setFieldValue('room_height', data.room_height)
        form.setFieldValue('tag', data.tag)

        
        setItems(data.items);
        setImages(data.images);

    }, [data, opened])

    return (
        <Modal
            size='lg'
            opened={opened}
            onClose={open}
            title={type == 'edit' ? 'Edit' : 'Create'}
        >
            <Flex
                gap={15}
                direction="column"
            >

                <TextInput
                    placeholder=""
                    label="Nursery name"
                    withAsterisk
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                />
                <TextInput
                    placeholder=""
                    label="Person name"
                    value={form.values.person_name}
                    withAsterisk
                    onChange={(event) => form.setFieldValue('person_name', event.currentTarget.value)}
                />
                
                <Textarea
                    placeholder=""
                    label="Description"
                    value={form.values.description}
                    withAsterisk
                    onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                />
                
                <Flex
                    gap={10}
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
                </Flex>
                <Select
                    label="Tags"
                    data={[
                        { value: 'girls', label: 'nursery for boy' },
                        { value: 'boy', label: 'nursery for girls' },
                        { value: 'neutral', label: 'gender neutral nursery' },
                    ]}
                    onChange={(value) =>{ form.setFieldValue('tag', value??'')}}
                />
                
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

                {
                    images?.length !=0 ?
                    <Box>
                        <Text color="red" sx={(theme) =>({
                            borderBottom: '1px solid red',
                            cursor: 'pointer',
                            textAlign: 'right'
                        })}
                            onClick={() => {setImages([])}}
                        >Remove image</Text>
                        {
                            images?.map((item, key) =>
                                <Image src={item} alt='' key={key} mt={10}/>        
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
                    {
                        type == "edit"?
                            data.status?
                            <Button variant="outline" onClick={() =>{setStatus(false, data?.id??0)}}>Disable</Button>:
                            <Button variant="outline" onClick={() =>{setStatus(true,  data?.id??0)}}>Enable</Button>
                            :<></>
                    }
                    
                    <Button variant="outline" onClick={() => { handleSave() }}>Save</Button>
                    {
                        type == 'edit'?
                        <Button variant="outline" color="red" onClick={() => {deleteNursery()}}>Delete</Button>
                        :<></>
                    }
                </Flex>
            </Flex>

        </Modal>
    )
}

export default EditModal;