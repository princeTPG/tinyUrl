# Tiny Url

## Installation

- Install NodeJS, MongoDB
- Install `npm` or `yarn`
- Start MongoDB
- install and start `memcached` server on port `11211` (default)
- Run `yarn dev` or `npm run dev` to run normal server
- Check `http://localhost:3000/status` to see if server works

## NOTE
You may encounter several problems when run the test. Be sure you already made these preparations:
- Start the `memcached` service. (If in Mac env, you can install it via homebrew (`brew install memcached`), and `brew services start memcached` :-  it will run `memcached` server at default port `11211`)
