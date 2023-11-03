import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  CardActionArea, CardActions } from '@mui/material';
// import SearchInput from './SearchInput'
import { RepoFinder } from '../RepoFinder/RepoFinder';

export default function SearchCard() {
  return (
    <Card sx={{ maxWidth: "60vw" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="340"
          width="340"
          image="/src/img/github-logo.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Buscar Repositorio en GitHub
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{justifyContent: 'center', margin: '10px'}}>

        <RepoFinder/>

      </CardActions>
    </Card>
  );
}