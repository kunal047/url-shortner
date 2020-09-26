

# URL Shortner
### Requirement
NodeJS (v10 and above)

### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd url-shortner
$ npm install
$ npm start
```
You can access the postman collection [here](https://www.getpostman.com/collections/1d41fa87006d90029cb0)

### Docker
By default, the Docker will expose port 3000, so change this within the Dockerfile if necessary. When ready, simply use the Dockerfile to build the image.

```sh
cd url-shortner
docker build -t krc04/url-shortner .
```
This will create the url-shortner image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on your host. In this example, we simply map port 3000 of the host to port 3000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run -d -p 3000:3000 --restart="always" <youruser>/url-shortner
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
127.0.0.1:3000
```

License
----

MIT