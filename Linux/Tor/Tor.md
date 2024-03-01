### Setup tor proxy on Arch Linux

#### Installation

#### Install `torbrowser-launcher`

```bash    
sudo pacman -S torbrowser-launcher
```

#### Install `tor`

```bash    
sudo pacman -S tor
## nyx provides a terminal status monitor for bandwidth usage, connection details and more.
sudo pacman -S nyx
## torsocks safely torify applications
sudo pacman -S torsocks
```

#### Start the tor service
```bash    
sudo systemctl enable --now tor.service
```
    
#### By default, Tor runs on port 9050. Check it
```bash
systemctl status tor.service
ss -nlt
```


### Test Tor Network Connection

#### Check your current public IP address
```bash    
wget -qO - https://api.ipify.org; echo
```
    
#### Torify the command through the `torsocks`
```bash
torsocks wget -qO - https://api.ipify.org; echo
## must show a different ip address
```


### Torify your Shell

#### torify the shell, issue
```bash
source torsocks on
wget -qO - https://api.ipify.org; echo
## must show the ip address of tor node
```
        
 #### To turn on `torsocks` permanently for all new shells add it to `.bashrc`
```bash
echo ". torsocks on" >> ~/.bashrc
```

 #### If you want to turn `torsocks` off, try
```bash
source torsocks off
```

### Enable the Tor control port

#### Add to your `/etc/tor/torrc`
```bash
ControlPort 9051
```

#### Set a Tor Control password

> Convert your password from plain-text to hash
```bash
 set +o history # unset bash history
 tor --hash-password your_password
 set -o history # set bash history
```

#### Add that hash to your `/etc/tor/torrc`
```bash
HashedControlPassword your_hash
```

 #### Restart `tor` 
```bash
sudo systemctl restart tor.service
```

 #### Check the status of port 9051
```bash
ss -nlt
```

### Test your `tor` control port

#### Install gnu-netcat
```bash
sudo pacman -S gnu-netcat
```

#### To test your `tor` use
```bash
echo -e 'PROTOCOLINFO\r\n' | nc 127.0.0.1 9051
```

#### To request a new circuit (IP address) from Tor, use
```bash
set +o history
echo -e 'AUTHENTICATE "my-tor-password"\r\nsignal NEWNYM\r\nQUIT' | nc 127.0.0.1 9051
set -o history
```