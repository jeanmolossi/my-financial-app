import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { Modal, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Button, Input } from '../../../components';
import { createCategory } from '../../../repositories';
import { RequestStatus, UpdateRequestStatus, useAppContext } from '../../../store/app';

export interface CreateCategoryModalRef {
  onOpen: () => void;
  onClose: () => void;
}

interface ModalProps {
}

const CreateCategoryModal: React.ForwardRefRenderFunction<CreateCategoryModalRef, ModalProps> = (
  {},
  ref
) => {
  const modalizeRef = useRef<Modalize>(null);
  const formRef = useRef<FormHandles>(null);

  const { app: { status }, dispatch } = useAppContext();
  
  useImperativeHandle(ref, () => ({
    onOpen(){
      modalizeRef.current?.open()
    },
    onClose() {
      modalizeRef.current?.close()
    }
  }), [])

  const onSubmit = useCallback(async ({ category }) => {
    dispatch(UpdateRequestStatus({
      status: RequestStatus.PENDING
    }))

    await createCategory(category)
      .then(() => {
        console.log('Created')
        
        dispatch(UpdateRequestStatus({
          status: RequestStatus.RESOLVE
        }))
      })
      .catch(() => {
        dispatch(UpdateRequestStatus({
          status: RequestStatus.REJECT
        }))        
      })
    
    modalizeRef.current?.close();
  }, []);

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      HeaderComponent={<View style={{ height: 48 }} />}
      handlePosition="inside"
      FooterComponent={<View style={{ height: 48 }} />}
    >
      <Form ref={formRef} onSubmit={onSubmit}>
        <Input name="category" label="Nome da categoria" placeholder="Mercado" />

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button variant="outline_purple" onPress={() => {
            modalizeRef.current?.close()
          }}>
            Cancelar
          </Button>
          
          <Button variant="outline_green" onPress={() => {
            formRef.current?.submitForm();
          }} disabled={status === RequestStatus.PENDING}>
            Cadastrar
          </Button>
        </View>
      </Form>
    </Modalize>
  );
}

export default forwardRef(CreateCategoryModal);