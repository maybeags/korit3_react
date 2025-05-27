import { Button, TextField } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { Item } from "../App";

export default function AddItem() {
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

  return(
    <>
      <Button onClick={handleOpen}>
        Add Item / 항목 추가
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Item / 새로운 항목</DialogTitle>
        <DialogContent>
          <TextField value={item.product} margin="dense"
            onChange={ e => setItem({...item, product: e.target.value}) }
            label="Product/제품" fullWidth />

            {/* 동일한 형태로 input을 amount에 맞춰서 쓸 수 있겠네요 */}
            
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>
            Cancel / 취소
          </Button>

          <Button>
            Add / 추가
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}