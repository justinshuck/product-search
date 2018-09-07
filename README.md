# Product API search

Instructions can be found: https://gist.github.com/daniyalzade/8e32cd266aebd6d2ce35

## Project Overview:
Provide a product searching API that can take a productSearch keyword and return a list of products that contain the word in the product description



### Technologies
- Web Framework - [Hapi](https://github.com/hapijs/hapi)
- Object validation - [joi](https://github.com/hapijs/joi)
- Logging - [Bunyan](https://github.com/trentm/node-bunyan)
- Searching -[Fuse.js](https://github.com/krisk/Fuse)
- Testing tools - [Mocha](https://github.com/mochajs/mocha), [chai](https://github.com/chaijs/chai), [nyc](https://github.com/istanbuljs/nyc), [sinon](https://github.com/sinonjs/sinon)
- Linting - [standard](https://github.com/standard/standard)
- Config - [config](https://github.com/lorenwest/node-config)

### Getting started
The first step is obtaining an API key and putting it in `config/default.json`. As a note - if an environment is not found then this will be the default values that will be pulled from configuration. A basic config should look like:

```
  "product": {
    "hostname": "http://api.walmartlabs.com",
    "apiKey": "<YOUR_API_KEY>"
  },
  "serverConfig": {
    "port": "<SERVICE_PORT>"
  }
```

Download the dependencies and then you can run the application in a development mode:
```$javascript
npm install
npm start
```


#### Usage
There are two ways to run the application, develop-like and production. The develop-like run will watch files and restart the service when files are detected. This can be helpful when you are debugging the service locally. 
To run the service in develop mode, run:
```
npm start
```
The production  mode transpiles the code into `dist/` and is primarily configured to run in a docker container. There are a few docker npm scripts that are meant to quickly build and run locally.

To build the image (including building the `dist/` directory), run:
```
npm run docker:build
```

To run it locally in detached mode, run:
```
npm run docker:run
```

Since the project uses Bunyan and reading json on the screen can become an eye-sore, this comand pipes the log stream into a more readable format:
```
npm run docker:logs
```

### Architecture
The architecture of this project relies on building a local cache on startup that then can be accessed later during the runtime. The caching only stores `itemId`, `shortDescription` and `longDescription`. Fuse is used to do a fuzzy search on keys in the cache and returns items that are scored as an exact match. There are some pros and cons to this approach:

Pros:
- Once the cache is built, queries are relatively fast (compared to querying each item during a request). Response times were cut from around 8000ms to <1000ms for most test cases
- This hinges on item description being relatively static. We can store the more static data in the cache (to display in a search bar) and then have the client make a product request to get further information when they click on the item

Cons:
- Local caching can cause issues in scale. This means that each service (on startup and potentially on a cron) will maintain their own copy of the cache. If this is a large cache, it can become expensive to scale the services
- Coupling between product search logic and caching logic

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)
