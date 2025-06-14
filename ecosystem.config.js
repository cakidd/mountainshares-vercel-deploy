module.exports = {
  apps: [{
    name: 'mountainshares-emergency',
    script: 'src/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
      LOG_LEVEL: 'info',
      EMERGENCY_CONTRACT_ADDRESS: '0x3fef8E59882B99f52823E3fc859D0815600a54A9',
      MOUNTAIN_SHARES_ADDRESS: '0x63094beea3241C3D6D1ec886d5C7AE8BD23C1fB2',
      IPFS_HERITAGE_ADDRESS: '0x013A2FCdC454D51e55Ab7e3a1e501f3f5262eAdd',
      NETWORK: 'sepolia',
      WEATHER_CHECK_INTERVAL: '300'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true
  }]
};
