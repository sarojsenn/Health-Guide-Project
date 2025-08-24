# Deployment Guide - Water Quality Monitoring System

This guide provides step-by-step instructions for deploying the Water Quality Monitoring System to various environments.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Deployment](#local-deployment)
- [Staging Deployment](#staging-deployment)
- [Production Deployment](#production-deployment)
- [Cloud Deployment Options](#cloud-deployment-options)
- [Monitoring and Maintenance](#monitoring-and-maintenance)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### System Requirements
- Node.js 18+ 
- npm or yarn package manager
- Web server (nginx/Apache) for production
- SSL certificate for HTTPS (production)
- Domain name (production)

### API Keys and Secrets
- Google Gemini API key
- Any additional third-party service keys

### Server Resources
- **Minimum**: 1 CPU, 512MB RAM, 5GB storage
- **Recommended**: 2 CPU, 2GB RAM, 20GB storage
- **Production**: 4+ CPU, 4GB+ RAM, 50GB+ storage

## Environment Setup

### Environment Variables

Create a `.env` file in the backend directory:

```bash
# API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent

# Server Configuration
PORT=3000
NODE_ENV=production

# File Upload Configuration
MAX_FILE_SIZE=10485760  # 10MB
UPLOAD_PATH=./uploads

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Security
SESSION_SECRET=your_random_session_secret_here

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/app.log
```

## Local Deployment

### Quick Start

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd "Water And Sanitation"
   ```

2. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

4. **Create required directories**:
   ```bash
   mkdir -p uploads logs
   ```

5. **Start the application**:
   ```bash
   npm start
   ```

6. **Access the application**:
   - Open browser to `http://localhost:3000`

### Development Mode

For development with auto-reload:

```bash
# Install nodemon globally
npm install -g nodemon

# Start in development mode
cd backend
nodemon server.js
```

## Staging Deployment

### Server Setup (Ubuntu/Debian)

1. **Update system**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. **Install PM2 (Process Manager)**:
   ```bash
   sudo npm install -g pm2
   ```

4. **Create application user**:
   ```bash
   sudo adduser --system --group waterquality
   sudo mkdir -p /var/www/waterquality
   sudo chown waterquality:waterquality /var/www/waterquality
   ```

### Application Deployment

1. **Deploy application files**:
   ```bash
   # Copy files to server
   scp -r . user@your-server:/var/www/waterquality/
   
   # Or use git
   sudo -u waterquality git clone <repository-url> /var/www/waterquality
   ```

2. **Install dependencies**:
   ```bash
   cd /var/www/waterquality/backend
   sudo -u waterquality npm ci --production
   ```

3. **Set up environment**:
   ```bash
   sudo -u waterquality cp .env.staging .env
   # Edit environment variables as needed
   ```

4. **Create PM2 ecosystem file**:
   ```bash
   # /var/www/waterquality/ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'water-quality-staging',
       script: './backend/server.js',
       cwd: '/var/www/waterquality',
       instances: 1,
       exec_mode: 'fork',
       env: {
         NODE_ENV: 'staging',
         PORT: 3001
       },
       error_file: './logs/err.log',
       out_file: './logs/out.log',
       log_file: './logs/combined.log',
       time: true
     }]
   }
   ```

5. **Start application with PM2**:
   ```bash
   cd /var/www/waterquality
   sudo -u waterquality pm2 start ecosystem.config.js
   sudo -u waterquality pm2 save
   sudo pm2 startup
   ```

### Reverse Proxy Setup (nginx)

1. **Install nginx**:
   ```bash
   sudo apt install nginx -y
   ```

2. **Create nginx configuration**:
   ```bash
   # /etc/nginx/sites-available/water-quality-staging
   server {
       listen 80;
       server_name staging.your-domain.com;
       
       client_max_body_size 10M;
       
       location / {
           proxy_pass http://localhost:3001;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
       
       location /uploads {
           alias /var/www/waterquality/backend/uploads;
           expires 30d;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. **Enable site**:
   ```bash
   sudo ln -s /etc/nginx/sites-available/water-quality-staging /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

## Production Deployment

### SSL Certificate Setup

1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain SSL certificate**:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

### Production nginx Configuration

```nginx
# /etc/nginx/sites-available/water-quality-production
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com www.your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    
    client_max_body_size 10M;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    location /uploads {
        alias /var/www/waterquality/backend/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### Production PM2 Configuration

```javascript
// ecosystem.production.config.js
module.exports = {
  apps: [{
    name: 'water-quality-production',
    script: './backend/server.js',
    cwd: '/var/www/waterquality',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    max_memory_restart: '1G',
    restart_delay: 4000
  }]
}
```

## Cloud Deployment Options

### AWS Deployment

#### Using EC2

1. **Launch EC2 instance**:
   - Ubuntu 22.04 LTS
   - t3.small or larger
   - Configure security groups (HTTP/HTTPS)

2. **Follow standard deployment steps**

3. **Use Application Load Balancer** for high availability

#### Using AWS App Runner

1. **Create App Runner service**:
   ```json
   {
     "serviceName": "water-quality-monitoring",
     "sourceConfiguration": {
       "imageRepository": {
         "imageIdentifier": "your-ecr-repo/water-quality:latest",
         "imageConfiguration": {
           "port": "3000",
           "startCommand": "npm start",
           "runtimeEnvironmentVariables": {
             "NODE_ENV": "production"
           }
         }
       }
     }
   }
   ```

### Google Cloud Platform

#### Using Cloud Run

1. **Create Dockerfile**:
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   COPY backend/package*.json ./
   RUN npm ci --production
   
   COPY backend/ .
   COPY frontend/ ./public/
   
   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Deploy to Cloud Run**:
   ```bash
   gcloud run deploy water-quality-monitoring \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

### DigitalOcean App Platform

1. **Create app specification**:
   ```yaml
   # .do/app.yaml
   name: water-quality-monitoring
   services:
   - name: api
     source_dir: /backend
     github:
       repo: your-username/water-quality-monitoring
       branch: main
     run_command: npm start
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NODE_ENV
       value: production
     - key: GEMINI_API_KEY
       value: ${GEMINI_API_KEY}
       type: SECRET
   ```

## Monitoring and Maintenance

### Application Monitoring

1. **PM2 Monitoring**:
   ```bash
   pm2 monit
   pm2 status
   pm2 logs
   ```

2. **System Monitoring**:
   ```bash
   # Install monitoring tools
   sudo apt install htop iotop nethogs -y
   
   # Check system resources
   htop
   df -h
   free -m
   ```

### Log Management

1. **Configure log rotation**:
   ```bash
   # /etc/logrotate.d/water-quality
   /var/www/waterquality/logs/*.log {
       daily
       missingok
       rotate 14
       compress
       notifempty
       create 0640 waterquality waterquality
       postrotate
           pm2 reloadLogs
       endscript
   }
   ```

### Automated Backups

1. **Database backups** (when implemented):
   ```bash
   # Create backup script
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/var/backups/waterquality"
   mkdir -p $BACKUP_DIR
   
   # Backup uploads directory
   tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /var/www/waterquality/backend/uploads
   
   # Keep only last 7 days of backups
   find $BACKUP_DIR -name "uploads_*.tar.gz" -mtime +7 -delete
   ```

2. **Schedule with cron**:
   ```bash
   # Add to crontab
   0 2 * * * /usr/local/bin/backup-waterquality.sh
   ```

### Security Updates

1. **Automated security updates**:
   ```bash
   sudo apt install unattended-upgrades -y
   sudo dpkg-reconfigure unattended-upgrades
   ```

2. **Application updates**:
   ```bash
   # Create update script
   #!/bin/bash
   cd /var/www/waterquality
   sudo -u waterquality git pull origin main
   cd backend
   sudo -u waterquality npm ci --production
   sudo -u waterquality pm2 reload all
   ```

## Troubleshooting

### Common Issues

1. **Application won't start**:
   ```bash
   # Check logs
   pm2 logs
   
   # Check environment variables
   sudo -u waterquality printenv
   
   # Test manually
   cd /var/www/waterquality/backend
   sudo -u waterquality node server.js
   ```

2. **File upload issues**:
   ```bash
   # Check permissions
   ls -la uploads/
   
   # Fix permissions if needed
   sudo chown -R waterquality:waterquality uploads/
   sudo chmod -R 755 uploads/
   ```

3. **Nginx issues**:
   ```bash
   # Check nginx status
   sudo systemctl status nginx
   
   # Check configuration
   sudo nginx -t
   
   # Check error logs
   sudo tail -f /var/log/nginx/error.log
   ```

4. **SSL certificate issues**:
   ```bash
   # Check certificate expiry
   sudo certbot certificates
   
   # Renew if needed
   sudo certbot renew --dry-run
   ```

### Performance Issues

1. **High memory usage**:
   ```bash
   # Check memory usage
   free -m
   
   # Restart application if needed
   pm2 restart all
   
   # Consider increasing instance memory limits
   ```

2. **Slow response times**:
   - Check Gemini API rate limits
   - Monitor network latency
   - Consider implementing caching
   - Optimize image processing

### Health Check Script

Create a health check script:

```bash
#!/bin/bash
# /usr/local/bin/health-check.sh

URL="https://your-domain.com"
STATUS=$(curl -o /dev/null -s -w "%{http_code}" $URL)

if [ $STATUS -eq 200 ]; then
    echo "✅ Application is healthy"
    exit 0
else
    echo "❌ Application is unhealthy (Status: $STATUS)"
    # Optionally restart application
    pm2 restart all
    exit 1
fi
```

Schedule regular health checks:
```bash
# Add to crontab
*/5 * * * * /usr/local/bin/health-check.sh >> /var/log/health-check.log 2>&1
```

---

This deployment guide should be updated as the application evolves and new deployment requirements emerge.
