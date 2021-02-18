import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProperty } from '../../store/actions/propertyActions'

class CreateProperty extends Component {
  state = {
    propertyName: "",
    propertyAddress: "",
    price: "",
    imagesWithURL: []
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleFileChange = (e) => {
    const images = Array.from(e.target.files);
    // console.log(images);
    const imagesWithURL = images.map(file => {
      var url = URL.createObjectURL(file);
      return {id: Date.now()+file.name+Math.ceil(Math.random()), url: url, image: file};
    });
    // console.log(imagesWithURL);
    this.setState({
      imagesWithURL: [...this.state.imagesWithURL, ...imagesWithURL]
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    if (
      this.state.propertyName!=null
      & this.state.propertyAddress!=null
      & this.state.price!=null
      & this.state.imagesWithURL.length>0
    ) {
      this.props.createProperty(this.state);
      this.props.history.push('/');
    }
  }
  render() {
    const {auth} = this.props;
    const imageDivs = this.state.imagesWithURL ? (
      this.state.imagesWithURL.map(imageWithURL => {
        return (
          <div className="col s1 m1 image-content" key={imageWithURL.id}>
            <img src={imageWithURL.url} alt="property" />
          </div>
        );
      })
    ) : (null);
    // console.log(this.state.imagesWithURL);
    // console.log(imageDivs);
    // console.log(imageDivs.length>0);
    return (auth.uid) ? (
      <div className="container z-depth-1">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Add new property listing</h5>

          <div className="input-field">
            <label htmlFor="propertyName">Property Name</label>
            <input type="text" id="propertyName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="propertyAddress">Physical Address</label>
            <input type="text" id="propertyAddress" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" onChange={this.handleChange}/>
          </div>
          <div className="property-images">
            <div onClick={() => this.fileInput.click()} className="col s1 m1 image-content uploadBtn">Choose Photos to Upload</div>
            {imageDivs}
            <input
              style={{display: 'none'}}
              type="file" onChange={this.handleFileChange}
              ref={fileInput => this.fileInput = fileInput}
              accept="image/*" multiple
            />
            
          </div>
          {/* <div className="input-field">
            <label htmlFor="file">Upload images:</label>
            <input type="file" id="images" accept="image/*" name="images" multiple onChange={this.handleFileUpload}/>
            <img src="{this.state.images.length > 0 ? (this.state.images[0]) : (null) }" alt="No preview available" />
          </div> */}
          {/* <div className="input-field">
            <label id="load-desktop" role="tabpanel" className="load-cloud-content active" style="position: relative">
                <div className="load-cloud-content__title">Drag and Drop Images Here!</div>
                <div className="load-cloud-content__subTitle">
                  Use the button below to upload your images to imafeFiler and begin <b>confirm</b>. Only supports <b>JPG, JPEG, PNG, etc.</b> formats.
                </div>
                <label type="button" className="new-btn btn--orange">
                    <input className="file-upload" id="images" type="file" name="files[]" accept="image/*" />
                    Browse for a Images on Your Computer
                </label>
            </label>
          </div> */}
          
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Add Listing</button>
          </div>
        </form>
      </div>
    ) : (
      <Redirect to='/' />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProperty: (property) => dispatch(createProperty(property))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateProperty)
