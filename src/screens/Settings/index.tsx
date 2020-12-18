import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AppContainer, Button, Input } from '../../components';
import { getMyLastBalance, adjustMyBalance } from '../../repositories';
import { parseToCurrency } from '../../utils';


const Settings: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [balance, setBalance] = useState('0,00')
  const [updating, setUpdating] = useState(false);
  
  const handleSubmit = useCallback(({ balance_adjust }) => {
    setUpdating(true);
    adjustMyBalance(balance_adjust)
      .then(() => setUpdating(false))
      .catch(() => setUpdating(false))
  }, []);

  useEffect(() => {
    getMyLastBalance().then(response => {
      if(!response){
        return;
      }

      setBalance(parseToCurrency(response.balance.balance.toString()));
    })
  }, []);

  return (
    <AppContainer>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ flex: 1 }}
          initialData={{
            balance_adjust: balance
          }}
        >
          <Input
            name="balance_adjust"
            icon="dollar-sign"
            placeholder="10.000,00"
            placeholderTextColor="#FFF7"
            label="Ajuste de balanço"
            labelStyle={{ color: 'white' }}
            style={{ color: 'white' }}
            keyboardType="numeric"
          />

          <Button
            variant="green"
            icon="save"
            iconSize={20}
            onPress={() => formRef.current?.submitForm()}
            disabled={updating}
          >
            Salvar
          </Button>
        </Form>
    </AppContainer>
  );
}

export default Settings;