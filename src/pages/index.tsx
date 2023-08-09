import { 
  Box,
  Text,
  Input,
  Group,
  Button,
  Grid,
  Divider
} from '@mantine/core';

import MainProduct from '@/components/Spaces/MainProduct';
import Product from '@/components/Spaces/Product';

const Spaces = () => {
  return(
    <Box>
      <Box
        sx={(theme) => ({
          transform: 'translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)',
          opacity: 1,
          transformStyle: 'preserve-3d'
        })}
      >
        <Text align='center'
          sx={(theme) => ({
            color: theme.colors.gray[5],
            fontSize: '30px'
          })}
        >
          Explore the workspaces of creative individuals,
        </Text>
        <Text align='center'
          sx={(theme) => ({
            fontSize: '30px',
            color: theme.colors.gray[7],
          })}
        >
          sent directly to your inbox every Saturday and Sunday.
        </Text>
      </Box>  
      <Box 
        className='text-center mt-[40px]'
        sx={(theme)=>({
          color: theme.colors.gray[6]
        })}
      >
        <Text>Join 12,000+ other readers</Text>
        <Group position="center" className='mt-[15px]' spacing='xs'>
          <Input placeholder='you@example.com'/>
          <Button variant='outline'>
            Subscribe for free
          </Button>
        </Group>
        <Text className='mt-[15px]'>PUBLISHED BY @</Text>
      </Box>
      <Grid className='mt-[50px]'>        
        <Grid.Col md={6} lg={4} sm={1}>
          <MainProduct />  
        </Grid.Col> 
        <Grid.Col md={6} lg={4} sm={1}>
          <MainProduct />  
        </Grid.Col>      
        <Grid.Col md={6} lg={4} sm={1}>
          <MainProduct />  
        </Grid.Col>           
      </Grid>
      <Box className='mt-[60px] mb-[40px]'>
        <Divider my="xs" 
          label=
          {<Text sx={(theme) =>({
            color: theme.colors.gray[6],
            letterSpacing: '0.1em'
          })}>PAST EDITIONS</Text>} 
          labelPosition="center" />
          <Grid mt='10px'>
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
            <Grid.Col md={6} lg={4} sm={1}>
              <Product />  
            </Grid.Col>  
          </Grid>
      </Box>
    </Box>
  )
}

export default Spaces;