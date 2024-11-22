import React, { useState } from 'react'
import { Car } from '../shared/type/Car';
import { CarResponse } from '../shared/type/CarResponse';
import { Button, Dialog, DialogActions, DialogTitle, IconButton, Tooltip } from '@mui/material';
import CarDialogContent from './CarDialogContent';
import { useQueryClient } from '@tanstack/react-query';
import { useEditcar } from '../shared/queries/CarListQueries';
import { CarEntry } from '../shared/type/CarEntry';
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
    carData: CarResponse
}

const EditCar: React.FC<FormProps> = ({carData}) => {
    const queryClient = useQueryClient();
    const [open, setOpen]= useState(false)
    const [car, setCar] = useState<Car>({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: 0,
        price: 0
    });

    const editMutation = useEditcar();

    const handleClickOpen = () =>{
        setCar({
            brand: carData.brand,
            model: carData.model,
            color: carData.color,
            registrationNumber: carData.registrationNumber,
            modelYear: carData.modelYear,
            price: carData.price
        });
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    }

    const handleSave = async() =>{
        const url = carData._links.self.href;
        const carEntry: CarEntry = {
           car, url
        };
        await editMutation.mutateAsync(carEntry, {
            onSuccess: () => {
                queryClient.invalidateQueries(["getAllCarDetails"]);
            },
            onError: (error) => {
                console.error("Error updating car: ", error);
            },
        });
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: 0,
            price: 0,
        });
        // Close the modal
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };
  return (
    <div>
        {/* <Button onClick={handleClickOpen}>Edit</Button> */}
        <Tooltip title="Edit Car">
        <IconButton  aria-label='edit' size='small' onClick={handleClickOpen}>
            <EditIcon/>
        </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Car</DialogTitle>
            <CarDialogContent car={car} handleChange={handleChange}></CarDialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default EditCar