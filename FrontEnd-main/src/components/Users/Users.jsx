import React from "react";
import { useEffect, useState} from 'react';
import { MainContainer } from "../Common/MainContainer.jsx";
import Container from '@material-ui/core/Container';
import {deleteUser, getUsers} from '../../Api/Api.js' 
import { AddUser } from "./AddUser";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Grid,
  Typography,
  TableFooter
} from '@material-ui/core';
import { EditeUser } from "./EditeUser.jsx";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
      borderRadius: 15,
      margin: '10px 10px',
      maxWidth: 950
  },
  tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.getContrastText(theme.palette.primary.dark)
  },
  avatar: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.getContrastText(theme.palette.primary.light)
  },
  name: {
      fontWeight: 'bold',
      color: theme.palette.secondary.dark
  },
  status: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      color: 'white',
      backgroundColor: 'grey',
      borderRadius: 8,
      padding: '3px 10px',
      display: 'inline-block'
  }
}));

export const Users = () => {

  const [data, setData] = useState([]);
  const [showEdite, setShowEdite] = useState(null);
  const [editeData, setEditeData] = useState(null);
  
  const loadList = async ()=>{
    const response = await getUsers();
    setData(response.data);
  }

  const editeModel =(row, show)=>{
    setShowEdite(show);
    setEditeData(row);
  }

  const updateList = (Id , newItem) => {
    const newItems = data.map(item => {
      if (Id == item.Id) {
        return { ...item, UserName: newItem.UserName,Email:newItem.Email,Gender: newItem.Gender, Age: newItem.Age,
       }
      }
      return item;
    });
    setData(newItems);
  }

  const deleteFromList = (itemId) => {
    const newData = data.filter(item=> item.Id !== itemId);
    setData(newData);
    deleteUser(itemId);
  }

  useEffect(()=>{
    loadList();
  }, [])

  const classes = useStyles();

  return (
    <MainContainer>
            <Container maxWidth="sm">
            <h1>Список користувачів</h1> 
          </Container>
          <AddUser list={data} addTolist={setData}/>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeaderCell}>Інформація</TableCell>
            <TableCell className={classes.tableHeaderCell}>Стать</TableCell>
            <TableCell className={classes.tableHeaderCell}>Вік</TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
            <TableCell className={classes.tableHeaderCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                  <Grid container>
                      <Grid item lg={2}>
                          <Avatar alt={row.name} src='.' className={classes.avatar}/>
                      </Grid>
                      <Grid item lg={10}>
                          <Typography className={classes.name}>{row.UserName}</Typography>
                          <Typography color="textSecondary" variant="body2">{row.Email}</Typography>
                      </Grid>
                  </Grid>
                </TableCell>
              <TableCell>
                  <Typography color="primary" variant="subtitle2">{row.Gender}</Typography>
                </TableCell>
              <TableCell>{row.Age}</TableCell>
              <TableCell>
              <Button size="small" color='primary' onClick={()=> editeModel(row, true) } >Редагувати</Button>
              </TableCell>
              <TableCell>
              <Button size="small"   onClick={()=> deleteFromList(row.Id)}>Видалити</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        </TableFooter>
      </Table>
    </Paper>
    <EditeUser openProps={showEdite} initial={editeData} updateList={updateList}  />
    </MainContainer>
  );
};
