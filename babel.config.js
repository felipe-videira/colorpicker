module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './assets',
            copyrights: './copyrights.json',
            gameConfig: './gameConfig.json',
          },
        },
      ],
    ],
  };
};
