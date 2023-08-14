import { Nurseries } from "@/types/nurseries";
import { Flex, Modal, TextInput, Textarea, Text, Button, Box, Image } from "@mantine/core";
import { FC, useEffect, useState } from 'react';
import { Dropzone } from '@mantine/dropzone';
import { IconPhoto } from "@tabler/icons-react";
import { useForm } from '@mantine/form';

interface Props {
    open: () => void,
    opened: boolean,
    data: Nurseries,
    type: string,
    saveData: (data: Nurseries, images: string[]) => void
    deleteNursery: () =>void
}

const EditModal: FC<Props> = ({
    opened,
    open,
    data,
    type,
    saveData,
    deleteNursery
}) => {

    const [ images, setImages] = useState<string[] | undefined>([]);

    const form = useForm({
        initialValues: {
            name: data.name,
            person_name: data.person_name,
            description: data.description,
            location: data.location,
            zip_code: data.zip_code,
            phone_number: data.phone_number,
            image: data.image,
            email: data.email,
            room_width: data.room_width,
            room_height: data.room_height
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

    const handleSave = () => {
        if(images){
            saveData(form.values, images);
        }
    }

    useEffect(() => {
        form.setFieldValue('name', data.name);
        form.setFieldValue('person_name', data.person_name)
        form.setFieldValue('description', data.description)
        form.setFieldValue('location', data.location)
        form.setFieldValue('zip_code', data.zip_code)
        form.setFieldValue('phone_number', data.phone_number)
        form.setFieldValue('image', data.image)
        form.setFieldValue('email', data.email)
        form.setFieldValue('id', data.id)
        form.setFieldValue('room_width', data.room_width)
        form.setFieldValue('room_height', data.room_height)
        setImages(data.images);

    }, [data])

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
                <Flex
                    gap={10}
                >
                    <TextInput
                        placeholder=""
                        label="Location"
                        value={form.values.location}
                        withAsterisk
                        onChange={(event) => form.setFieldValue('location', event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder=""
                        label="Phone number"
                        value={form.values.phone_number}
                        withAsterisk
                        onChange={(event) => form.setFieldValue('phone_number', event.currentTarget.value)}
                    />
                    <TextInput
                        placeholder=""
                        label="Zip cide"
                        value={form.values.zip_code}
                        withAsterisk
                        onChange={(event) => form.setFieldValue('zip_code', event.currentTarget.value)}
                    />
                </Flex>

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