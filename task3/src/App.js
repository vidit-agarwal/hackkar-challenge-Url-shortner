import  React, { Component } from "react";
import ReactDOM from 'react-dom';
import "./App.css";

/**
 * This React component holds the shortener UI. You'll need
 * to contact the API (as described above) and update the UI
 * to show the result in the correct div.
 *
 * If you haven't used React before, here are its docs:
 *
 * https://reactjs.org/docs/hello-world.html
 *
 * React is one of the most popular UI frameworks. It is
 * easy to learn, and is extremely powerful.
 */
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      url :'' ,
      shortCode : ''
    };

    this.handleChange = this.handleChange.bind(this) ;
    this.shortenUrl = this.shortenUrl.bind(this);
    this.unshortenCode = this.unshortenCode.bind(this);
  }


  handleChange(event) {
    
    this.setState({ [event.target.name] : event.target.value});
  }

  shortenUrl(event) {
    

    //pick the input from html tag
    //call the shorten API
    //and pass the output

     var url ={
       'url' : this.state.url
     } ;


     var formBody = [];
    
     for (var property in url) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(url[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

     fetch("http://127.0.0.1:3000/shortcodes" , {
       method: 'post' ,
       headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
       body: formBody
     })
     .then(function(response){ 
        return response.text();
     })
     .then(function(res) {
        
        /* updated part */
        const shortCode = <p>{res}</p> ;
        ReactDOM.render(shortCode , document.getElementById('app__shortcode-result'));


     });

    console.log("Contact the API and ask to shorten the URL.");
    event.preventDefault();
  }

  unshortenCode(event) {

    fetch("http://127.0.0.1:3000/shortcodes/"+this.state.shortCode , {
      method: 'get'  ,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded/json ;charset=UTF-8'
      }
    })
    .then(function(response){
      return response.json();   
    })
    .then(function(res) {
        /* updated part */
         const longUrl = <p>{res}</p> ;
         ReactDOM.render( longUrl , document.getElementById('app__url-result'));
    });



    event.preventDefault();
    console.log("Contact the API and ask to unshorten a code.");
  }

  render() {
    return (
      <div className="app">
        <h1>Shortener</h1>
        <div className="app__function">
          <form id="app__shorten-form" onSubmit={this.shortenUrl}>
            <input
              className="app__function-input"
              id="app__url-input"
              type="text"
              placeholder="Enter URL to shorten" 
              name="url"
              value={this.state.url}
              onChange= {this.handleChange} 
            />
            <input type="submit" value="Shorten" id="app__url-submit" />

            <div className="app__function-result">
              <code 
                id="app__shortcode-result"
                 >
                Shortcode should show up on the page in this div.
              </code>
            </div>
          </form>
        </div>

        <div className="app__function">
          <form id="app__unshorten-form" onSubmit={this.unshortenCode}>
            <input
              className="app__function-input"
              id="app__shortcode-input"
              type="text"
              placeholder="Enter shortcode to expand into full URL"
              name ="shortCode"
              value = {this.state.shortCode}
              onChange = {this.handleChange}
            />
            <input type="submit" value="Unshorten" id="app__shortcode-submit" />
            <div className="app__function-result">
              <code id="app__url-result">
                Full URL should show up in this div.
              </code>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
