# nanoGallery-Server
A Node.js server that provides image content to [nanoGallery](http://nanogallery.brisbois.fr), and serves as a photo storage server, especially fit for a self-hosted photo server at home. It is similar to [nanoPhotosProvider](https://github.com/Kris-B/nanoPhotosProvider), while it is a PHP implementation. Features are:
* A folder which contains photos will be regarded as an album
* Multi-level folders represent nested albums
* No thumbnails are automatically generated...discussed below..
* Supports file extension filtering



# Installation
1. Download [Node.js runtime](https://nodejs.org/en/download/) if you don't have one on your server. Ensure that *npm* is installed.
1. Specify a folder as the root folder of the web server.
1. Install [Express](https://expressjs.com) framework to the server root folder, which serves as an easy web server. Just type

    ```
    cd <server root>
    npm install express
    ```

    on the command line.
1. Copy the index.js and files of [nanoGallery](http://nanogallery.brisbois.fr) to the server root folder
1. Create a folder named *albums* under the server root, and copy your photos into it
1. [Optional] Create thumbnail images for each album and save the them to the folder named '_thumbnail'(or whatever you wish) in each album folder. If this folder does not exist, the original photo will be selected as the thumbnail image.
1. Edit the index.js and change the parameters as you wish:

    * port: the port that web server uses, 80 as default
    * root: the folder name in the server root which contains the photos, *albums* as default. Must be the same as in the nanoGallery settings("itemsBaseURL" in index.html)
    * filter: extension name filter, only those are matched will be presented
    * thumbnailFolder: thumbnail folder name in each album folder, *_thumbnail* as default
    * thumbnailPrefix/Suffix: prefix and suffix of thumnnail filename


1. Place the index.html in the server root, and replace with your favorite nanoGallery settings.
1. Run the server via command line:

    ```
    node index
    ```

1. See the result in your browser by accessing:

    ```
    http://<server IP>:port
    ```

