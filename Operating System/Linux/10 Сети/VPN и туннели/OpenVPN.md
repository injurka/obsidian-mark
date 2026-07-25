> connect
```bash
sudo openvpn --config <file>.ovpn
```

> logs
```bash
# ...
PUSH: Received control message: 'PUSH_REPLY,dhcp-option DNS 10.129.0.16,ping 20,ping-restart 60,topology subnet,route-gateway 10.1.1.1,ifconfig 10.1.1.153 255.255.255.0'
#...

# ... DNS 10.129.0.16 ...
```

Added `nameserver` from `DNS`

> sudo nano `/etc/resolv.conf`
```
nameserver 10.129.0.16
```