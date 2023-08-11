import { MENUS } from '@/utils/app/consts';
import { NavLink, Box, Text } from '@mantine/core';
import HomeContext from '@/state/index.context';
import { useContext } from 'react';

const MyNavbar = () => {
    const {
        state: { colorScheme, lightMode },
        dispatch: homeDispatch,
    } = useContext(HomeContext);

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
        >
            {
                MENUS.map((item, key) =>
                    <NavLink label={<Text size={'lg'} >{item.name}</Text>} key={key}/>
                )
            }
            <NavLink label={<Text size={'lg'} >Twitter</Text>} />
            <NavLink label={<Text size={'lg'} >Instagram</Text>} />
            <NavLink label={<Text size={'lg'} onClick={() => {handleColorScheme()}}>
                {
                    colorScheme == "dark"? 'Light':'Dark'
                }
            </Text>} />

        </Box>
    )
}

export default MyNavbar;