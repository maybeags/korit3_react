import { useState } from "react";
import { Dialog,DialogActions, DialogTitle, Button, IconButton, Tooltip } from "@mui/material";
import { Car, CarEntry, CarResponse } from "../types";
import CarDialogContent from "./CarDialogContet";
import { updateCar } from "../api/carapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import EditIcon from '@mui/icons-material/Edit';

type FormProps = {
  cardata: CarResponse
}

export default function EditCar({ cardata } : FormProps) {
  const queryClient = useQueryClient();
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  });

  const { mutate } = useMutation(updateCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: (err) => console.log(err)
  });

  const handleClickOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      color: cardata.color,
      registrationNumber: cardata.registrationNumber,
      modelYear: cardata.modelYear,
      price: cardata.price
    })
    
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    const url = cardata._links.self.href;
    const carEntry: CarEntry = { car, url };
    mutate(carEntry);
    setCar({
      brand: '',
      model: '',
      color: '',
      registrationNumber: '',
      modelYear: 0,
      price: 0,
    })
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => 
    {
      setCar({...car, [event.target.name]: event.target.value})
    }
  
  return(
    <>
      <Tooltip title="수정">
      <IconButton aria-label="edit" onClick={handleClickOpen} size="small">
        <EditIcon fontSize="small" />
      </IconButton>
      </Tooltip>
      
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car | 차량 수정하기</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Save | 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}