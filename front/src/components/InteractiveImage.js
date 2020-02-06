import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 100,
  },
  media: {
    height: 100,
  },
  active: {
      border: "2px solid blue"
  }
});

export default function InteractiveImage(props) {
  const classes = useStyles();
  const {item, clickHandler} = {...props};
  const fullPath = 'public/images/'+ item.imageName;
  const [active, setActive] = useState(false);
  
  return (
    <Grid item 
          onClick={e => {
              setActive(clickHandler(item));
          }}
          xs={6} sm={4} md={2} lg={1}>
        <Card className={`${classes.root} ${ active ? classes.active : '' }`}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image={fullPath}
            title={item.imageCaption}
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                {item.imageCaption}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Grid>
  );
}
