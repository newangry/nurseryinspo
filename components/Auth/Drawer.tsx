import { 
    Drawer, 
    Button,
    TextInput,
    Divider,
    Flex,
    UnstyledButton,
    PasswordInput,
    Alert,
    Loader
} from '@mantine/core';
import { FC, useState, useEffect } from 'react';
import { IconBrandApple, IconBrandFacebook, IconBrandGoogle, IconAlertCircle } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { supabase } from '@/utils/app/supabase-client';
import { useRouter } from 'next/router';

interface Props {
    opened: boolean,
    open: () => void;
}
const Auth:FC<Props> =({
    opened,
    open
}) => {

    const [authType, setAuthType] = useState<string>('Signin');
    const [errrorMessage, setErrorMessage] = useState<string>('');
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const router = useRouter();
    
    const form = useForm({
        initialValues: {
            email: '',
            name: '',
            password: '',
            terms: true,
        },
        validate: {
            email: (val: string) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val: string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
        },
    });
    
    // useEffect(() => {
    //     const { data: authListener } = supabase.auth.onAuthStateChange(
    //         async (event: any, session: any) => {
    //             if(session){
    //                 router.push('/main');
    //             }
    //         }
    //     );
    // }, [])

    const Auth = async() => {
        const email = form.values.email;
        const password = form.values.password;

        setIsAuth(true);
        setErrorMessage('');

        if(authType == "Signin"){ 
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if(error){
                setErrorMessage(error.message);
            } else{
                open();
            }
        } else{
            const { data, error } = await supabase.auth.signUp(
                {
                    email: email,
                    password: password,
                    options: {
                        data: {
                          full_name: form.values.name,
                          email: email
                        },
                    },
                }
            );
            if(error){
                setErrorMessage(error.message);
            } else{
                open();
            }
        }
        setIsAuth(false);
    }

    return (
        <>
        <Drawer
            opened={opened}
            onClose={open}
            title="Authentication"
            overlayProps={{ opacity: 0.5, blur: 4 }}
            position='right'
        >
            <form 
                className='pt-20'
                onSubmit={form.onSubmit(() => {Auth()})}
            >
                <Flex
                    direction="column"
                    gap="md"
                >
                    <Button  variant="default" color="gray"  leftIcon={<IconBrandGoogle />}> {authType} with Google </Button>
                    <Button  variant="default" color="gray"  leftIcon={<IconBrandFacebook />}> {authType} with FaceBook </Button>
                    <Button  variant="default" color="gray"  leftIcon={<IconBrandApple />}> {authType} with Apple </Button>

                </Flex>
                
                <Divider label="Or continue with email" labelPosition="center" my="lg" />
                {authType === 'Signup' && (
                    <TextInput
                        required
                        label="Name"
                        placeholder="Your name"
                        value={form.values.name}
                        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                        radius="md"
                        data-autofocus
                    />
                )}

                <TextInput 
                    required
                    label="Email"
                    placeholder="hello@mantine.dev"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Invalid email'}
                    radius="md"
                    data-autofocus
                />
                <PasswordInput
                    required
                    label="Password"
                    placeholder="Your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Password should include at least 6 characters'}
                    radius="md"
                />
                
                <UnstyledButton 
                    pt={20} pb={10}
                    onClick={() =>{authType == "Signin"?setAuthType('Signup'):setAuthType('Signin')}}
                >
                    {
                        authType == "Signin"? "Don't have an account? Register":"Have an account? Login"
                    }
                </UnstyledButton>
                {
                    errrorMessage !=""?
                    <Alert icon={<IconAlertCircle size="1rem" />} title="Error!" color="pink">
                        {errrorMessage}
                    </Alert>:<></>
                }
                
                <Button 
                    type="submit" 
                    mt="sm" 
                    fullWidth 
                    variant='outline'
                >
                    {
                        isAuth?<Loader variant='dots'/>:authType
                    }
                    
                </Button>
            </form>
        </Drawer>
        </>
    );
}

export default Auth;