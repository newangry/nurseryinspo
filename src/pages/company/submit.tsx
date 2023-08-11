import { 
    Box,
    Text,
    TextInput,
    Button
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

const Submit = () => {
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            twitter:''
        },
        validate: {
            // email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            // password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });

    const sendInformation = async() => {
        const res = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.values),
        })
        if(res.status == 200){
            notifications.show({
                title: 'Send feature request',
                message: 'Thank you!',
            })
            form.reset();
        } else{
            notifications.show({
                title: 'Send feature request',
                message: 'Error!',
                color: "red"
            })
        }
    }

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
                    value={form.values.name}
                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                />
                <TextInput
                    mt={20}
                    placeholder="@willyworkspace"
                    label={
                        <Text size='sm' mb={10}>
                            Twitter handle (NA if none – no big deal!)
                        </Text>
                    }
                    value={form.values.twitter}
                    onChange={(event) => form.setFieldValue('twitter', event.currentTarget.value)}

                />
                <TextInput
                    placeholder="willy@example.com"
                    mt={20}
                    type='email'
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    label={
                        <Text 
                            size='c' mb={10}
                        >
                            Email address
                        </Text>
                    }
                />
                <Button 
                    fullWidth 
                    variant="outline" 
                    mt={20}
                    onClick={() => {sendInformation()}}
                >
                    Send feature request
                </Button>
            </Box>
        </Box>
    )
}

export default Submit;