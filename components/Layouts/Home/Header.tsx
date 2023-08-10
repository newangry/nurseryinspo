import { 
    Box, 
    Button, 
    Flex,
    Text,
    UnstyledButton
} from "@mantine/core";
import { useState, useContext, useEffect } from 'react';
import Auth from '@/components/Auth/Drawer';
import HomeContext from '@/state/index.context';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from "next/router";
const HomeHeader = () => {
    
    const [openedAuth, setOpenedAuth] = useState<boolean>(false);
    const user = useUser();
    const router = useRouter();

    const {
        state: { colorScheme, lightMode },
        dispatch: homeDispatch,
    } = useContext(HomeContext);

    useEffect(() => {
        if(user){
            router.push('/main');
        }
    }, [user]);
    
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

                >
                    <UnstyledButton onClick={handleColorScheme} variant="outline">
                        {
                            colorScheme == "dark" ? <IconSun size={30} /> : <IconMoon size={30} />
                        }
                    </UnstyledButton>
                    <Button variant="outline" onClick={() => {setOpenedAuth(true)}} ml={10}>
                        Signin
                    </Button>
                </Flex>
            </Flex>
            <Auth opened={openedAuth} open={() => {setOpenedAuth(opened => (!opened))}}/>
        </Box>
    )
}   

export default HomeHeader;