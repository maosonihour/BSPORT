ImagePicker.showImagePicker(options, response => {

  if (response.didCancel) {
    // alert cancel
  } else if (response.error) {
    // alert error
  } else {
    const { uri } = response;
    const extensionIndex = uri.lastIndexOf(".");
    const extension = uri.slice(extensionIndex + 1);

    const file = {
      uri,
      name: `${YourAppName}_${moment.utc().format("YYYY-MM-DD-HH-mm-ss")}.${extension}`,
      type: "image/jpeg"
    };

    const options = {
      keyPrefix: ****,
      bucket: ****,
      region: ****,
      accessKey: ****,
      secretKey: ****
    };

    // send file to aws s3 and to your db ...

    RNS3.put(file, options)
      .progress(event => {
        console.log(`percent: ${event.percent}`);
      })
      .then(response => {
        if (response.status !== 201) {
          console.error(response.body);
          return;
        }

        // this will contain the image url
        let image = response.headers.Location;

        // send image url to your db

      })
  })