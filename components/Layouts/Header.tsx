import { 
    Box,
    Flex,
    Image,
    Text,
    UnstyledButton,
    Burger
} from '@mantine/core';
import { IconBrandTwitter, IconBrandInstagram, IconSun, IconMoon } from '@tabler/icons-react';
import { FC, useContext, useEffect, useState } from 'react';
import HomeContext from '@/state/index.context';
import Link from 'next/link';
import { MENUS } from '@/utils/app/consts';
interface Props {
    isMobile: boolean,
    openNav: () => void,
    openedNav: boolean
}
const MyHeader:FC<Props> = ({isMobile, openNav, openedNav}) => {
    const [path, setPath] = useState<string>('');

    
    
    useEffect(()=>{
        setPath(window.location.pathname);
    }, [])
    
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
            sx={(theme) =>({
                width: '100%',
            })}        
        >
            <Flex
                justify="space-between"
                align="center"
                direction="row"
                wrap="wrap"
                sx={(theme) =>({
                    width: '100%'
                })}    
            >
                <Box sx={(theme) =>({
                    width: '40px',
                    height: '40px'
                })}>
                    <Link href='/'><Image src='./logo.png' alt="logo" /></Link>
                </Box>
                {
                    isMobile&&
                    <Burger
                        opened={openedNav}
                        onClick={() => {openNav()}}
                        size="sm"
                        mr="xl"
                        sx={(theme)=>({
                            color: theme.colors.gray[6]
                        })}
                    />
                }
                {
                    !isMobile&&
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
                                            color: path.indexOf(item.path) > -1? theme.colors.gray[7]:theme.colors.gray[6]
                                        })}
                                        >{item.name}</Text>
                                    </Box>
                                </Link>
                                    
                            )
                        }
                    </Flex>
                }
                {
                    !isMobile&&
                    <Flex
                        justify="center"
                        align="center"
                        direction="row"
                        wrap="wrap"
                        gap="xl"
                    >
                        <IconBrandTwitter style={{color: '#737373'}}/>
                        <IconBrandInstagram style={{color: '#737373'}}/>
                        <UnstyledButton 
                            variant="outline"
                            onClick={handleColorScheme}
                        >
                            {
                                colorScheme == "dark"? <IconSun style={{color: '#737373'}}/>:<IconMoon style={{color: '#737373'}}/>
                            }
                        </UnstyledButton>
                    </Flex>
                }
                
            </Flex>
        </Box>
    )
}

export default MyHeader;