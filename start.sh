#!/bin/bash
export HOME=/var/www/mnp-staff-qr-app
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
cd /var/www/mnp-staff-qr-app/mnp-qr-nextjs-code/
exec pnpm run start
