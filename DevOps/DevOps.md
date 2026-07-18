- ### [[Виртуализация]]
- ### [[Docker]]
- ### [[Kubernetes]]
- ### [[DevOps/Load Balancing]]
- ### [[Nginx]]
- ### [[Tunnel]]
- ### [[Deployment]]
- ### [[Prometheus]]
- ### [[Интеграция с CI_CD]]

### 🔗 Несвязанные файлы (Unlinked Context)
- [[Архитектура, отказоустойчивость и эксплуатация баз данных]]


---

```text
DevOps
├── 00-Обзор-и-методология
│   ├── DevOps.md
│   ├── DevSecOps.md
│   ├── GitOps.md
│   ├── Platform-Engineering.md
│   ├── SRE.md
│   ├── SDLC.md
│   ├── CALMS.md
│   ├── DORA-метрики.md
│   ├── Team-Topologies.md
│   ├── Well-Architected-Framework.md
│   ├── Жизненный-цикл-приложения.md
│   ├── Роли-и-зоны-ответственности.md
│   └── Чеклисты.md
├── 01-Linux-и-ОС
│   ├── Linux.md
│   ├── Файловая-система.md
│   ├── Права-доступа-и-ACL.md
│   ├── Пользователи-и-группы.md
│   ├── Процессы-и-сигналы.md
│   ├── Systemd.md
│   ├── Systemd
│   │   ├── Units.md
│   │   ├── Services.md
│   │   ├── Timers.md
│   │   ├── Journald.md
│   │   └── Cgroups.md
│   ├── Bash.md
│   ├── Shell-Scripting.md
│   ├── Cron-и-планировщики.md
│   ├── Логирование.md
│   ├── Управление-пакетами.md
│   ├── Ядро-Linux.md
│   ├── Kernel-Parameters-sysctl.md
│   ├── LVM-и-разделы.md
│   ├── RAID.md
│   ├── NFS.md
│   ├── Samba.md
│   ├── SSH.md
│   ├── SSH-Hardening.md
│   ├── Производительность-Linux.md
│   ├── Troubleshooting-Linux.md
│   └── Windows-Server.md
├── 02-Сети
│   ├── Основы-сетей.md
│   ├── OSI-и-TCP-IP.md
│   ├── IPv4.md
│   ├── IPv6.md
│   ├── Subnetting.md
│   ├── TCP.md
│   ├── UDP.md
│   ├── DNS.md
│   ├── DHCP.md
│   ├── ARP.md
│   ├── ICMP.md
│   ├── NAT.md
│   ├── VLAN.md
│   ├── VXLAN.md
│   ├── Routing.md
│   ├── BGP.md
│   ├── OSPF.md
│   ├── Firewall.md
│   ├── iptables.md
│   ├── nftables.md
│   ├── Network-Namespaces.md
│   ├── VPN.md
│   ├── WireGuard.md
│   ├── OpenVPN.md
│   ├── Proxy.md
│   ├── SOCKS.md
│   ├── HTTP.md
│   ├── HTTPS.md
│   ├── TLS-и-SSL.md
│   ├── mTLS.md
│   ├── PKI.md
│   ├── Сертификаты.md
│   ├── Network-Troubleshooting.md
│   └── Инструменты-сетевой-диагностики.md
├── 03-Git-и-управление-кодом
│   ├── Git.md
│   ├── Git-Commands.md
│   ├── Git-Internals.md
│   ├── Branching-Strategies.md
│   ├── GitFlow.md
│   ├── Trunk-Based-Development.md
│   ├── Conventional-Commits.md
│   ├── Semantic-Versioning.md
│   ├── Pull-Requests-и-Code-Review.md
│   ├── Merge-и-Rebase.md
│   ├── Tags-и-Releases.md
│   ├── Git-Hooks.md
│   ├── Git-LFS.md
│   ├── Monorepo.md
│   ├── GitHub.md
│   ├── GitLab.md
│   ├── Bitbucket.md
│   ├── GitHub-Actions.md
│   └── GitLab-CI.md
├── 04-CI
│   ├── CI.md
│   ├── Принципы-CI.md
│   ├── Pipeline-Design.md
│   ├── Build-Systems.md
│   ├── Artifact-Management.md
│   ├── Cache-в-CI.md
│   ├── Runners-и-Agents.md
│   ├── Jenkins.md
│   ├── Jenkins
│   │   ├── Jenkinsfile.md
│   │   ├── Declarative-Pipeline.md
│   │   ├── Scripted-Pipeline.md
│   │   ├── Shared-Libraries.md
│   │   ├── Agents.md
│   │   └── Plugins.md
│   ├── GitLab-CI
│   │   ├── gitlab-ci-yml.md
│   │   ├── Stages-и-Jobs.md
│   │   ├── Rules-и-Only-Except.md
│   │   ├── Includes.md
│   │   ├── Variables.md
│   │   ├── Artifacts.md
│   │   └── GitLab-Runners.md
│   ├── GitHub-Actions
│   │   ├── Workflows.md
│   │   ├── Actions.md
│   │   ├── Events.md
│   │   ├── Secrets.md
│   │   ├── Reusable-Workflows.md
│   │   └── Self-Hosted-Runners.md
│   ├── TeamCity.md
│   ├── CircleCI.md
│   ├── Travis-CI.md
│   ├── Argo-Workflows.md
│   └── Tekton.md
├── 05-CD-и-релизы
│   ├── CD.md
│   ├── Continuous-Delivery.md
│   ├── Continuous-Deployment.md
│   ├── Стратегии-деплоя.md
│   ├── Rolling-Update.md
│   ├── Recreate-Deployment.md
│   ├── Blue-Green.md
│   ├── Canary.md
│   ├── A-B-Testing.md
│   ├── Feature-Flags.md
│   ├── Progressive-Delivery.md
│   ├── Rollback.md
│   ├── Release-Management.md
│   ├── Release-Notes.md
│   ├── Миграции-БД-в-деплое.md
│   ├── Environment-Management.md
│   ├── Dev-Staging-Prod.md
│   ├── Approval-Gates.md
│   ├── Argo-CD.md
│   ├── Flux-CD.md
│   ├── Spinnaker.md
│   └── Octopus-Deploy.md
├── 06-Infrastructure-as-Code
│   ├── IaC.md
│   ├── Immutable-Infrastructure.md
│   ├── Desired-State.md
│   ├── Idempotency.md
│   ├── Terraform.md
│   ├── Terraform
│   │   ├── Основы.md
│   │   ├── HCL.md
│   │   ├── Providers.md
│   │   ├── Resources.md
│   │   ├── Data-Sources.md
│   │   ├── Variables-и-Outputs.md
│   │   ├── Modules.md
│   │   ├── State.md
│   │   ├── Remote-State.md
│   │   ├── Workspaces.md
│   │   ├── Import.md
│   │   ├── Lifecycle.md
│   │   ├── Provisioners.md
│   │   ├── Terraform-Cloud.md
│   │   ├── Terragrunt.md
│   │   ├── OpenTofu.md
│   │   ├── Testing.md
│   │   ├── Security.md
│   │   └── Best-Practices.md
│   ├── Pulumi.md
│   ├── CloudFormation.md
│   ├── AWS-CDK.md
│   ├── Azure-ARM-и-Bicep.md
│   ├── Crossplane.md
│   └── Policy-as-Code.md
├── 07-Configuration-Management
│   ├── Configuration-Management.md
│   ├── Ansible.md
│   ├── Ansible
│   │   ├── Inventory.md
│   │   ├── Playbooks.md
│   │   ├── Roles.md
│   │   ├── Collections.md
│   │   ├── Variables.md
│   │   ├── Templates-Jinja2.md
│   │   ├── Handlers.md
│   │   ├── Vault.md
│   │   ├── Dynamic-Inventory.md
│   │   ├── AWX-и-Ansible-Automation-Platform.md
│   │   ├── Molecule.md
│   │   └── Best-Practices.md
│   ├── Puppet.md
│   ├── Chef.md
│   ├── SaltStack.md
│   ├── Packer.md
│   ├── Cloud-Init.md
│   └── Golden-Images.md
├── 08-Контейнеризация
│   ├── Контейнеризация.md
│   ├── OCI.md
│   ├── Container-Runtime.md
│   ├── Docker.md
│   ├── Docker
│   │   ├── Commands.md
│   │   ├── Dockerfile.md
│   │   ├── Dockerfile
│   │   │   ├── Instructions.md
│   │   │   ├── Best-Practices.md
│   │   │   ├── Multi-Stage-Builds.md
│   │   │   ├── Node-Multi-Stage.md
│   │   │   ├── Python-Multi-Stage.md
│   │   │   ├── Java-Multi-Stage.md
│   │   │   └── Go-Multi-Stage.md
│   │   ├── Images.md
│   │   ├── Containers.md
│   │   ├── Volumes.md
│   │   ├── Networks.md
│   │   ├── Docker-Compose.md
│   │   ├── Docker-Swarm.md
│   │   ├── Registry.md
│   │   ├── Security.md
│   │   ├── Rootless-Docker.md
│   │   └── Troubleshooting.md
│   ├── Podman.md
│   ├── Buildah.md
│   ├── containerd.md
│   ├── CRI-O.md
│   ├── Kaniko.md
│   ├── BuildKit.md
│   ├── Nerdctl.md
│   ├── Docker-Registry.md
│   ├── Harbor.md
│   ├── Nexus-Repository.md
│   ├── JFrog-Artifactory.md
│   ├── Image-Tagging.md
│   ├── Image-Scanning.md
│   └── Container-Security.md
├── 09-Kubernetes
│   ├── Kubernetes.md
│   ├── Архитектура-Kubernetes.md
│   ├── Control-Plane.md
│   ├── Worker-Nodes.md
│   ├── etcd.md
│   ├── kubeadm.md
│   ├── kubectl.md
│   ├── API-Resources.md
│   ├── YAML-манифесты.md
│   ├── Namespaces.md
│   ├── Labels-и-Selectors.md
│   ├── Annotations.md
│   ├── Pods.md
│   ├── ReplicaSet.md
│   ├── Deployments.md
│   ├── StatefulSet.md
│   ├── DaemonSet.md
│   ├── Jobs.md
│   ├── CronJob.md
│   ├── Services.md
│   ├── Ingress.md
│   ├── Gateway-API.md
│   ├── ConfigMap.md
│   ├── Secrets.md
│   ├── Volumes.md
│   ├── PersistentVolume.md
│   ├── PersistentVolumeClaim.md
│   ├── StorageClass.md
│   ├── CSI.md
│   ├── Requests-и-Limits.md
│   ├── QoS-классы.md
│   ├── Liveness-Readiness-Startup-Probes.md
│   ├── Init-Containers.md
│   ├── Sidecar-Containers.md
│   ├── Autoscaling.md
│   ├── HPA.md
│   ├── VPA.md
│   ├── Cluster-Autoscaler.md
│   ├── Scheduling.md
│   ├── Taints-и-Tolerations.md
│   ├── Affinity-и-Anti-Affinity.md
│   ├── PriorityClass.md
│   ├── Pod-Disruption-Budget.md
│   ├── RBAC.md
│   ├── Service-Accounts.md
│   ├── Network-Policies.md
│   ├── Pod-Security-Standards.md
│   ├── Admission-Controllers.md
│   ├── OPA-Gatekeeper.md
│   ├── Kyverno.md
│   ├── CRD-и-Operators.md
│   ├── Helm.md
│   ├── Helm
│   │   ├── Charts.md
│   │   ├── Templates.md
│   │   ├── Values.md
│   │   ├── Dependencies.md
│   │   ├── Hooks.md
│   │   └── Best-Practices.md
│   ├── Kustomize.md
│   ├── Minikube.md
│   ├── kind.md
│   ├── k3s.md
│   ├── Rancher.md
│   ├── OpenShift.md
│   ├── EKS.md
│   ├── GKE.md
│   ├── AKS.md
│   ├── CNI.md
│   ├── Calico.md
│   ├── Cilium.md
│   ├── Flannel.md
│   ├── CoreDNS.md
│   ├── Metrics-Server.md
│   ├── Cluster-Upgrade.md
│   ├── Backup-и-Restore.md
│   ├── Velero.md
│   ├── Troubleshooting.md
│   └── Production-Checklist.md
├── 10-Service-Mesh-и-API
│   ├── Service-Mesh.md
│   ├── Istio.md
│   ├── Linkerd.md
│   ├── Consul-Connect.md
│   ├── Envoy.md
│   ├── API-Gateway.md
│   ├── Kong.md
│   ├── Traefik.md
│   ├── Ambassador.md
│   ├── NGINX-Ingress.md
│   ├── Service-Discovery.md
│   ├── Load-Balancing.md
│   ├── Circuit-Breaker.md
│   ├── Retry-и-Timeout.md
│   ├── Rate-Limiting.md
│   ├── API-Versioning.md
│   ├── OpenAPI-и-Swagger.md
│   ├── gRPC.md
│   └── Webhooks.md
├── 11-Web-серверы-и-балансировка
│   ├── Nginx.md
│   ├── Nginx
│   │   ├── Конфигурация.md
│   │   ├── Reverse-Proxy.md
│   │   ├── Load-Balancing.md
│   │   ├── SSL-TLS.md
│   │   ├── Caching.md
│   │   ├── Security.md
│   │   ├── Rate-Limiting.md
│   │   └── Troubleshooting.md
│   ├── Apache-HTTPD.md
│   ├── HAProxy.md
│   ├── Traefik.md
│   ├── Caddy.md
│   ├── Keepalived.md
│   ├── VRRP.md
│   ├── CDN.md
│   ├── Cloudflare.md
│   ├── WAF.md
│   └── DDoS-защита.md
├── 12-Облачные-платформы
│   ├── Cloud-Computing.md
│   ├── IaaS-PaaS-SaaS.md
│   ├── Public-Private-Hybrid-Cloud.md
│   ├── Multi-Cloud.md
│   ├── AWS.md
│   ├── AWS
│   │   ├── IAM.md
│   │   ├── Organizations.md
│   │   ├── VPC.md
│   │   ├── EC2.md
│   │   ├── Auto-Scaling.md
│   │   ├── ELB.md
│   │   ├── S3.md
│   │   ├── EBS.md
│   │   ├── EFS.md
│   │   ├── RDS.md
│   │   ├── DynamoDB.md
│   │   ├── Lambda.md
│   │   ├── ECS.md
│   │   ├── EKS.md
│   │   ├── Route53.md
│   │   ├── CloudFront.md
│   │   ├── CloudWatch.md
│   │   ├── CloudTrail.md
│   │   ├── Secrets-Manager.md
│   │   ├── KMS.md
│   │   └── Cost-Explorer.md
│   ├── Microsoft-Azure.md
│   ├── Azure
│   │   ├── Entra-ID.md
│   │   ├── Virtual-Network.md
│   │   ├── Virtual-Machines.md
│   │   ├── AKS.md
│   │   ├── App-Service.md
│   │   ├── Storage.md
│   │   ├── Azure-SQL.md
│   │   ├── Key-Vault.md
│   │   ├── Monitor.md
│   │   └── Azure-DevOps.md
│   ├── Google-Cloud.md
│   ├── GCP
│   │   ├── IAM.md
│   │   ├── VPC.md
│   │   ├── Compute-Engine.md
│   │   ├── GKE.md
│   │   ├── Cloud-Run.md
│   │   ├── Cloud-Storage.md
│   │   ├── Cloud-SQL.md
│   │   ├── BigQuery.md
│   │   ├── Secret-Manager.md
│   │   └── Cloud-Monitoring.md
│   ├── Yandex-Cloud.md
│   ├── VK-Cloud.md
│   ├── Selectel.md
│   ├── OpenStack.md
│   └── Serverless.md
├── 13-Виртуализация-и-инфраструктура
│   ├── Виртуализация.md
│   ├── Гипервизоры.md
│   ├── KVM.md
│   ├── QEMU.md
│   ├── VMware-vSphere.md
│   ├── VMware-ESXi.md
│   ├── Hyper-V.md
│   ├── Proxmox.md
│   ├── Vagrant.md
│   ├── Bare-Metal.md
│   ├── IPMI.md
│   ├── iDRAC-и-iLO.md
│   ├── PXE.md
│   ├── MAAS.md
│   ├── Объектное-хранилище.md
│   ├── Блочное-хранилище.md
│   ├── Ceph.md
│   ├── GlusterFS.md
│   └── SAN-и-NAS.md
├── 14-Наблюдаемость
│   ├── Observability.md
│   ├── Monitoring.md
│   ├── Logging.md
│   ├── Tracing.md
│   ├── Метрики.md
│   ├── Логи.md
│   ├── Трейсинг.md
│   ├── Корреляция-сигналов.md
│   ├── Four-Golden-Signals.md
│   ├── RED-Method.md
│   ├── USE-Method.md
│   ├── Whitebox-и-Blackbox-Monitoring.md
│   ├── Prometheus.md
│   ├── Prometheus
│   │   ├── Архитектура.md
│   │   ├── Сервер-и-клиенты.md
│   │   ├── Service-Discovery.md
│   │   ├── Scrape-Configuration.md
│   │   ├── Exporters.md
│   │   ├── Pushgateway.md
│   │   ├── Alertmanager.md
│   │   ├── Recording-Rules.md
│   │   ├── Alert-Rules.md
│   │   ├── Federation.md
│   │   ├── Remote-Write-и-Remote-Read.md
│   │   ├── Storage.md
│   │   ├── HA.md
│   │   ├── PromQL.md
│   │   ├── Типы-метрик.md
│   │   ├── Гистограммы-и-Summaries.md
│   │   ├── Перцентили-и-Квантили.md
│   │   └── Best-Practices.md
│   ├── Grafana.md
│   ├── Grafana
│   │   ├── Dashboards.md
│   │   ├── Data-Sources.md
│   │   ├── Alerts.md
│   │   ├── Variables.md
│   │   └── Provisioning.md
│   ├── Alerting.md
│   ├── Alertmanager.md
│   ├── PagerDuty.md
│   ├── Opsgenie.md
│   ├── Zabbix.md
│   ├── Nagios.md
│   ├── Icinga.md
│   ├── Datadog.md
│   ├── New-Relic.md
│   ├── Elastic-Stack.md
│   ├── Elasticsearch.md
│   ├── Logstash.md
│   ├── Kibana.md
│   ├── Beats.md
│   ├── Fluentd.md
│   ├── Fluent-Bit.md
│   ├── Loki.md
│   ├── Promtail.md
│   ├── OpenTelemetry.md
│   ├── Jaeger.md
│   ├── Zipkin.md
│   ├── Tempo.md
│   ├── Sentry.md
│   ├── Uptime-Monitoring.md
│   ├── Synthetic-Monitoring.md
│   └── RUM.md
├── 15-SRE-и-эксплуатация
│   ├── SRE.md
│   ├── SLI.md
│   ├── SLO.md
│   ├── SLA.md
│   ├── Error-Budget.md
│   ├── Incident-Management.md
│   ├── Incident-Response.md
│   ├── Incident-Commander.md
│   ├── Escalation-Policy.md
│   ├── On-Call.md
│   ├── Runbooks.md
│   ├── Playbooks.md
│   ├── Postmortem.md
│   ├── Blameless-Postmortem.md
│   ├── Root-Cause-Analysis.md
│   ├── Problem-Management.md
│   ├── Change-Management.md
│   ├── Capacity-Planning.md
│   ├── Performance-Testing.md
│   ├── Load-Testing.md
│   ├── Stress-Testing.md
│   ├── Chaos-Engineering.md
│   ├── Chaos-Mesh.md
│   ├── LitmusChaos.md
│   ├── GameDays.md
│   ├── Toil.md
│   ├── Operational-Readiness-Review.md
│   └── Production-Readiness-Checklist.md
├── 16-Безопасность
│   ├── DevSecOps.md
│   ├── Security-Basics.md
│   ├── CIA-Triad.md
│   ├── Threat-Modeling.md
│   ├── Zero-Trust.md
│   ├── IAM.md
│   ├── RBAC.md
│   ├── ABAC.md
│   ├── Least-Privilege.md
│   ├── Authentication.md
│   ├── Authorization.md
│   ├── OAuth2.md
│   ├── OpenID-Connect.md
│   ├── JWT.md
│   ├── SSO.md
│   ├── MFA.md
│   ├── Secrets-Management.md
│   ├── HashiCorp-Vault.md
│   ├── External-Secrets.md
│   ├── SOPS.md
│   ├── KMS.md
│   ├── PKI.md
│   ├── Certificate-Management.md
│   ├── cert-manager.md
│   ├── SAST.md
│   ├── DAST.md
│   ├── IAST.md
│   ├── SCA.md
│   ├── SBOM.md
│   ├── Dependency-Scanning.md
│   ├── Secret-Scanning.md
│   ├── Container-Scanning.md
│   ├── Trivy.md
│   ├── Snyk.md
│   ├── SonarQube.md
│   ├── Checkov.md
│   ├── tfsec.md
│   ├── Falco.md
│   ├── Runtime-Security.md
│   ├── Supply-Chain-Security.md
│   ├── SLSA.md
│   ├── Sigstore.md
│   ├── Cosign.md
│   ├── Compliance.md
│   ├── GDPR.md
│   ├── PCI-DSS.md
│   ├── SOC2.md
│   └── ISO-27001.md
├── 17-Базы-данных-и-хранилища
│   ├── Архитектура-БД-и-эксплуатация.md
│   ├── Реляционные-БД.md
│   ├── NoSQL.md
│   ├── CAP-теорема.md
│   ├── ACID.md
│   ├── BASE.md
│   ├── Репликация.md
│   ├── Шардирование.md
│   ├── Партиционирование.md
│   ├── Кластеризация.md
│   ├── Connection-Pooling.md
│   ├── Миграции-БД.md
│   ├── Backup-и-Restore-БД.md
│   ├── Disaster-Recovery-БД.md
│   ├── PostgreSQL.md
│   ├── MySQL.md
│   ├── MariaDB.md
│   ├── MongoDB.md
│   ├── Redis.md
│   ├── Elasticsearch.md
│   ├── ClickHouse.md
│   ├── Cassandra.md
│   ├── CockroachDB.md
│   ├── InfluxDB.md
│   ├── TimescaleDB.md
│   ├── Oracle.md
│   ├── MS-SQL.md
│   ├── PgBouncer.md
│   ├── Patroni.md
│   ├── Percona-XtraDB-Cluster.md
│   ├── Database-Operators-Kubernetes.md
│   ├── Liquibase.md
│   └── Flyway.md
├── 18-Брокеры-и-интеграции
│   ├── Message-Brokers.md
│   ├── Event-Driven-Architecture.md
│   ├── Event-Sourcing.md
│   ├── CQRS.md
│   ├── Apache-Kafka.md
│   ├── Kafka
│   │   ├── Архитектура.md
│   │   ├── Topics-и-Partitions.md
│   │   ├── Producers.md
│   │   ├── Consumers.md
│   │   ├── Consumer-Groups.md
│   │   ├── Replication.md
│   │   ├── Kafka-Connect.md
│   │   ├── Schema-Registry.md
│   │   ├── Kafka-Streams.md
│   │   ├── Security.md
│   │   └── Monitoring.md
│   ├── RabbitMQ.md
│   ├── ActiveMQ.md
│   ├── NATS.md
│   ├── Redis-Streams.md
│   ├── Amazon-SQS-и-SNS.md
│   ├── Google-Pub-Sub.md
│   └── WebSocket.md
├── 19-Автоматизация-и-языки
│   ├── Automation.md
│   ├── Bash.md
│   ├── Python-для-DevOps.md
│   ├── Go-для-DevOps.md
│   ├── PowerShell.md
│   ├── Make.md
│   ├── Makefile.md
│   ├── Taskfile.md
│   ├── Just.md
│   ├── jq.md
│   ├── yq.md
│   ├── curl.md
│   ├── wget.md
│   ├── grep-sed-awk.md
│   ├── REST-API.md
│   ├── CLI-Design.md
│   └── ChatOps.md
├── 20-Надежность-и-аварийное-восстановление
│   ├── High-Availability.md
│   ├── Fault-Tolerance.md
│   ├── Resilience.md
│   ├── Single-Point-of-Failure.md
│   ├── Disaster-Recovery.md
│   ├── Business-Continuity.md
│   ├── RPO.md
│   ├── RTO.md
│   ├── Backup-Strategy.md
│   ├── Backup-Types.md
│   ├── Backup-Verification.md
│   ├── Restore-Testing.md
│   ├── Multi-AZ.md
│   ├── Multi-Region.md
│   ├── Active-Active.md
│   ├── Active-Passive.md
│   ├── Failover.md
│   ├── Fencing.md
│   ├── Quorum.md
│   └── DR-Plan.md
├── 21-FinOps-и-управление-ресурсами
│   ├── FinOps.md
│   ├── Cloud-Cost-Management.md
│   ├── Tagging-Strategy.md
│   ├── Budgeting.md
│   ├── Forecasting.md
│   ├── Cost-Allocation.md
│   ├── Rightsizing.md
│   ├── Reserved-Instances.md
│   ├── Savings-Plans.md
│   ├── Spot-Instances.md
│   ├── Kubernetes-Cost-Management.md
│   ├── Kubecost.md
│   ├── GreenOps.md
│   └── Sustainability.md
├── 22-Tunnel-и-удаленный-доступ
│   ├── Tunnel.md
│   ├── ngrok.md
│   ├── Cloudflare-Tunnel.md
│   ├── LocalTunnel.md
│   ├── FRP.md
│   ├── Bastion-Host.md
│   ├── Jump-Host.md
│   ├── SSH-Tunneling.md
│   ├── Port-Forwarding.md
│   └── Teleport.md
├── 23-Документация-и-шаблоны
│   ├── Documentation-as-Code.md
│   ├── Markdown.md
│   ├── MkDocs.md
│   ├── Docusaurus.md
│   ├── ADR.md
│   ├── Architecture-Decision-Records.md
│   ├── C4-Model.md
│   ├── Диаграммы.md
│   ├── Mermaid.md
│   ├── PlantUML.md
│   ├── README-Template.md
│   ├── Runbook-Template.md
│   ├── Postmortem-Template.md
│   ├── Incident-Template.md
│   ├── Terraform-Module-Template.md
│   ├── Helm-Chart-Template.md
│   ├── CI-Pipeline-Template.md
│   └── Production-Checklist-Template.md
└── 24-Собеседования-и-практика
    ├── DevOps-Interview.md
    ├── Linux-Questions.md
    ├── Networking-Questions.md
    ├── Docker-Questions.md
    ├── Kubernetes-Questions.md
    ├── Terraform-Questions.md
    ├── Ansible-Questions.md
    ├── CI-CD-Questions.md
    ├── Cloud-Questions.md
    ├── Security-Questions.md
    ├── SRE-Questions.md
    ├── Практические-задачи.md
    ├── Домашние-лаборатории.md
    ├── Pet-Projects.md
    └── Сертификации.md
```