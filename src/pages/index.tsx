import {
  Box,
  Text,
  Select,
  Group,
  Button,
  Grid,
  Divider,
  Loader
} from '@mantine/core';
import MainNurseries from '@/components/Spaces/MainNurseries';
import NurseriesItem from '@/components/Spaces/Nurseries';
import { useEffect, useState } from 'react';
import { Nurseries } from '@/types/nurseries';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const Spaces = () => {

  useEffect(() => {
    getData();
  }, [])

  const [nurseries, setNurseries] = useState<Nurseries[]>([]);
  const [latestNurseries, setLatestNurseries] = useState<Nurseries[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [sendingMail, setSendingMail] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('boy');

  const getData = async () => {
    setIsLoad(true);
    try {
      const res = await fetch('/api/get_nurseries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ search: search })
      });
      if (res.status != 200) {
      } else {

      }
      const data = await res.json();
      let count = 3;
      if (data.length < 3) {
        count = data.length;
      }
      const _latestNurseries: Nurseries[] = [];
      for (let k = 0; k < count; k++) {
        _latestNurseries.push(data[k]);
      }
      setNurseries(data);
      setLatestNurseries(_latestNurseries);
    } catch (e) {

    }
    setIsLoad(false);
  }

  return (
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
          Get Inspired by other beautiful baby nurseries,
        </Text>
        <Text align='center'
          sx={(theme) => ({
            fontSize: '30px',
            color: theme.colors.gray[7],
          })}
        >
          Sent directly to your inbox every Sunday.
        </Text>
      </Box>
      <Box
        className='text-center mt-[40px]'
        sx={(theme) => ({
          color: theme.colors.gray[6]
        })}
      >
        <Group className='mt-[20px]' spacing='xs' position="center" grow>
          {/* <Input  
            value={search} 
            onChange={(event) => { 
              setSearch(event.target.value)
            }}
            onKeyUp={(event) => {
              if(event.keyCode == 13){
                getData();
              }
            }}
            placeholder='Search baby nurseries' 
            
          />
           */}
          <Select
            data={[
              { value: 'boy', label: 'nursery for boy' },
              { value: 'girls', label: 'nursery for girls' },
              { value: 'neutral', label: 'gender neutral nursery' },
              { value: 'small_room', label: 'small room' },
              { value: 'middle_room', label: 'middle room' },
              { value: 'big_room', label: 'big room' },
            ]}
            value='boy'
            onChange={(value) => { if (value) setSearch(value) }}
          />
          <Button variant='outline' onClick={() => { getData() }} sx={((theme) => ({
            maxWidth: '150px'
          }))}>
            {
              sendingMail ? <Loader variant='dots' /> : 'Search'
            }
          </Button>
        </Group>
      </Box>
      {
        isLoad ? <Loader variant='dots' mt={10} sx={(theme) => ({ margin: 'auto' })} /> :
          <Box>
            <Grid className='mt-[20px]' gutter={70}>
              {
                latestNurseries.map((item, key) =>
                  <Grid.Col md={6} lg={4} sm={1} key={key} >
                    <MainNurseries data={item} index={key} />
                  </Grid.Col>
                )
              }
            </Grid>
            <Box className='mt-[60px] mb-[40px]'>
              <Divider my="xs"
                label=
                {<Text sx={(theme) => ({
                  color: theme.colors.gray[6],
                  letterSpacing: '0.1em'
                })}>PAST EDITIONS</Text>}
                labelPosition="center" />

              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 2, 500: 2, 750: 3, 900: 4 }}
              >
                <Masonry>
                  {
                    nurseries.map((item, key) =>
                        <NurseriesItem data={item} key={key}/>
                    )
                  }
                </Masonry>
              </ResponsiveMasonry>
            </Box>
          </Box>
      }

    </Box>
  )
}

export default Spaces;