# webdev-backend

|            |                                                  Status                                                   |
| :--------: | :-------------------------------------------------------------------------------------------------------: |
|  Staging   | ![Build status](https://dev.azure.com/votruongtrunghieu/Webdev%20Entry%20Task/_apis/build/status/Webdev%20Entry%20Task-CI) |
| Production | ![]() |
| CI/CD | Azure Devops |
| Server | Amazon EC2 |
| IPv4 | 34.225.250.142 |



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

# Notice

Developers can modify everything but please provide the scripts to run dev, lint and test.

For example:

-   Developers can change the place of test files, developers can add test config
-   Developers can change the folder structure
-   Developers can change the content inside `src` folder but please remain the `server.js` file.

