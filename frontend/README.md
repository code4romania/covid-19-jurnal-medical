This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Passing environment variables to the app via Docker

When you run the docker container, use the `-e` flag to pass environment variables to the React app.

Those variables will be picked up by the `env.sh` script which is being run inside the container
and will be exported into the `/public/env-config.js` file.

Example usage:

```
docker run -p 5000:5000 -e REACT_APP_IDP_URL="http://staging.idp.stamacasa.ro" image/stamacasa
```

### Passing environment variables to the app ran locally

If you run the app locally, simply edit the `.env` file with the correct values, then

```
npm start
```

### Running browser tests
[cypress](https://www.cypress.io/) is for browser testing - more details how it works [here](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html)

The tests are setup to stub the calls to `/api`. The setup also also for verification like the use of authentication or the data sent to the server. The login is "faked" by setting the a item in the session storage emulating the one setup by the openid js client. This means that the backend doesnt need to run.

#### Commands
 * if the local server is already running: `npm run browserTest`
 * to start the local server just for the test run: `npm run startAndBrowserTest`
 * to run the tests in a real browser and see what happens: `npm run cy:open`