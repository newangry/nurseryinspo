import { Modal, Flex, Textarea,TextInput, Button } from '@mantine/core';
import { FC } from 'react';
import { useForm } from '@mantine/form';

interface Props {
  open: () => void,
  opened: boolean,
  createBrand: (name: string, description: string) => void
}

const BrandModal:FC<Props> = ({opened, open, createBrand}) => {

  const form = useForm({
    initialValues: {
        name: '',
        description: '',
    },
    validate: {
        name: (val: string) => (val =='' ? null : 'Please input the brand name'),
        description: (val: string) => (val == '' ? 'Please input the brand description' : null),
    },
  });

  const handCreate = () => {
    
    if(form.values.name == ""){
      return;
    }
    
    createBrand(form.values.name, form.values.description);
    open();
    form.setFieldValue('name', '');
    form.setFieldValue('description', '');
    
  }

  return (
    <>
      <Modal opened={opened} onClose={open} title="Create a brand">
        
          <form
            className='pt-20'
            onSubmit={form.onSubmit(() => {alert()})}
          >  
          <Flex
            direction="column"
            gap="md"
          >
            <TextInput 
                required
                label="Name"
                value={form.values.name}
                onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
                radius="md"
                data-autofocus
            />
            <Textarea
              label="Description"
              autosize
              minRows={2}
              maxRows={4}
              onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
            />
            <Button
              variant='outline'
              fullWidth
              type='submit'
              onClick={() => {handCreate()}}
            >
              Create
            </Button>
            </Flex>
          </form>
      </Modal>
    </>
  );
}

export default BrandModal;