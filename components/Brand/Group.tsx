import { Brands } from "@/types/brands";
import { 
    Box,
    Grid,
    Text,
    Card,
    Button
 } from "@mantine/core";
import { FC, useState } from 'react';
import BrandModal from "./BrandModal";

interface Props {
    brands: Brands[] | undefined,
    createBrand: (name: string, description: string) => void,
    setBrandId: ( brand_id: string ) => void
}

const BrandGroup:FC<Props> = ({brands, createBrand, setBrandId}) => {

    const [opened, setOpened] = useState<boolean>(false);

    return (
        <Box>
            <Button variant="outline" onClick={() => {setOpened(true)}}>
                Create a Brand
            </Button>
            <Grid mt={20}>
                {
                    brands?.map((item, key) => 
                        <Grid.Col md={3} lg={4} sm={1} key={key} onClick={() =>{setBrandId(item.id)}}>
                            <Card
                                shadow="sm"
                                padding="xl"
                                component="a"
                                onClick={() => {}}
                                sx={(theme) => ({
                                    cursor: 'pointer'
                                })}
                            >
                                    <Text weight={500} size="lg" mt="md">
                                        {item.name}
                                    </Text>
                                    <Text mt="xs" color="dimmed" size="sm">
                                        {item.description}
                                    </Text>
                            </Card>
                        </Grid.Col>
                    )   
                }
                
            </Grid>
            <BrandModal 
                opened={opened}
                open={() => { setOpened(p_o => !p_o) }}
                createBrand={createBrand}
            />
        </Box>
    )
}

export default BrandGroup;