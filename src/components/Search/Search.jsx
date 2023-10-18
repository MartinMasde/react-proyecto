import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
import SearchInput from './SearchInput'

export default function SearchCard() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          width="340"
          image="/src/img/github-logo.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Buscar Repositorio en GitHub
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>

        <SearchInput />

      </CardActions>
    </Card>
  );
}