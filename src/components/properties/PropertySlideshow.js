import React, { Component } from 'react'

export class PropertySlideshow extends Component {
  state = {
    active: 0
  }
  currentDiv = (i) => {
    this.setState({
      active: i
    });
  }

  componentDidMount (){
    const highlight = document.querySelector(".gallery-hightlight");
    const previews = document.querySelectorAll(".room-preview img");
  
    previews.forEach(preview => {
      preview.addEventListener("click", function() {
        const smallSrc = this.src;
        const bigSrc = smallSrc.replace("small", "big");
        previews.forEach(preview => preview.classList.remove("room-active"));
        highlight.src = bigSrc;
        preview.classList.add("room-active");
      });
    });
  }
  
  render() {
    const images = this.props.imageURLs.length>0 ? (
      <div className="room-gallery">
        <img className="gallery-hightlight" src={this.props.imageURLs[0]} alt="room1" />
        <div className="room-preview">
          {this.props.imageURLs.map(url => {
            return (
              <img src={url} alt="Listing" className={url===this.props.imageURLs[0] ? "room-active" : ""}/>
            )
          })}
        </div>
      </div>
      
    ) : (null);
    return (
      <div>
        {images}
      </div>
    )
  }
}

export default PropertySlideshow
