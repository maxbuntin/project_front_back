import axios from 'axios';


export const instance = axios.create({
  baseURL: 'https://localhost:5001/api/',
});

// custom  Notification
export const notification = (status, message) => {

//    return <Alert severity="success">
//   <AlertTitle>Success</AlertTitle>
//   This is a success alert — <strong>check it out!</strong>
// </Alert>

    console.log(status, message )
};
