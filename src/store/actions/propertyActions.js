
export const createProperty = (property) => {
  return (dispatch, getState, {getFirebase, getFirestore, storage}) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const authorID = getState().firebase.auth.uid;
    firestore.collection('properties').add({
      propertyName: property.propertyName,
      propertyAddress: property.propertyAddress,
      price: property.price,
      propertyImageURLs: [],
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorID,
      createdAt: new Date()
    }).then(({id}) => {
      for (let i = 0; i < property.imagesWithURL.length; i++) {
        const imageWithURL = property.imagesWithURL[i];
        // Upload Property Images to 
        // ************************************************************************
        // console.log("uploading");
        console.log("Uploading");
        const uploadTask = storage.ref("properties/"+id+"/"+imageWithURL.id).put(imageWithURL.image);
        uploadTask.on(
          'state_changed',
          snapshot => {
            var progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
            );
            console.log(progress);
          },
          error => {
            console.log(error);
          },
          () => {
            storage.ref("properties/"+id+"/")
            .child(imageWithURL.id)
            .getDownloadURL()
            .then(url => {
              // console.log("Image url: ", url);
              
              // add the url to the property data (properties)
              // --------------------
              // addPropertyImageURL(id, url); // uid = file name
              var propertyRef = firestore.collection("properties").doc(id);
              
              // Atomically add a new imageURL to the "propertyImageURLs" array field.
              propertyRef.update({
                propertyImageURLs: firebase.firestore.FieldValue.arrayUnion(url)
              })
              // --------------------
            })
          }
        )
        // ************************************************************************
      }
      firestore.collection('notifications').add({
        content: 'Added a new listing',
        user: `${profile.firstName} ${profile.lastName}`,
        time: new Date ()
      }).then( () => {
        dispatch({type: 'CREATE_PROPERTY_SUCCESS', property: property});
      }).catch( err => {
        console.log('New listng error', err);
      })
    }).catch(err => {
      dispatch({type: 'CREATE_PROPERTY_ERROR', err});
    })
  }
};

export const updatePropertyDetails = (uid, newProperty) => {
  return (dispatch, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firestore.collection('properties').doc(uid).set(
      newProperty,
      {merge: true}
    ).then(() => {
      dispatch({type: 'PROFILE_UPDATED'})
    }).catch(err => {
      dispatch({type: 'PROFILE_UPDATE_ERROR'}, err);
    });
  }
}

export const addPropertyImageURL = (propertyId, url) => { // not used by user
  return (dispatch, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    
    var propertyRef = firestore.collection("properties").doc(propertyId);
    console.log("Uploading URL");
    // Atomically add a new imageURL to the "propertyImageURLs" array field.
    propertyRef.update({
      propertyImageURLs: firebase.firestore.FieldValue.arrayUnion(url)
    })
  }
}
export const uploadPropertyImage = (propertyId, image, name) => {
  console.log("uploading");
  return (dispatch, getState, {getFirebase, getFirestore, storage}) => {
    const state = getState();
    const firebase = getFirebase();
    const firestore = getFirestore();
    // document.getElementById('progress-bar').style.visibility = 'visible';
    console.log("Uploading");
    const uploadTask = storage.ref(`properties/${propertyId}/${name}`).put(image);
    uploadTask.on(
      'state_changed',
      snapshot => {
        var progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
        );
        console.log(progress);
        // document.getElementById('progress-status').style.width = progress+"%";
        // if (! progress<=100 ) document.getElementById('progress-status').style.color = 'green';
      },
      error => {
        console.log(error);
      },
      () => {
        console.log("Something");
        storage.ref(`properties/${propertyId}/`)
        .child(name)
        .getDownloadURL()
        .then(url => {
          console.log("Image url: ", url);
          
          // add the url to the property data (properties)
          console.log(url);
          addPropertyImageURL(propertyId, url); // uid = file name
        }).then((res) => {
          console.log(res);
          dispatch({type: 'PROPERTY_PIC_UPLOADED'});
        }).catch(err => {
          console.log(err);
          dispatch({type: 'PROPERTY_PIC_UPLOAD_ERROR', err})
        })
      }
    )
  }
}
