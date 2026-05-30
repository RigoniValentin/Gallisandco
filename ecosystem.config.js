// PM2 Ecosystem – Galli's & Co. Frontend
// Usage on VPS:
//   pm2 start ecosystem.config.js --env production
//   pm2 save
//   pm2 startup

/** @type {import('@types/pm2').StartOptions} */
module.exports = {
  apps: [
    {
      name: "gallisandco-front",
      // With output:'standalone', Next.js bundles a self-contained server.js
      script: "server.js",
      cwd: "/home/Gallisandco/.next/standalone",
      instances: 1,
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: 3019,
        HOSTNAME: "127.0.0.1", // Nginx hace el proxy; solo escucha en localhost
      },
      // Auto-restart on crash / memory threshold
      watch: false,
      max_memory_restart: "512M",
      // Logging
      error_file: "/var/log/pm2/gallisandco-front-error.log",
      out_file: "/var/log/pm2/gallisandco-front-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
    },
  ],
};
