import { 
    Box, 
    Menu, 
    Flex,
    Text,
    UnstyledButton,
    Avatar
} from "@mantine/core";
import { useState, useContext, useEffect } from 'react';
import HomeContext from '@/state/index.context';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';

const HomeHeader = () => {
    
    const [openedAuth, setOpenedAuth] = useState<boolean>(false);
    const user = useUser();
    const router = useRouter();
    const {
        state: { colorScheme, lightMode },
        dispatch: homeDispatch,
    } = useContext(HomeContext);    

    const initialName = (full_name: any) => {
        if(full_name) {
            const split = full_name.split(" ");
            let initial_name = "";
            if(split.length > 1) {
                initial_name = split[0].substr(0, 1)+split[1].substr(0, 1);
            } else {
                initial_name = split[0].substr(0, 1);
            }
            return initial_name;
        } else {
            return "";
        }
    }
    const handleColorScheme = () => {
        homeDispatch({
            field: "colorScheme",
            value: colorScheme == 'dark' ? 'light' : 'dark'
        });
        homeDispatch({
            field: "lightMode",
            value: lightMode == 'dark' ? 'light' : 'dark'
        });
        localStorage.setItem("colorScheme", colorScheme == 'dark' ? 'light' : 'dark');
    }

    return (
        <Box
            sx={(theme) =>({
                width: '100%'
            })}
        >
            <Flex
                justify="space-between"
                align="center"
                direction="row"
                gap="md"
            >
                <Text>
                    Chatbot
                </Text>
                <Flex
                    align="center"
                    gap={'md'}
                >
                    <UnstyledButton onClick={handleColorScheme} variant="outline">
                        {
                            colorScheme == "dark" ? <IconSun size={25} /> : <IconMoon size={25} />
                        }
                    </UnstyledButton>
                    <Menu shadow="md" width={200}>
                        <Menu.Target>
                            <Avatar color="cyan" radius="xl">{
                               initialName(user? user.user_metadata.full_name:'')
                            }</Avatar>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>
                                {user?.user_metadata.full_name??''}
                            </Menu.Label>
                            <Menu.Divider />
                            {/* <Menu.Item >Transfer my data</Menu.Item> */}
                            <Menu.Item >Singout</Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}   

export default HomeHeader;