import { getIPAddress } from "./getIPAddress";

getIPAddress

let origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : `https://${getIPAddress()}/`;

export default origin;