module.exports = {
  async headers() {
    return [
      {
        source: '/api/login',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Pode restringir a origem conforme necessário
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'OPTIONS, POST, GET, DELETE, PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ];
  },
};
