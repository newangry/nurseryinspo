import { MENUS } from '@/utils/app/consts';
import { 
    Box,
    Flex,
    Text,
    Grid
} from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
    isMobile: boolean
}
const MyFooter:FC<Props> = ({isMobile}) => {
    return (
        <Box 
            pt={15}
            pb={15}
            sx={(theme) =>({
                borderTop: `1px solid ${theme.colors.gray[6]}`
            })}
        >
            <Grid
                sx={(theme) => ({
                    maxWidth: '80rem',
                    margin: 'auto'
                })}
            >
                <Grid.Col md={4} lg={4} sm={1}>
                    <Flex
                            justify="center"
                            align="center"
                            direction="row"
                            wrap="wrap"
                            gap="xl"
                            
                        >
                        {
                            MENUS.map((item, key) => 
                                <Link  key={key} href={item.path}>
                                    <Box sx={(theme)=>({
                                        cursor: 'pointer',
                                    })}>
                                        <Text
                                        sx={(theme) => ({
                                            color: theme.colors.gray[6]
                                        })}
                                        >{item.name}</Text>
                                    </Box>
                                </Link>
                                    
                            )
                        }
                    </Flex>
                </Grid.Col>
                <Grid.Col md={4} lg={4} sm={1}>
                    <Text align='center' sx={(theme) =>({
                        color: theme.colors.gray[6]
                    })}>
                        PUBLISHED BY
                    </Text>
                </Grid.Col>
                <Grid.Col md={4} lg={4} sm={1}>
                    <Text 
                    sx={(theme) =>({
                        color: theme.colors.gray[6]
                    })} align='center'>
                        © 2023 Workspaces, All rights reserved.
                    </Text>    
                </Grid.Col>
            </Grid>
        </Box>
    )
}

export default MyFooter;