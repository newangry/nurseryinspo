import { 
    Box,
    Text,
    TextInput,
    Button
} from '@mantine/core';

const Submit = () => {
    return (
        <Box sx={(theme) =>({
            maxWidth: '45rem',
            margin: 'auto'
        })}>
            <Text align='center' sx={(theme) =>({
                fontSize: '1.5rem',
                color: theme.colors.gray[7]
            })}>
                Show us your workspace and get a chance to be featured on the community ✨
            </Text>
            <Text mt={30} align='center' sx={(theme) =>({
                fontSize: '1.2rem',
                color: theme.colors.gray[5]
            })}>
                There is currently a ~3 month wait to be featured. If this is okay with you
            </Text>
            <Box mt={30}>
                <TextInput
                    placeholder="Willy Workspace"
                    label={
                        <Text size='sm' mb={10}>
                            Your name
                        </Text>
                    }
                />
                <TextInput
                    mt={20}
                    placeholder="@willyworkspace"
                    label={
                        <Text size='sm' mb={10}>
                            Twitter handle (NA if none – no big deal!)
                        </Text>
                    }
                />
                <TextInput
                    placeholder="willy@example.com"
                    mt={20}
                    type='email'
                    label={
                        <Text size='c' mb={10}>
                            Email address
                        </Text>
                    }
                />
                <Button fullWidth variant="outline" mt={20}>
                    Send feature request
                </Button>
            </Box>
        </Box>
    )
}

export default Submit;