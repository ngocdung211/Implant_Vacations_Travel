#!/bin/bash
set -euo pipefail

PROJECT_DIR="/home/ec2-user/Implant_Vacations_Travel"
BRANCH="copilot/setup-flask-backend"
SERVICE_NAME="medical-clinic"
APP_PORT="4999"
SWAP_FILE="/swapfile"
SWAP_SIZE_MB="1024"

function echo_message() {
    echo "============================================"
    echo "$1"
    echo "============================================"
}

function require_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        echo "Missing required command: $1"
        exit 1
    fi
}

require_command git
require_command python3
require_command curl
require_command systemctl

if [ ! -d "$PROJECT_DIR/.git" ]; then
    echo "Project directory is missing or not a Git repository: $PROJECT_DIR"
    echo "Clone the private repository to $PROJECT_DIR before running this script."
    exit 1
fi

if [ ! -f "$SWAP_FILE" ]; then
    echo_message "Creating ${SWAP_SIZE_MB}MB swap file"
    sudo fallocate -l "${SWAP_SIZE_MB}M" "$SWAP_FILE"
    sudo chmod 600 "$SWAP_FILE"
    sudo mkswap "$SWAP_FILE"
    sudo swapon "$SWAP_FILE"
    if ! grep -q "^$SWAP_FILE " /etc/fstab; then
        echo "$SWAP_FILE none swap sw 0 0" | sudo tee -a /etc/fstab >/dev/null
    fi
else
    echo_message "Swap file already exists"
fi

echo_message "Pulling latest code from origin/$BRANCH"
cd "$PROJECT_DIR"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git reset --hard "origin/$BRANCH"

echo_message "Preparing Python virtual environment"
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
venv/bin/python -m pip install --upgrade pip
venv/bin/pip install -r requirements.txt

echo_message "Restarting $SERVICE_NAME service"
sudo systemctl daemon-reload
sudo systemctl restart "$SERVICE_NAME"
sudo systemctl is-active --quiet "$SERVICE_NAME"

echo_message "Checking local application health"
for attempt in {1..10}; do
    if curl --fail --silent --show-error "http://127.0.0.1:${APP_PORT}/" >/dev/null; then
        echo_message "Deployment completed successfully"
        exit 0
    fi
    echo "Health check failed. Retry ${attempt}/10..."
    sleep 2
done

echo "Application did not become healthy on port ${APP_PORT}."
sudo systemctl status "$SERVICE_NAME" --no-pager -l
exit 1
