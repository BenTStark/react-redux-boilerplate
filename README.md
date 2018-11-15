# React-Redux Boilerplate

This Boilerplate is the base for React-Redux Websites. Additional functionalities and code will be provided in the toolbox repository. The main skeleton was build according to [react-boilerplate tutorial](https://medium.freecodecamp.org/how-to-build-your-own-react-boilerplate-2f8cbbeb9b3f) by Nick Karnik. Great Thanks to him.

I updated the original tutorial devDependencies to [webpack 4.x](https://webpack.js.org/) and [babel 7.x](https://babeljs.io/).

## Installation
Clone git repo then

    npm install
    npm run build
    nmp start

After that a simple web server hosts your site on localhost:8000.

## Scripts

    # npm run clean

Runs the [rimraf](https://www.npmjs.com/package/rimraf) package for cleaning up ./dist and ./node_modules

    # npm test

Running Test with [jest](https://jestjs.io/docs/en/getting-started) package. For detailed information about Testing go to [Testing](###Testing)

## Introduction - 101
### File Arrangement
Most React-Redux projects have functional folders, i.e. all components are in components directory or all reducers are in the reducer directory.
This boilerplate has a folder structure which is oriented by content. For example all reducers, actions, etc. for the Blog section of a website can be found in
the top directory named "Blog".
Here comes a detailed explanation of the structure.

#### Definitions
##### Basics
Basics can be found in the root directory. These are common files like
- package.json
- .babelrc
- index.html
- configureStore.js
etc.

##### Feature
It is the top content category. This can be e.g. the "Blog", "Contact" or "Home" section of a website. This doesn't have to be a single component. Usually several different components and/or
react container can be found within one Feature.

##### Celement
Stands for *C*omponent/*C*ontainer *E*lement. It depends on the Use Case whether you need react container or react components. However it is each Feature must have a Celement having the same name
as the feature.

##### Duck
This is an approach where you bundle all your redux code into one duck file or folder. See https://medium.freecodecamp.org/scaling-your-redux-app-with-ducks-6115955638be . In this case we use a duck folder where you can
find all the logic of one feature. It is separated in files containing actions, the reducer, types, etc.

#### Folder Structure
    .
    |--src
    |  |--client
    |  |  |--Feature<1>
    |  |  |  |--duck
    |  |  |  |  |--action.js
    |  |  |  |  |--operation.js
    |  |  |  |  |--operation.test.js
    |  |  |  |  |--types.js
    |  |  |  |  |--reducer.js
    |  |  |  |  |--reducer.test.js
    |  |  |  |--celement.container.js
    |  |  |  |--celement.component.js
    |  |  |  |--celement.test.js
    |  |  |  |--celement.scss
    |  |  |--Feature<2>
    |  |  |  |--...
    |  |  |--index.js
    |  |  |--rootreducer.js
    |  |  |--configureStore.js
    |  |--server
    |  |--enzyme.setup.js
    |-- <basics>


### Routing

### Redux implementation
#### Store

#### Reducer

### Middleware


### API Fetching with Axios

### Authentification with Auth0

### CSS - Layout
#### SASS
#### Bootstrap

### Progressive Web App (PWA) implementation
Not yet implemented.

### Server Side Rendering & Hot Reload
Not yet implemented.

### Testing
