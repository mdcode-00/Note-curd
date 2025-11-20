import app from "../server/src/index.js";  // your Express app

export default function handler(req, res) {
  return app(req, res);
}
