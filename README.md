# Express Microservices

### Prerequisites

- MongoDB
- If using .env.template, local instance of `mongod` running

### Install

```
npm install
```

### Run Server

```
npm start
```

## Timestamp Microservice

### Get Timestamp

#### Request

`GET /api/timestamp`

```
curl -i -H 'Accept: application/json' http://localhost:3000/api/timestamp/2023-06-23
```

#### Response

`200 OK`

```json
{
  "unix": 1687478400000,
  "utc": "Fri, 23 Jun 2023 00:00:00 GMT"
}
```

## Whoami Microservice

### Get Whoami

#### Request

`GET /api/whoami`

```
curl -i -H 'Accept: application/json' http://localhost:3000/api/whoami
```

#### Response

`200 OK`

```json
{
  "ipaddress": "your ip address",
  "language": "en-US,en;q=0.5",
  "software": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/114.0"
}
```

## Url Shortener Microservice

### Get Short Url

#### Note

_Must be a document present in database_

#### Request

`GET /api/url-shortener/:shortUrl`

```
curl -i -H 'Accept: application/json' http://localhost:3000/api/url-shortener/1
```

#### Response

`200 OK`

```json
{
  "originalUrl": "dev.to",
  "shortUrl": 1
}
```

### Create Short Url

#### Request

`POST /api/url-shortener`

```
curl -X POST http://localhost:3000/api/url-shortener
   -H 'Content-Type: application/json'
   -d '{"url": "dev.to" }'
```

#### Response

`200 OK`

```json
{
  "originalUrl": "dev.to",
  "shortUrl": 1
}
```

## File Metadata Microservice

### Get File Metadata

#### Request

`POST /api/file-metadata`

```
curl -F 'file=@/home/path/to/a/folder/fry-example.jpg' http://localhost:3000/api/file-metadata
```

#### Response

```json
{
  "name": "fry-test.jpg",
  "type": "image/jpeg",
  "size": 640254
}
```
