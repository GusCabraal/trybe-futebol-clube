module.exports = {
  all: true,
  extends: "@istanbuljs/nyc-config-typescript",
  exclude: [
    'src/tests',
    'src/database/config',
    'src/database/migrations',
    'src/database/seeders',
    'src/entities',
    'src/repositories/interfaces',
    'src/server.ts',
    'src/app.ts'

  ],
  include: ['src/**/*.ts']
};
