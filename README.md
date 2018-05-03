# bruncilli

A online food ordering website build with React and PHP laravel

![Demo Video](https://media.giphy.com/media/9ryLmyELCzZaSYw9xb/giphy.gif)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/)
* [php](http://php.net/)
* [composer](https://getcomposer.org/)
* An access key and app id from [Unsplash](https://unsplash.com/developers)

### Installing

#### Front-end part

Rename `example.env` to `.env` and add the keys you generated

```sh
REACT_APP_UNSPLASH_APP_ID=
REACT_APP_UNSPLASH_ACCESS_CODE=
```

Install the required packages and run the local server

```sh
yarn start
yarn
```

#### Back-end part

Install laravel framework

```sh
composer global require "laravel/installer"
```

Naviage to `/api` folder

Create a database then rename `.env.example` to `.env` add database variables

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

Install the required packages and run the local server

```sh
composer install
```

Generate database tables and relations

```sh
php artisan migrate
```

Create `img` folder inside `storage/app/public` and run

```sh
php artisan storage:link
```

Run the localhost

```sh
php artisan serve
```

### And coding style tests

Front-end part is following Airbnb styles guide

## Create production builds

### Front-end part

```sh
yarn build
```

### Back-end part

Repeat back-end part installion steps on the server

## Built With

* [create-react-app](https://github.com/facebook/create-react-app)

## License

This project is licensed under the MIT License
