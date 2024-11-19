## Arch

```bash
sudo pacman -Syu syncthing
```

```bash
sudo nano /etc/systemd/system/syncthing@.service
```

```bash
[Unit]  
Description=Syncthing - Open Source Continuous File Synchronization for %I  
Documentation=man:syncthing(1)  
After=network.target  
Wants=syncthing-inotify@.service  
  
[Service]  
User=%i  
ExecStart=/usr/bin/syncthing -no-browser -no-restart -logflags=0  
Restart=on-failure  
SuccessExitStatus=3 4  
RestartForceExitStatus=3 4  
  
[Install]  
WantedBy=multi-user.target
```

```bash
sudo systemctl enable syncthing@user.service  
sudo systemctl start syncthing@user.service  
sudo systemctl status syncthing@user.service
```

### Allow for ufw if need

```bash
pacman -S ufw
systemctl enable ufw --now
ufw default deny
ufw allow syncthing
ufw allow syncthing-gui
ufw limit ssh
ufw enable
```

---

