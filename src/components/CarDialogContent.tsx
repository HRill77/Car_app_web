import React from 'react'
import { Car } from '../shared/type/Car'
import { DialogContent, Stack, TextField } from '@mui/material';

type DialogFormProps = {
    car: Car;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CarDialogContent : React.FC<DialogFormProps> = ({car, handleChange}) => {

  return (
    <div>
         <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField label="Brand" name='brand' value={car.brand} onChange={handleChange}/>
            <TextField label='Model' name='model' value={car.model} onChange={handleChange}/>
            <TextField label='Color' name='color' value={car.color} onChange={handleChange}/>
            <TextField label='Reg.nr' name='registrationNumber' value={car.registrationNumber} onChange={handleChange}/>
            <TextField label='Model Year' name='modelYear' value={car.modelYear} onChange={handleChange}/>
            <TextField label='Price' name='price' value={car.price} onChange={handleChange}/>
          </Stack>
        </DialogContent>
    </div>
  )
}

export default CarDialogContent