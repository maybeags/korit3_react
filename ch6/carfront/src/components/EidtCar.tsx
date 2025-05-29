import { useState } from "react";
import { Dialog,DialogActions, DialogTitle } from "@mui/material";
import { Car, CarResponse } from "../types";
import CarDialogContent from "./CarDialogContet";

type FormProps = {
  cardata: CarResponse
}

export default function EditCar({ cardata } : FormProps) {
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
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
    setOpen(false);
  }

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => 
    {
      setCar({...car, [event.target.name]: event.target.value})
    }
  
  return(
    <>
      <button onClick={handleClickOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car | 차량 수정하기</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <button onClick={handleClose}>Cancel | 취소</button>
          <button onClick={handleSave}>Save | 저장</button>
        </DialogActions>
      </Dialog>
    </>
  );
}