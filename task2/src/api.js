const express = require("express");
const app = express();
const cors = require("cors");
const shorten = require("../../task1/src/shorten");

app.use(cors()); // to send CORS headers.
app.use(express.urlencoded()); // to support URL-encoded bodies.
app.use(express.json()); // to support JSON-encoded bodies.

app.post("/shortcodes", function(req, res) {
  /**
   * You should probably use the function from your last
   * task in this handler; we've already 'required' it.
   * However, this route also requires that you accept a
   * custom shortcode which overrides the generator. See
   * test script for details.
   *
   * You'll probably need to use some simple data store to
   * "remember" the generated shortcodes, so that they can
   * be retrieved with the next route.
   */

   console.log("Request for shortCode received") ;
  var longUrl = req.body.url ;
  var shortCode = req.body.shortcode; 
  res.status(200) ;
  //res.setHeader('Content-Type', 'text/html/application/json');
 
  //if both url and its custom shortCode is given
  //means user want the given shortCode for its originalUrl , nor from website

  if( longUrl && shortCode)
  {

    res.end(shorten.customShortCodes(longUrl , shortCode)) ;
  }
  //call for short url 

  var shortUrl = shorten.shorten(longUrl) ;
  res.end((shortUrl));
  
});

app.get("/shortcodes/:shortcode", (req, res) => {
  /**
   * Replace the code in this handler to fetch the URL
   * corresponding to a shortcode. If invalid or missing,
   * just return a default URL: "https://www.hackkar.com".
   */

  
  const shortcodePattern = /^[0-9a-zA-Z]{6}$/;
  var shortCodeInput = req.params.shortcode ;
 
  res.status(200) ;
  res.setHeader('Content-Type', 'application/json');
 
  
  if(!(shortcodePattern.test(shortCodeInput))) //invalid shortcodes
  {
    console.log(shortCodeInput);
    res.end(JSON.stringify("https://www.hackkar.com")) ;
  
    
  }
  var longUrl = shorten.getLongUrl(shortCodeInput) ;

  if(!longUrl)  //if shortcode is missing , it will return false and we will be here
  {
        res.end(JSON.stringify("https://www.hackkar.com")) ;        
  }
  else
  {
      res.end(JSON.stringify(longUrl)) ;
  }
});

app.get("/", (_req, res) =>
  res.send(`
  <span>Hello there! This is the root URL. These are the end-points that you should work on:</span>
  <ul>
    <li><a href="/shortcodes/mYC0d3"><strong>GET</strong> <code>/shortcodes/mYC0d3</code></a></li>
    <li>
      <form action="/shortcodes" method="post">
        <input type="hidden" name="url" value="https://www.hackkar.com" />
        <button type="submit">
          <strong>POST</strong> <code>/shortcodes (url=www.hackkar.com)</code>
        </button>
      </form>
    </li>
  </ul>
  `)
);

module.exports = app;
