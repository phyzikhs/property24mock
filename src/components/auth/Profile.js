import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import DefaultProfilePic from '../../images/default-profile-pic.png'
import { signOut, updateProfilePic, updateUserProfile } from '../../store/actions/authActions'

export class Profile extends Component {
  state = {
    firstName: this.props.profile.firstName,
    lastName: this.props.profile.firstName
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // console.log(file, this.props.auth.uid);
      const imageFile = new File([file], this.props.auth.uid)
      // console.log(this.props);
      // const storageRef = app.storage();
      // const formData = new FormData()
      // formData.append('image', imageFile, this.props.auth.uid) // for unique profile pic, using uid
      this.props.updateProfilePic(imageFile);
    }
  }
  render() {
    return this.props.auth.uid ? (
      <div className="profile-page">
        <div className="profile-card">
          <div className="card-header">
            <div className="pic">
              <img src={this.props.profile.profilePicURL ? this.props.profile.profilePicURL : DefaultProfilePic} alt="" />
              <input
                id="select-file"
                style={{display: 'none'}}
                type="file" onChange={this.handleFileChange}
                ref={fileInput => this.fileInput = fileInput}
                accept="image/*" 
              />
              <div onClick={() => this.fileInput.click()} id="uploadBtn">Choose Photo</div>
            </div>
            <div className="name">{this.props.profile.firstName} {this.props.profile.lastName}</div>
            <div className="desc">Developer & Designer</div>
            <div className="sm">
              <a href="#" className="fab fa-facebook-f"></a>
              <a href="#" className="fab fa-twitter"></a>
              <a href="#" className="fab fa-github"></a>
              <a href="#" className="fab fa-youtube"></a>
            </div>
            <a href="#" className="contact-btn">Contact Me</a>
          </div>
          <div className="card-footer">
            <div className="numbers">
              <div className="item">
                <span>120</span>
                Posts
              </div>
              <div className="border"></div>
              <div className="item">
                <span>127</span>
                Following
              </div>
              <div className="border"></div>
              <div className="item">
                <span>120K</span>
                Followers
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Redirect to='/login' />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserProfile: (uid, newProfile) => {
      dispatch(updateUserProfile(uid, newProfile))
    },
    updateProfilePic: (image) => {
      dispatch(updateProfilePic(image))
    },
    signOut: () => {
      dispatch(signOut())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);