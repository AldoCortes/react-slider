import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, 
    Typography, 
    Box,
    Grid,
    Button} from '@material-ui/core';
import Arrow from './Arrow';
import VisibleItemsSelector from './VisibleItemsSelector';
import InteractiveSliderItem from './InteractiveSliderItem';
import { setViewer } from './../redux-saga/actions';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    root: {
        position: 'relative',
        margin: '20px auto',
        display: 'block'
    },
    title: {
        margin: '15px 0'
    },
    slider: {
        position: 'relative',
        height: '100vh',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    content: {
        transition: 'transform ease-out 0.45s',
        height: '100%',
        width: '100%',
        display: 'flex'
    },
    image: {
        height: 'auto'
    },
    editorButton: {
        margin: '0 15px'
    }
  });

function Slider(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    leftDisabled: true,
    rightDisabled: false,
    editorMode: false,
    showingItems: 2,
    activeIndex: 0,
    translate: 0,
    slideWidth: window.innerWidth
  })
  const {
      leftDisabled,
      rightDisabled,
      showingItems,
      translate,
      editorMode,
      slideWidth } = state;
  
  const translateImages = (move) => {
    /* TODO: Solve math problem in position and indexing */
    const { activeIndex, slideWidth, showingItems, translate } = state;
    let disabledLeft = false;
    let disabledRight = false;
    
    const nextIndex = activeIndex + move;
    const lastIndex = Math.ceil(props.images.length/showingItems)-1;
    const widthRatio = Math.floor(slideWidth/5);

    let newIndex = activeIndex;
    if(nextIndex === lastIndex){
        disabledRight = true;
    } else if(nextIndex < 0) {
        disabledLeft = true;
    } else {
        newIndex = nextIndex;
    }
    let newTranslate = translate;
    
    if(activeIndex !== lastIndex)
        newTranslate = nextIndex * (widthRatio*showingItems);

    setState({
        ...state,
        activeIndex: newIndex,
        translate: newTranslate,
        leftDisabled: disabledLeft,
        rightDisabled: disabledRight
      })  
  };

  const resetSliderValues = () => {
    setState({
        ...state,
        activeIndex: 0,
        translate: -1,
        leftDisabled: true,
        rightDisabled: false
      });
  };

  const nextSlide = () => {
    translateImages(1);
  }

  const prevSlide = () => {
    translateImages(-1);
  }

  const handleVisualItemsChange = e => {
      resetSliderValues();
      setState({
          ...state,
          showingItems: e.target.value
      });
  };

  const toggleEditor = () => {
    const { editorMode } = state;
    setState({
        ...state,
        editorMode: !editorMode
      });
  };

  const imageClickHandler = (item) => {
    if(!editorMode){
        props.setViewer(item);
    }
  };

  const ref = useRef(null);
  useEffect(() => {
    const width = ref.current ? ref.current.offsetWidth - 20 : 0;
    if(width > 0){
        setState({...state, slideWidth: width});
    }
  }, [ref.current]);

  if(props.images.length < 1){
    return '';
  }

  let editor = !editorMode 
    ? (<Button color="primary" className={classes.editorButton} onClick={toggleEditor}>Edit mode</Button>)
    : (<Button color="primary" className={classes.editorButton} onClick={toggleEditor}>View mode</Button>)
  
  
  const widthRatio = Math.floor(slideWidth/5);

  return (
      <Paper className={classes.root} ref={ref}>
          <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={5}>
                    <Typography color="primary" variant="h6" className={classes.title}>Slider</Typography>
                </Grid>
                <Grid item xs={12} sm={7}>
                    <VisibleItemsSelector
                        current={showingItems}
                        handleChange={handleVisualItemsChange}
                        fullsize={props.images.length}></VisibleItemsSelector>
                    {editor}
                </Grid>
            </Grid>
          </Box>
          <Box>
            <div className={classes.slider}
                 style={{width: `${ widthRatio*showingItems}px`, height: `${ widthRatio}px`}}>
                <div className={classes.content}
                        style={{transform: `translateX(-${translate}px)`}}
                        slidewidth={slideWidth}>
                    {props.images.map(item => (
                        <InteractiveSliderItem
                           key={item.imageCaption}
                           item={item}
                           widthRatio={widthRatio}
                           editorMode={editorMode}
                           clickHandler={imageClickHandler}
                        ></InteractiveSliderItem>
                    ))}
                </div>
                <Arrow direction="left" handleClick={prevSlide.bind(this)} disabled={leftDisabled} />
                <Arrow direction="right" handleClick={nextSlide.bind(this)} disabled={rightDisabled} />
            </div>

          </Box>
      </Paper>
  )
}

const mapStateToProps = state => ({  
    images: state.reduxSaga.images,
    viewer: state.reduxSaga.viewer
 });

 const mapDispatchToProps = {  
    setViewer
 };  
   
   
export default connect(mapStateToProps, mapDispatchToProps)(Slider);