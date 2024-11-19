To the `.bashrc/.zshrc` add the following lines:

```shell
export PATH=~/.local/bin:$PATH
```

Reopen the terminal, or just type `bash` or `zsh`

Make a script in the `~/.local/bin/fixflameshot`

```shell
#!/bin/bash
env QT_QPA_PLATFORM=wayland flameshot gui
EOF
```

Then

```shell
chmod +x ~/.local/bin/fixflameshot
```

Add the keyboard shortcut in the `gnome-settings`

Name: `Flameshot`  
Command: `fixflameshot`