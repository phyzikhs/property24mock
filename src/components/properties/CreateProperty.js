import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { createProperty } from '../../store/actions/propertyActions'

class CreateProperty extends Component {
  state = {
    propertyName: "",
    propertyAddress: "",
    price: "",
    // images: FileList
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  /*handleFileUpload = (e) => {
    // console.log(e.target.files);
    this.setState({
      images: e.target.files
    });
  }*/
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProperty(this.state);
    this.props.history.push('/');
  }
  render() {
    const {auth} = this.props;
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
