- ### [[00 Introduction|Introduction]]
- ### [[00 Core Process Steps|Core Process Steps]]
- ### [[00 Key Concepts Techniques|Key Concepts Techniques]]
- ### [[00 Operational Concerns|Operational Concerns]]
- ### [[00 Design Case|Design Case]]
- ### [[00 Glossary Common Terms|Glossary Common Terms]]

```json
System_Design/
├── 00_Introduction/
│   ├── 01_What_Why_System_Design.md          # (Lesson 1: Importance, Overview)
│   └── 02_The_Design_Process_Overview.md     # (Lesson 1: Steps outline - Req, HLD, DB, Modular, Scale, etc.)
│
├── 01_Core_Process_Steps/
│   ├── 01_Gathering_Requirements.md          # (Lesson 2: Functional & Non-Functional, Scope, Explicit/Implicit)
│   ├── 02_Capacity_Estimation_Load.md        # (Lesson 3: User Traffic, Network, Compute, Storage, RPS, QPS)
│   ├── 03_High_Level_Design.md               # (Lesson 4: Core Components - User, Service, DB, LB, Examples)
│   ├── 04_Detailed_Component_Design.md       # (Lesson 6: Breaking down services, APIs, Interactions)
│   └── 05_Database_Selection_Rationale.md    # (Lesson 5: Process of choosing, tradeoffs, linking to requirements)
│
├── 02_Key_Concepts_Techniques/
│   ├── 01_Scalability/
│   │   ├── Load_Balancing.md                 # (Lesson 7: Principles, Algorithms, Placement)
│   │   ├── Partitioning_Sharding.md          # (Lesson 7: Vertical, Horizontal, Methods, Drawbacks)
│   │   └── Consistent_Hashing.md             # (Lesson 7: Concept, Use Case)
│   ├── 02_Availability_Reliability/
│   │   ├── Replication.md                    # (Lesson 7: Master/Slave, Quorum, Leader/Follower)
│   │   ├── Redundancy_Failover.md            # (Lesson 7: Standby, Active-Active)
│   │   └── CAP_Theorem_PACELC.md             # (Lesson 2, Lesson 5: Theory, Tradeoffs, Examples)
│   ├── 03_Performance_Responsiveness/
│   │   ├── Caching.md                        # (Lesson 8: Why, Where, Invalidation, Eviction Policies)
│   │   ├── Content_Delivery_Networks_CDN.md  # (Lesson 8: Concept, Use Case - Netflix Example)
│   │   └── Database_Indexing.md              # (Lesson 8: Why, How, When to use/avoid)
│   ├── 04_Data_Storage_Databases/
│   │   ├── Database_Types_Comparison.md      # (Lesson 5: Relational, Key-Value, Document, Columnar)
│   │   └── ACID_vs_BASE.md                   # (Lesson 5: Properties, Tradeoffs)
│   ├── 05_Communication_Decoupling/
│   │   ├── Messaging_Queues.md               # (Lesson 6: Concept, Brokers, Push/Pull, RabbitMQ vs Kafka)
│   │   └── Communication_Protocols.md        # (Lesson 8: AJAX Polling, Long-Polling, WebSockets, Server-Sent Events)
│   ├── 06_ID_Generation.md                   # (Lesson 8: Strategies - DB Increment, UUID, Service, Snowflake)
│   └── 07_Search_Subsystems/
│       ├── Prefix_Trees_Tries.md             # (Lesson 9: Structure, Operations, Autocomplete Use Case)
│       ├── Text_Search_Algorithms.md         # (Lesson 9: Prefix Func, Aho-Corasick, Wildcard Matching)
│       └── Geospatial_Indexing.md            # (Lesson 9: Geohash, QuadTree)
│
├── 03_Operational_Concerns/
│   ├── 01_Monitoring_Alerting.md             # (Lesson 10: Why, What, Tools - Graphite, Prometheus, Grafana)
│   ├── 02_Security.md                        # (Lesson 10: Proxy, Reverse Proxy, Firewall)
│   └── 03_Rate_Limiting.md                   # (Lesson 10: Why, Algorithms - Token/Leaky Bucket, Fixed/Sliding Window)
│
├── 04_Design_Case_Studies/
│   ├── Template_Approach.md                  # (Lesson 11: Outline of sections for a design doc)
│   ├── Example_E-commerce_Store.md           # (Lesson 11: Full Walkthrough)
│   ├── Example_Taxi_Service.md               # (Lesson 12: Full Walkthrough)
│   ├── Mini_Examples/                        # (Examples from Lesson 2 & 4 requirements/HLD)
│   │   ├── URL_Shortener.md
│   │   ├── Pastebin_Text_Hosting.md
│   │   ├── Autocomplete_Service.md
│   │   ├── Cloud_Storage_Drive.md
│   │   ├── Photo_Sharing_App.md
│   │   ├── Chat_App_Telegram.md
│   │   ├── Feed_Based_App_Twitter.md
│   │   ├── Video_Streaming_Netflix.md
│   │   ├── Restaurant_Finder.md
│   │   ├── Notification_Service.md           # (From Lesson 6)
│   │   └── Booking_Service.md                # (From Lesson 6)
│
├── 05_Glossary_Common_Terms.md               # (Key terms like ACID, BASE, Latency, Throughput etc.)
```

### 🔗 Несвязанные файлы (Unlinked Context)
- [[01 Core Process Steps/01 Gathering Requirements|01 Gathering Requirements]]
- [[01 Core Process Steps/02 Capacity Estimation Load|02 Capacity Estimation Load]]
- [[01 Core Process Steps/03 High Level Design|03 High Level Design]]
- [[01 Core Process Steps/04 Detailed Component Design|04 Detailed Component Design]]
- [[01 Core Process Steps/05 Database Selection Rationale|05 Database Selection Rationale]]
- [[02 Key Concepts Techniques/01 Scalability/01 Load Balancing|01 Load Balancing]]
