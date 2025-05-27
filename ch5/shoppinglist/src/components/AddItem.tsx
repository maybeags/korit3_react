import { Button, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Item } from "../App";

type AddItemProps = {
  addItem: (item: Item) => void;
}

export default function AddItem(props) {
  const [ open, setOpen ] = useState(false);
  const [ item, setItem ] = useState({
    product: '',
    amount: '',
  })

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const addItem = () => {
    props.addItem(item);
    // 추가를 하고 나면 기존에 있던 텍스트 필드(input창)의 내용을 삭제할겁니다.
    setItem({ product: '', amount: '' }); // 이거 왜 썼는지 브라우저에서 보여드렸습니다
    handleClose();
  }

  return(
    <>
      <Button onClick={handleOpen} variant="text">
        Add Item / 항목 추가
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item / 새로운 항목</DialogTitle>
        <DialogContent>
          <TextField value={item.product} margin="dense"
            onChange={ e => setItem({...item, product: e.target.value}) }
            label="Product/제품" fullWidth />

            <TextField value={item.amount} margin="dense"
            onChange={ e => setItem({...item, amount: e.target.value}) }
            label="Amount/수량" fullWidth />    

        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} variant="outlined">
            Cancel / 취소
          </Button>

          <Button onClick={addItem} variant="outlined">
            Add / 추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}