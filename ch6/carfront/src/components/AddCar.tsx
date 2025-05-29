import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { Car } from "../types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContet";

export default function AddCar() {
  const [ open, setOpen ] = useState(false);
  const [ car, setCar ] = useState<Car>({
    brand: '',
    model: '',
    color: '',
    registrationNumber: '',
    modelYear: 0,
    price: 0,
  });
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(['cars']);
    },
    onError: (err) => console.log(err),
  });

  // 자동차를 저장하고 모달 폼을 닫을 수 있도록 할겁니다.
  const handleSave = () => {
    mutate(car);
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


  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => 
  {
    setCar({...car, [event.target.name]: event.target.value})
  }
  
  return(
    <>
      <Button onClick={handleClickOpen} variant='outlined'>New Car</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <CarDialogContent car={car} handleChange={handleChange} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel | 취소</Button>
          <Button onClick={handleSave}>Save | 저장</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}