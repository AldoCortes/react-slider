import React, { useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, 
    Typography, 
    Card,
    CardActionArea,
    CardMedia,
    CardContent} from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        display: 'block',
        width: '100%',
        padding: '30px 0'
    },
    container: {
        position: 'relative',
        margin: '0 auto',
        display: 'block',
        width: '100%',
        maxWidth: '500px'
    }
  });

function Viewer(props) {
  if(!props.viewer){
    return '';
  }  
  const classes = useStyles();
  const item = props.viewer;
  let viewerRef = useRef(null);
  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: viewerRef.current.offsetTop });
  });
  
  return (
      <div className={classes.root} ref={viewerRef}>
        <Card className={classes.container}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={item.imageCaption}
                    image={`public/images/${ item.imageName }`}
                    title={item.imageCaption}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {item.imageCaption}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
      </div>
  )
}

const mapStateToProps = state => ({  
    viewer: state.reduxSaga.viewer
 });  
   
export default connect(mapStateToProps)(Viewer);