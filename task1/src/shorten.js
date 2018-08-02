var urlArray = [] ; 
var charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; //our desired characters in encoding of URL
var base = charset.length; //62
var baseCase = 1923874065; //just using a random base number to make a fixed length string . 
function encode(num){
  var encoded = '';
  while (num){
    var remainder = num % base;
    num = Math.floor(num / base);
    encoded = charset[remainder].toString() + encoded;
  }
  return encoded;
}
function shorten(url) {
  /**
   * Flesh out this function so that it returns a unique
   * string that's six characters in length. With a charset
   * that includes numbers (0-9) and letters (a-z, A-Z),
   * this allows for 62 ^ 6, or over 56 billion possible
   * URLs. That's quite enough for this example. :-)
   *
   * You can check `tests/index.test.js` to see the criteria
   * that this function should satisfy. You can run all
   * tests from the command line as follows:
   *
   *     $ npm run test
   *
   * Have fun!
   */

  //here url is taken as an input fron the user
   var longURL =  url; //declaring the longURL variable
   var shortURL = '';  //declaring the short URL variable

   if(urlArray.indexOf(longURL) == -1) //means that the longUrl is coming first time
   {
       
        var newIndex = urlArray.push(longURL) - 1;
        shortURL =  encode(newIndex+baseCase) ;
   }
   else
   {
    
     var index = urlArray.indexOf(longURL)  ;
     shortURL =  encode(index+baseCase) ;
   }
    return shortURL ;
}
function decoded(shortCode)
{
  var decoded = 0;
  while (shortCode){
    var index = charset.indexOf(shortCode[0]);
    var power = shortCode.length - 1;
    decoded += index * (Math.pow(base, power));
    shortCode = shortCode.substring(1);
  }

  return decoded ;
}

function getLongUrl(shortCode)
{
  
  var originalUrl ;
  var decodedId = decoded(shortCode) ;
  decodedId = decodedId - baseCase ;
  if(urlArray[decodedId]) //means found shortCode
     originalUrl = urlArray[decodedId] ;
  else
    return false ;

  return originalUrl ;
}
/* updated part for customShortCodes */
function customShortCodes(customUrl , shortCode)
{
    var customId = decoded(shortCode) ;
    customId= customId - baseCase ;    
    urlArray[customId] = customUrl ;
    return shortCode ;
}

module.exports = {
  shorten : shorten ,
  getLongUrl : getLongUrl ,
  customShortCodes : customShortCodes  
}