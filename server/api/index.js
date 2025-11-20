import app from "../src/index.js";  // your Express app

export default function handler(req, res) {
  return app(req, res);
}
