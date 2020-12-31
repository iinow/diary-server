# Diary Server

[![Build Status](https://travis-ci.org/iinow/diary-server.svg?branch=develop)](https://travis-ci.org/iinow/diary-server) 

[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=iinow_diary-server&metric=code_smells)](https://sonarcloud.io/dashboard?id=iinow_diary-server) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=iinow_diary-server&metric=coverage)](https://sonarcloud.io/dashboard?id=iinow_diary-server) 

## 구성 

* typescript
* express
* graphql
* apollo
* type-graphql
* typeorm
* bunyan
* db
  * influx
  * mysql
  * redis

## Getting Started 

```shell script
npm i
# update local db (host, user, password, database, port)
vim build/_db/config/local.json

npm run migrate:local-up

# update local db (host, user, password, database, port)
vim build/webpack.local.config.ts
npm run local
```

## 기능

* 일기는 하루에 1개만 작성 가능 저장 버튼을 누르지 않고 자동 저장
* 메신저 기능
* WebRTC 

## graphql 설정 방법

* 설정 방법에는 2가지 방법이 있다.
* tool 제공을 각각하는데 UI 가 다르다 개인적으로 graphql 에서 제공해주는 UI 가 나은듯?? 

1. graphql
    * express 와 graphql 라이브러리로 구성할 수 있는데 파일 만들게 많다....
2. apollo server + type graphql
    * ㅇ 
