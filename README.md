# tabledemo

An implementation of the take-home coding test for ActiveCampaign's frontend engineer position.

## Environment Variables

The project requires several env variables to run correctly. The required keys are as follows:

**`REACT_APP_API_KEY`**
* Sensitive character sequence required to access ActiveCampaign API
* API key given to applicant via email
  
**`REACT_APP_HOST`**
* ActiveCampaign API URL
* Host API url provided to applicant via email

**`REACT_APP_HOST_PROXY`**
* Proxy server required for performing [CORS requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) against the `APP_HOST` API
* Discussed via email with applicant

## Scripts

In the project directory you can run the following scripts:

### `yarn start`

* Runs the app in the development mode
* Open [http://localhost:3000](http://localhost:3000) to view app in the browser

### `yarn lint`

* Runs the app linting tools with output printed to console

### `yarn test`

* Runs the app testing suite with output printed to the console

### `yarn run build`

* Builds the app for production to the `build` folder
* It correctly bundles React in production mode and optimizes the build for the best performance
* The build is minified and the filenames include the hashes

## References

* [Application Heroku Link](https://dw-demotable.herokuapp.com/)
  * Live demo of the `tabledemo` application
* [ActiveCampaign API Docs](https://developers.activecampaign.com/reference)
* [ActiveCampaign API Host](https://lamppoststudios.activehosted.com)
