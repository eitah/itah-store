import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';
import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Textfield } from 'react-mdl';

export default class LibraryModal extends React.Component {
      constructor(props) {
        super(props);
      }

    static PropTypes = {
          handleOpenDialog: PropTypes.func,
          handleOnChange: PropTypes.func,
          handleConfirmDialog: PropTypes.func,
          handleCloseDialog: PropTypes.func,
          openDialog: PropTypes.bool,
          currentImage: PropTypes.object,
          value: PropTypes.string
    }

    render() {
        const showImage = this.props.currentImage;
        return  (
      <div>
        <Dialog open={this.props.openDialog} onCancel={this.props.handleCloseDialog} >
          <DialogTitle>{ showImage && this.props.currentImage.title}</DialogTitle>
          <DialogContent >
             { showImage &&
                <img style={{width: "200px"}} src={this.props.currentImage.url} />
             }
             <div>Would you like to rename the artwork?</div>
             <Textfield
                 onChange={(e) => {this.props.handleOnChange(e.target.value)}}
                 label="Enter a New Name..."
                 style={{width: "200px"}}
                 required={true}
                 ref={input => this.textInput = input}
                 value={this.props.value}
             />

          </DialogContent>
          <DialogActions>
            <Button type="button" onClick={this.props.handleConfirmDialog}>Confirm New Name</Button>
            <Button type="button" onClick={this.props.handleCloseDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
        );
    }
}
