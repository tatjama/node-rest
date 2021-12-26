# Tatjana Marković REST api

## Table of contents

  - [Instruction](#instruction)
  - [Overview](#overview)
  - [Built with](#built-with)
  - [Author](#author)

## Instruction:
1. run server in development mode with
    npm run dev
2. production build with
    npm run build
    run server in production mode with
    npm start
3. compile TypeScript with
    tsc
4. find it on
    http://localhost:5000
5. start ESlint with
    npm run lint

## Overview
    REST api 

## Structure
 Two folders (common and users) to have individual modules that have their own responsibilities.
1. ./app.ts
2. ./common/
    common.routes.config.ts
3. ./users/
    users.routes.config.ts
Inside every folder we are going to have some or all of modules

 - Route configuration - to define the requests our API can handle
 - Services - for tasks such as connecting to our database models, doing queries, or connecting to external services that are required by the specific request, make our code cleaner by encapsulating business logic operations into functions that middleware and controllers can call
 - Middleware - for running specific request validations before the final controller of a route handles its specifics
 - Models - for defining data models matching a given database schema, to facilitate data storage and retrieval
 - Controllers - for separating the route configuration from the code that finally (after any middleware) processes a route request, calls the above service functions if necessary, and gives a response to the client.

## Build with 
    1. Node.js
    2. Express
    3. TypeScript
    4. ESlint 
    5. CORS - Without this, our API would only be usable from front ends being served from the exact same subdomain as our back end.
    6. debug - Avoid using console.log
    7. Winston - is responsible for logging requests to our API and the responses (and errors) returned.
## Author
- Website - [Tatjana Markovic](https://my-react-portfolio-tatjana.vercel.app/)
- LinkedIn - [Tatjana Marković](https://www.linkedin.com/in/tatjana-markovi%C4%87-919501189/)
- GitHub - [tatjama](https://github.com/tatjama)

