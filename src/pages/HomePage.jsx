import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import LoginPage from '../components/Authentication/LoginPage';

export default function HomeCard() {
  return (
    <Card sx={{ maxWidth: "60vw" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          width="340"
          image="/src/img/home-logo.webp"
          alt="GitHub Logo"
        />
        <CardContent>
          {/* <Typography gutterBottom variant="h4" fontSize=" 2.5em"  component="div">
            Welcome Back!!
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center', margin: '10px'}}>

        <LoginPage/>
 
      </CardActions>
    </Card>
  );
}