// const express = require('express')
// export default class WebServer {
//   constructor () {
//     this.app = express()
//     this.app.use(express.static('dist/public'))
//   }
//   start () {
//     return new Promise((resolve, reject) => {
//       try {
//         this.server = this.app.listen(8000, function () {
//           resolve()
//         })
//       } catch (e) {
//         console.error(e)
//         reject(e)
//       }
//     })
//   }
//   stop () {
//     return new Promise((resolve, reject) => {
//       try {
//         this.server.close(() => {
//           resolve()
//         })
//       } catch (e) {
//         console.error(e.message)
//         reject(e)
//       }
//     })
//   }
// }

const express = require("express");
const path = require("path");

export default class WebServer {
  constructor() {
    this.app = express();
    this.app.use(express.static(path.join(__dirname, "dist/public")));
    this.app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname + "dist/public/index.html"));
    });
  }
  start() {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(8000, function() {
          resolve();
        });
      } catch (e) {
        console.error(e);
        reject(e);
      }
    });
  }
  stop() {
    return new Promise((resolve, reject) => {
      try {
        this.server.close(() => {
          resolve();
        });
      } catch (e) {
        console.error(e.message);
        reject(e);
      }
    });
  }
}
