const http = require('http'); // pull in the HTTP server module
const fs = require('fs');  // pull in the file system module

/**
  set the port to run the server on. We use process.env.PORT and
  process.env.NODE_PORT in case this is on a server
  using the OR operator we have it default to 3000 if the
  process.env variables are not set
  This will make it work on a server or locally
**/
const port = process.env.PORT || process.env.NODE_PORT || 3000;

/**
  read the client html file into memory.
  __dirname in node is the current directory
  (in this case the same folder as the server js file)
  We read this in synchronously on startup to guarantee it loads
  into memory before starting but normally we don't want to run
  synchronous code since it drastically slows down the server.
  Like in this case, it's okay to run this because it runs on
  server start before the server is operational then it never
  runs again
**/
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

/**
  call back for requests
  Remember that the request function automatically receives a
  request and response object from the HTTP server module. The
  request object is the HTTP request and the response object is
  the prefilled out object for response. This is the object you
  will send back to a user.
**/
const onRequest = (request, response) => {
  /**
    see the url. You will notice that some browsers
    show two URL requests. One for the page and one
    for the favicon
  **/
  console.log(request.url);

  /**
    This is where you would do server logic for determining which
    page to load or file to send
  **/

  /**
    send the response code (200 for okay, 404 for file not found, etc)
    Set the content-type header (needed for HTTP requests) to text/html
    so the client knows this is html NOT plain text. That will allow a
    browser to interpret the HTML instead of show it
  **/
  response.writeHead(200, { 'Content-Type': 'text/html' });

  // write out our response data - in this case, writing the entire
  // file we loaded above
  response.write(index);

  // send the response. This will close the stream and send back the
  // response. You won't be able to write any more to this response.
  response.end();
};

// start up our HTTP server, set the request callback and start the port
http.createServer(onRequest).listen(port);

// Message just so we can see that the server started successfully and is ready.
console.log(`Listening on 127.0.0.1: ${port}`);
