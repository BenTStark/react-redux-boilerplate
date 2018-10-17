# React-Redux Boilerplate

This Boilerplate is the base for React-Redux Websites. Additionial functionalities and code will be provided in the toolbox repository. The main sceleton was build according to [react-boilerplate tutorial](https://medium.freecodecamp.org/how-to-build-your-own-react-boilerplate-2f8cbbeb9b3f) by Nick Karnik. Great Thanks to him.

I updated the original tutorial devDependencies to [webpack 4.x](https://webpack.js.org/) and [babel 7.x](https://babeljs.io/).

## Setup

Clone git repo then

    npm install
    npm run build
    nmp start
    
After that a simple webserver hosts your site on localhost:8000.

## Scripts

    # npm run clean
    
Runs the [rimraf](https://www.npmjs.com/package/rimraf) package for cleaninig up ./dist and ./node_modules

    # npm test

Running Test with [jest](https://jestjs.io/docs/en/getting-started) package on webserver
