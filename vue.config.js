module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: process.env.BASE_URL,
        onProxyRes: proxyRes => {
          if (proxyRes.headers["set-cookie"]) {
            // Need to remove 'Secure' flag on set-cookie value so browser
            // can create cookie for local development
            proxyRes.headers["set-cookie"].forEach((cookie, index, array) => {
              const newCookie = cookie
                .split(";")
                .map(value => value.trim())
                .filter(value => value !== "Secure")
                .join(";");
              array[index] = newCookie;
            });
          }
        }
      }
    }
  }
};
