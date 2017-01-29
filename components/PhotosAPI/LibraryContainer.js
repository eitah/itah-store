import React from 'react';
import Layout from '../../components/Layout';
import LibraryModal from './LibraryModal';
import { Grid, Cell } from 'react-mdl';


export default class LibraryContainer extends React.Component {
    constructor(props) {
          super(props);
          this.fireModal = this.fireModal.bind(this);
          this.calculateOffset = this.calculateOffset.bind(this);
          this.handleOnChange = this.handleOnChange.bind(this);
          this.handleOpenDialog = this.handleOpenDialog.bind(this);
          this.handleConfirmDialog = this.handleConfirmDialog.bind(this);
          this.handleCloseDialog = this.handleCloseDialog.bind(this);
          this.state = { images: [], openDialog: false, currentImage: null, currentText: '' };
    }

    componentDidMount() {
      fetch('https://jsonplaceholder.typicode.com/photos')
      .then(r => r.json())
      .then(allImages => {
        const remoteImages = allImages.slice(0,25);
        const images = this.checkLocalStorage(remoteImages);
        this.setState({ images });
      });
    }


      handleOnChange(currentText) {
        this.setState({
          currentText
        })
      }

      handleOpenDialog() {
        this.setState({
          openDialog: true
        });
      }

      handleConfirmDialog() {
        if (this.state.currentText !== '') {
            this.state.currentImage.title = this.state.currentText;
            const id = this.state.currentImage.id;
            localStorage.setItem(`newTitle_${id}`, this.state.currentText);
        }
        this.handleCloseDialog();
      }


      handleCloseDialog() {
        this.setState({
          openDialog: false, currentImage: null, currentText: ''
        });
      }

    checkLocalStorage(images) {
       return images.map((image, index) => {
          if (localStorage.getItem(`newTitle_${index+1}`)) {
            image.title = localStorage.getItem(`newTitle_${index+1}`);
          }
          return image;
       });
    }

    fireModal(e) {
      const id = e.target.attributes['data-id'].value;
      const currentImage = this.state.images.filter(image => image.id === (id * 1))[0];
      this.setState({openDialog: true, currentImage});
    }

    calculateOffset(i) {
        const offset =
       (((i + 1) % 5) === 0) ? 4 : 2;
       return offset
    }

    renderGrid() {
      return (<div>
      <div style={{width: '90%', margin: 'auto'}}>
          <Grid className="demo-grid-ruler">
          { this.state.images.map((image, index) => {
          return (
              <Cell key={`cell_${index}`} col={this.calculateOffset(index)}>
                  <img key={`image_${index}`}
                       src={image.thumbnailUrl}
                       data-id={image.id}
                       onClick={this.fireModal}
                   />
                  <div key={'div_'+image.id}> { image.title }</div>
              </Cell>
           ); }
          )}
          </Grid>
        </div>
        </div>)
    }

    render() {
        return  (
            <div>
                <LibraryModal handleOpenDialog={this.handleOpenDialog}
                              handleOnChange={this.handleOnChange}
                              handleConfirmDialog={this.handleConfirmDialog}
                              handleCloseDialog={this.handleCloseDialog}
                              openDialog={this.state.openDialog}
                              currentImage={this.state.currentImage}
                              value={this.state.currentText}/>
                Welcome to my web store! Here you can view artwork, and, if desired, rename it.
                {this.renderGrid()}
            </div>
        );
    }
}
