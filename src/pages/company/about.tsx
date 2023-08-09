import { Box, Paper, Text } from '@mantine/core';

const About = () => {
    return(
        <Box mt={30} mb={30} sx={(theme) => ({maxWidth: '48rem', margin: 'auto'})}>
            <Paper shadow="xs" p="md">
                <Text align='center' 
                weight={500}
                sx={(theme)=>({
                    color: theme.colors.gray[7],
                    fontSize: '1.7rem'
                })}>A short story behind workspaces...</Text>
                <Text>
                    About workspace....
                </Text>
            </Paper>
        </Box>
    )
}

export default About;