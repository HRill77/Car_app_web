import React, { useState } from 'react'
import { Car } from '../shared/type/Car'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAddCar } from '../shared/queries/CarListQueries';
import { useQueryClient } from '@tanstack/react-query';
import CarDialogContent from './CarDialogContent';

const AddCar = () => {
    const [open, setOpen]= useState(false)
   const queryClient = useQueryClient();
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    console.log(car);
    const addCarMutation = useAddCar()

    //Open Modal Form
    const handleClickOpen = () =>{
        setOpen(true)
    }

    //Close Modal Form
    const handleClose = () =>{
        setOpen(false)
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    console.log(car);

    const handleSave =  async () =>{
        await addCarMutation.mutateAsync(car, {
            onSuccess: () =>{
                queryClient.invalidateQueries(["getAllCarDetails"]);
            },
            onError: (err)=>{
                console.error(err);
            }
        })

        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0,
        });

        handleClose();
    }
  return (
    <div>
    <Button onClick={handleClickOpen}>New Car</Button>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
       <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSave}>Save</Button>
        </DialogActions>
    </Dialog>
    </div>
  )
}

export default AddCar