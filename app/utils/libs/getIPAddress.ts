const { networkInterfaces } = require("os");

export function getIPAddress() {
  const results: any = {};
  const netInterfaces = networkInterfaces();

  for (const name of Object.keys(netInterfaces)) {
    for (const net of netInterfaces[name]) {
      const iPv4 = typeof net.family === "string" ? "IPv4" : 4;
      if (net.family === iPv4 && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    }
  }

  return results[Object.keys(results)[0]]?.[0] ?? "127.0.0.1";
}