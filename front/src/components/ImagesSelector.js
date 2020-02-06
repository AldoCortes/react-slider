import * as React from 'react';  
import {connect} from 'react-redux';  
import {loadImages, setCarouselImages} from './../redux-saga/actions';
import { Paper, 
         Grid, 
         Typography, 
         Box, 
         Button } from '@material-ui/core';
import InteractiveImage from './InteractiveImage';
  
class ImagesSelector extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            displayedImages: [],
            selectedImages: []
        }
    }

    handleItemClick(item) {
        const finder = this.state.selectedImages.findIndex((d) => d.imageCaption == item.imageCaption);
        let result = false;
        let updatedImages = [];
        if(finder > -1){
            updatedImages = [...this.state.selectedImages];
            updatedImages.splice(finder, 1);
        } else {
            updatedImages = [...this.state.selectedImages, item];
            result = true;
        }
        this.orderAlphabetically(updatedImages);
        this.setState({selectedImages: updatedImages});
        return result;
    }

    componentDidMount() {  
        this.props.loadImages();  
   };

   componentDidUpdate() {
       if(  this.props.data.length 
            && this.state.displayedImages.length == 0){
           this.initValues();
       }
   }

   addToSlider(){
       let selection = this.state.selectedImages;
       if(this.props.images.length){
           selection = this.state.selectedImages.filter(v => !this.props.images.includes(v));
        }
        const filtered = this.props.data.filter(val => !selection.includes(val));
        this.setState({displayedImages:filtered});
        this.setState({selectedImages:[]});
        this.props.setCarouselImages(selection);
   }

   initValues() {
    this.orderAlphabetically(this.props.data);
    this.setState({displayedImages: this.props.data});
   }

   orderAlphabetically(arr) {
    arr.sort((a, b) => a.imageCaption !== b.imageCaption ? a.imageCaption < b.imageCaption ? -1 : 1 : 0);
   }
  
   render() {  
       if (this.props.loading) {  
           return <div>Loading</div>  
       }  
  
       if (this.props.error) {  
           return <div style={{color: 'red'}}>ERROR: {this.props.error}</div>  
       }

       return (
           <Paper>
               <Box>
                <Typography color="primary" variant="h6">Images selector</Typography>
               </Box>
               <Box>
                <Grid
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    {this.state.displayedImages.map(i =>  
                    <InteractiveImage
                        key={i.imageName}
                        clickHandler={this.handleItemClick.bind(this)}
                        item={i}>
                    </InteractiveImage>
                    )}
                </Grid>
               </Box>
               <Box align="center">
                   <Button 
                        color="primary" 
                        variant="contained"
                        onClick={this.addToSlider.bind(this)}
                        disabled={this.state.selectedImages.length < 1}
                        >Add</Button>
               </Box>
           </Paper>
       );  
   }  
}  
  
const mapStateToProps = state => ({  
   data: state.reduxSaga.data,  
   loading: state.reduxSaga.loading,  
   error: state.reduxSaga.error,
   images: state.reduxSaga.images
});  
  
const mapDispatchToProps = {  
   loadImages,
   setCarouselImages
};  
  
export default connect(  
   mapStateToProps,  
   mapDispatchToProps  
)(ImagesSelector);  