## Civic-Reactor-App

## Install Tooling

install Git (https://git-scm.com/downloads)

install VSCode (https://code.visualstudio.com/Download)

install NodeJS (https://nodejs.org/en/download/)


## Clone the repo

open VSCode in admin mode

open a powershell terminal window (ctrl + ') - all commands below are used within the terminal

clone the repository  
`git clone https://github.com/civicreactor/Civic-Reactor-App.git`

open the folder in VSCode

## Install global dependencies

install Ionic (https://ionicframework.com/docs/intro/installation/)  
`npm install -g ionic cordova`

install nope-gyp (https://github.com/nodejs/node-gyp#on-windows)  
`npm install -g --production windows-build-tools`

## Install project dependencies

`npm i @ionic/cloud-angular`

`npm i ng2-cordova-oauth`

`npm i --save lodash plugin add cordova-plugin-geolocation`

`npm i --save @ionic-native/core @ionic-native/geolocation`

`npm i`

## Run the app

`ionic serve`

## Windows users

if you have VS installed and not building due to "CL.exe":  
- ensure Visual Studio C++ Build Tools are installed  
- `npm config set msvs_version 2017 -g`
