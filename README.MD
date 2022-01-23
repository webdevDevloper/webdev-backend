# webdev-backend

|            |                                                  Status                                                   |
| :--------: | :-------------------------------------------------------------------------------------------------------: |
|  Staging   | ![]() |
| Production | ![Build status](https://dev.azure.com/votruongtrunghieu/Webdev%20Entry%20Task/_apis/build/status/Webdev%20Entry%20Task-CI) |
| CI/CD | Azure Devops |
| Server | Amazon EC2 |
| IPv4 | 34.225.250.142 |
| Swagger | [webdev-studio](https://app.swaggerhub.com/apis/webdev-studio/All/1.0.0-oas3) |
| DOC APIs | [APIs DOC](https://docs.google.com/document/d/1dn9fPTVcQdfci9z7JqQ5oIBDMrSyUy_0huUOpRRvCxY/edit?usp=sharing)|



# Description

Backend for Webdev Studio Entry Task

# How to run

Development:

```sh
npm install
npm run dev
```


# Format code with Prettier

Run this command in the beginning:

```sh
npm run husky-prepare
```

Whenever you make a new commit, Prettier will format your code automatically.

If you want to run Prettier manually:

```sh
npm run pret
```

# Notice

Developers can modify everything but please provide the scripts to run dev, lint and test.

For example:

-   Developers can change the place of test files, developers can add test config
-   Developers can change the folder structure
-   Developers can change the content inside `src` folder but please remain the `server.js` file.

