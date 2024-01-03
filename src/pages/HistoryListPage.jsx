import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';

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
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center', margin: '10px'}}>

        
 
      </CardActions>
    </Card>
  );
}