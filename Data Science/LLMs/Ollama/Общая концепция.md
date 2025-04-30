Сайт - https://ollama.com/
## Install

### Linux

```bash
curl -fsSL https://ollama.com/install.sh | sh
```


## WebUI

GitHub - https://github.com/open-webui/open-webui

### Installation with Default Configuration

- **If Ollama is on your computer**, use this command:
```shell
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```
- **If Ollama is on a Different Server**, use this command:

To connect to Ollama on another server, change the `OLLAMA_BASE_URL` to the server's URL:

```shell
docker run -d -p 3000:8080 -e OLLAMA_BASE_URL=https://example.com -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main
```

- **To run Open WebUI with Nvidia GPU support**, use this command:

```shell
docker run -d -p 3000:8080 --gpus all --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:cuda
```

### Installing Open WebUI with Bundled Ollama Support

This installation method uses a single container image that bundles Open WebUI with Ollama, allowing for a streamlined setup via a single command. Choose the appropriate command based on your hardware setup:

- **With GPU Support**: Utilize GPU resources by running the following command:
    
```shell
docker run -d -p 3000:8080 --gpus=all -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama
```
    

- **For CPU Only**: If you're not using a GPU, use this command instead:
	
```shell
docker run -d -p 3000:8080 -v ollama:/root/.ollama -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:ollama
```