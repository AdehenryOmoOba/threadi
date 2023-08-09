let origin =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3000/"
    : "https://shopi-ten.vercel.app/";

export default origin;