# UncleSnail.github.io
The repository for www.CalebMarcoux.com

The app folder contains the development versions of all the files.
The dist folder contains the compiled and optimized versions.
Files should not be placed into this folder except by the Gulp build process or unless they are production ready, minified, etc. (example, 3rd party repositories).
The Other Files folder contains mostly artifacts from the design process and noncritical files.

To run gulp, first install all dependencies through npm (`npm install`), then run the gulp commands to automatically create builds. Use the command `gulp` to run the default build without automatic updating. Run `gulp watch` to run Gulp with watched files and automatic browser refreshing. (If the npm modules folder is not in your PATH, you must run `npx gulp`). Your browser should open automatically, but to test on mobile please direct a browser to the IP of your computer on your local network, port 3000.
