import { FC, useState } from "react";
import { 
    AppShell,
    Navbar,
    Header,
    Footer,
    Text,
    Box,
    useMantineTheme,  
 } from '@mantine/core';
import MyHeader from "@/components/Layouts/Header";
import MyFooter from "@/components/Layouts/Footer";
import { useMediaQuery } from "@mantine/hooks";
import { MOBILE_LIMIT_WIDTH } from "@/utils/app/consts";
import MyNavbar from "./Navbar";

interface Props {
    children: JSX.Element,
}
const Layout: FC<Props> = ({ children }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const isMobile = useMediaQuery(`(max-width: ${MOBILE_LIMIT_WIDTH}px)`);

    return (
        <AppShell
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            navbar={
                isMobile?
                <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
                    <MyNavbar />
                </Navbar>
                :<></> 
            }
            footer={
                // <Footer p="md" >
                    <MyFooter isMobile={isMobile}/>
                // </Footer>
            }
            header={
                <Header height={{ base: 50, md: 70 }} p="md">
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <MyHeader 
                            isMobile={isMobile} 
                            openNav={() => {setOpened((prev_opend) => (!prev_opend))}}
                            openedNav={opened}    
                        />
                    </div>
                </Header>
            }
        >
            {/* <Box>
                <Box
                    sx={(theme) =>({
                        maxWidth: '80rem',
                        margin: 'auto',
                        paddingTop: '30px'
                    })}
                >
                    {children}
                </Box>
                <Box mt={50} pt={50} pb={20} sx={(theme) =>({
                    borderTop: `1px solid ${theme.colors.gray[5]}`
                })}>
                    <MyFooter />
                </Box>
            </Box>
             */}
             <Box
                    sx={(theme) =>({
                        maxWidth: '80rem',
                        margin: 'auto',
                        paddingTop: '30px'
                    })}
                >
                    {children}
            </Box>
        </AppShell>
    )
}

export default Layout;