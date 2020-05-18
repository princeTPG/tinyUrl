
echo "---------------------------------"
echo "Starting memcached server, if not started."
echo "---------------------------------"
brew services start memcached
echo "---------------------------------"
echo "Running Node server"
echo "---------------------------------"
yarn dev
echo "---------------------------------"