import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDeleteCar, useGetCars } from '../shared/queries/CarListQueries';
import { DataGrid, GridCellParams, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { Button, IconButton, Snackbar, Stack, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from './AddCar';
import EditCar from './EditCar';

type CarlistProps = {
    logout?: () => void; // Optional logout function
}

const Carlist: React.FC<CarlistProps> = ({ logout }) => {
    const handleLogout= () =>{
      
        sessionStorage.setItem("jwt","");
    }
    const {
        data: carList,
        isLoading: dataLoading,
        isError
    } = useGetCars();
    const queryClient = useQueryClient();
    const deleteCarMutation = useDeleteCar();
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        { field: 'brand', headerName: 'Brand', width: 200 },
        { field: 'model', headerName: 'Model', width: 200 },
        { field: 'color', headerName: 'Color', width: 200 },
        { field: 'registrationNumber', headerName: 'Reg.nr', width: 150 },
        { field: 'modelYear', headerName: 'Model Year', width: 150 },
        { field: 'price', headerName: 'Price', width: 150 },
        {
            field: 'edit',
            headerName: '',
            width: 90,
            renderCell: (params: GridCellParams) => (
                <EditCar carData={params.row} />
            )
        },
        {
            field: 'delete',
            headerName: '',
            width: 150,
            renderCell: (params: GridCellParams) => (
                <Tooltip title='Delete Car'>
                    <IconButton aria-label='delete' size='small'
                        onClick={async () => {
                            const link = "api/" + params.row._links.car.href;
                            if (window.confirm("Are you sure you want to delete this car?")) {
                                await deleteCarMutation.mutateAsync(link, {
                                    onSuccess: () => {
                                        setOpen(true);
                                        queryClient.invalidateQueries(["getAllCarDetails"]);
                                    },
                                    onError: (error: any) => {
                                        console.error("Failed to delete car:", error);
                                    },
                                });
                            }
                        }}
                    >
                        <DeleteIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            )
        },
    ];

    if (dataLoading) {
        return <span>....Loading</span>;
    } else if (isError) {
        return <span>Error when fetching cars....</span>;
    } else {
        return (
            <>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                    <AddCar />
                    <Button onClick={handleLogout} variant="contained" color="secondary">Log out</Button>
                </Stack>
                <DataGrid
                    rows={carList}
                    columns={columns}
                    disableRowSelectionOnClick={true}
                    getRowId={row => row._links.self.href}
                    slots={{ toolbar: GridToolbar }} />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={() => setOpen(false)}
                    message="Car Deleted"
                />
            </>
        );
    }
}

export default Carlist;
