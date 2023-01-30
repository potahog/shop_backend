# shop_backend

## Getting Start
start server in develop mode. (running nodemon)
```
$ npm run dev
```
start server
```
% npm run start
```
### Config **`.env`**
Create .env file in project root path. and write this in .env
```plantext
PORT=<$Your DB Access Porot>
MONGO_URI=<$Your DB Host Access URI>
DB_USER=<$Your DB Access User ID>
DB_PASSWORD=<$Your DB Access User Password>
DB_NAME=<$Using DB Name>
DB_COLLECTION_NAME_USER=<$Using user info collection name>
SECRET_KEY=<%Your SHA256 Secret Key>
```