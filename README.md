# Tiny Url

## Installation

- Install NodeJS, MongoDB
- Install `npm` or `yarn`
- Start MongoDB
- install and start `memcached` server on port `11211` (default)
- Run `yarn dev` / `yarn start` to run normal server, or Run `yarn server` to run both `memcached` and `node` servers.
- Check `http://localhost:3000/status` to see if server works
- open `http://localhost:3000/` in browser to run template

## The services are available to run in template and with JSON response.
 - Provide header `Accept = application/json` to get response in JSON format.
   - Example :- request
    ```
    url: 'localhost:3000/addLInk'
    Headers : {
      Accept: 'applictaion/json'
    }
    body: {
      "link": "https://www.primevideo.com/storefront/tv/ref=atv_nb_sf_tv"
    }
    ```
    Response
    ```
    {
      "shortLink": "http://localhost:3000/v5odsgkh3",
      "message": ""
    }
    ```
 - if no such headers are provided thenn default template-eng will run, and provide response in `HTML` format.

## NOTE
You may encounter several problems when run the test. Be sure you already made these preparations:
- Start the `memcached` service. (If in Mac env, you can install it via homebrew (`brew install memcached`), and `brew services start memcached` :-  it will run `memcached` server at default port `11211`)
