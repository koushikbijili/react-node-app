server: {
  port: 3000,
  proxy: {
    "/api": {
      target: "http://52.66.16.153:5000",
      changeOrigin: true,
    },
    "/socket.io": {
      target: "http://52.66.16.153:5000",
      ws: true,
      changeOrigin: true,
    },
  },
},
