Docs - https://dashy.to/docs/quick-start/

Usage:
```bash
docker run -d \  
	-p 8080:8080 \  
	-v ~/my-conf.yml:/app/user-data/conf.yml \  
	--name my-dashboard \  
	--restart=always \  
	lissy93/dashy:latest
```
