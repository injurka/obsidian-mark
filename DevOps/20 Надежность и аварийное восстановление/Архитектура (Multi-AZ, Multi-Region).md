# Архитектура (Multi-AZ, Multi-Region)

## 📖 DevOps-история: Боль и Решение
**Боль:** Дата-центр (или отдельная зона доступности) "лег" из-за пожара, экскаватора с оптикой или сбоя питания. Все сервисы недоступны, бизнес теряет деньги каждую минуту, руководство в панике, дежурные инженеры седеют.
**Решение:** Проектирование систем с избыточностью на уровне нескольких зон доступности (Multi-AZ) или даже нескольких регионов (Multi-Region), чтобы выход из строя одной физической локации не приводил к глобальному отказу сервиса.

## 📊 Архитектура (Mermaid)
```mermaid
graph TD
    User((User)) --> DNS[DNS / Global Load Balancer]
    
    subgraph Region_A [Region A (Primary)]
        DNS --> ALB_A[Application Load Balancer]
        
        subgraph AZ_A1 [Availability Zone 1]
            ALB_A --> App_A1[App Instance 1]
            App_A1 --> DB_Master[(DB Master)]
        end
        
        subgraph AZ_A2 [Availability Zone 2]
            ALB_A --> App_A2[App Instance 2]
            App_A2 --> DB_Sync_Replica[(DB Sync Replica)]
        end
        DB_Master -. "Sync Replication" .-> DB_Sync_Replica
    end

    subgraph Region_B [Region B (Disaster Recovery)]
        DNS -.- ALB_B[Application Load Balancer]
        
        subgraph AZ_B1 [Availability Zone 1]
            ALB_B -.-> App_B1[App Instance 1]
            App_B1 -.-> DB_Async_Replica[(DB Async Replica)]
        end
        DB_Master -. "Async Replication" .-> DB_Async_Replica
    end
```

## 🛠 Пример: Terraform AWS Multi-AZ Auto Scaling
```hcl
resource "aws_autoscaling_group" "app_asg" {
  name                 = "app-asg"
  vpc_zone_identifier  = [aws_subnet.az1.id, aws_subnet.az2.id, aws_subnet.az3.id]
  min_size             = 3
  max_size             = 9
  desired_capacity     = 3
  health_check_type    = "ELB"
  target_group_arns    = [aws_lb_target_group.app_tg.arn]

  launch_template {
    id      = aws_launch_template.app_lt.id
    version = "$Latest"
  }
}
```

## 🌅 Day 2 Operations
- **Регулярные Chaos-учения (Game Days):** Искусственно гасите одну из зон доступности в рабочее время под присмотром команды, чтобы убедиться, что трафик корректно перетекает, а емкости оставшихся зон хватает.
- **Мониторинг Cross-AZ/Region трафика:** Обращайте внимание на затраты на передачу данных. Межзональный и, особенно, межрегиональный трафик может стоить дорого.
- **Проверка консистентности бэкапов:** Мало иметь Multi-Region реплику базы данных — нужно проверять, что из нее реально подняться в случае disaster recovery, так как репликация могла сломаться или передать поврежденные данные (логическая ошибка).

## 🚫 Антипаттерны
- **Ложное чувство безопасности (Hard-coded зависимости):** Построить Multi-AZ, но забыть, что сервис авторизации работает в единственном экземпляре в AZ1.
- **Синхронная репликация между регионами:** Ожидание подтверждения записи из региона на другом конце света убьет latency вашего приложения. (Используйте синхронную для Multi-AZ, асинхронную для Multi-Region).
- **Ручное переключение (Failover):** Если для перевода трафика на резервную AZ/Region нужно разбудить админа и он должен прописать IP в DNS вручную — это не отказоустойчивость, а симуляция.
