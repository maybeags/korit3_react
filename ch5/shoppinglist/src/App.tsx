import { useState } from 'react'
import Container from '@mui/material/Container'
import { AppBar } from '@mui/material' // 2번 라인은 구조분해x 3번 라인은 구조 분해o
import { Toolbar } from '@mui/material'
import { Typography } from '@mui/material'

import { List, ListItem, ListItemText } from '@mui/material'

import AddItem from './components/AddItem'

import './App.css'

export type Item = {
  product: string;
  amount: string;
}

function App() {
  const [ items, setItems ] = useState<Item[]>([]);

  const addItem = (item: Item) => {
    setItems([item, ...items]);
  }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6">
            Shopping List / 쇼핑 리스트
          </Typography>
        </Toolbar>
      </AppBar>

      <AddItem addItem={addItem}/>

      <List>
        {
          items.map((item, index) =>
            <ListItem key={index} divider>
              <ListItemText primary={item.product} secondary={item.amount} />
            </ListItem>  
          )
        }
      </List>

    </Container>

    
  )
}

export default App
