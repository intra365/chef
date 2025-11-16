---
id: data-engineer
title: Data Engineer
sidebar_label: Data Engineer
sidebar_position: 5
persona_type: specialized
parent_persona: technical-practitioner
---

# Data Engineer

Data Engineers design, build, and maintain data pipelines and analytics infrastructure for the Intra365 platform, ensuring data is accessible, reliable, and properly governed.

## Role Profile

### Primary Responsibilities
- Design and implement data pipelines
- Build ETL/ELT processes for data integration
- Optimize database performance and query efficiency
- Implement data quality checks and monitoring
- Manage data warehousing and analytics platforms
- Ensure data security and compliance
- Document data schemas and lineage
- Collaborate with analysts and data scientists

### Key Skills
- Proficiency in SQL and data modeling
- Experience with data pipeline tools (Apache Airflow, dbt)
- Knowledge of PostgreSQL and time-series databases
- Understanding of data governance and privacy (GDPR)
- Experience with streaming data (NATS, Kafka)
- Familiarity with Python for data processing
- Understanding of containerization and Kubernetes

### Daily Activities
- Monitoring data pipeline health and performance
- Developing and maintaining ETL/ELT workflows
- Optimizing database queries and indexes
- Investigating data quality issues
- Implementing new data sources and integrations
- Documenting data models and schemas
- Collaborating with product teams on data requirements

## Documentation Priorities

### Essential Reading
1. **[PostgreSQL Databases](../../010-guides/050-service-configurations/08-postgresql-databases.md)** - Database architecture and access
2. **[NATS Infrastructure](../../010-guides/050-service-configurations/07-nats-infrastructure.md)** - Message streaming for real-time data
3. **[Observability](../../010-guides/030-infrastructure/05-observability.md)** - Monitoring data pipelines
4. **[Storage](../../010-guides/030-infrastructure/03-storage.md)** - Data storage strategies

### Data Management
- **[Secrets Management](../../010-guides/030-infrastructure/04-secrets-management.md)** - Securely accessing databases
- **[Backup & Restore](../../010-guides/070-operations-runbooks/04-backup-restore.md)** - Data backup procedures
- **[Disaster Recovery](../../010-guides/030-infrastructure/06-disaster-recovery.md)** - Data recovery strategies

### Security & Compliance
- **[Data Protection](../../010-guides/060-security-compliance/020-iso27001-compliance/79-information-deletion.md)** - Data retention and deletion
- **[Data Classification](../../010-guides/060-security-compliance/020-iso27001-compliance/125-information-classification.md)** - Data sensitivity levels
- **[Audit Logging](../../010-guides/060-security-compliance/010-core-security/07-audit-logging.md)** - Data access auditing

## Common Tasks

### Creating Data Pipelines

```python
# Example: ETL pipeline using Python
import psycopg2
from datetime import datetime

def extract_data(source_conn):
    """Extract data from source database"""
    cursor = source_conn.cursor()
    cursor.execute("SELECT * FROM events WHERE created_at > %s", (last_sync,))
    return cursor.fetchall()

def transform_data(raw_data):
    """Transform and clean data"""
    transformed = []
    for row in raw_data:
        # Apply business logic and transformations
        transformed.append({
            'id': row[0],
            'event_type': row[1],
            'timestamp': row[2],
            'processed_at': datetime.utcnow()
        })
    return transformed

def load_data(target_conn, data):
    """Load data into target database"""
    cursor = target_conn.cursor()
    for record in data:
        cursor.execute(
            "INSERT INTO processed_events VALUES (%s, %s, %s, %s)",
            (record['id'], record['event_type'], 
             record['timestamp'], record['processed_at'])
        )
    target_conn.commit()
```

### Querying Data

```sql
-- Analyze platform usage metrics
SELECT 
    DATE_TRUNC('day', created_at) AS day,
    service_name,
    COUNT(*) AS total_requests,
    AVG(response_time_ms) AS avg_response_time,
    PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_time_ms) AS p95_response_time
FROM 
    api_requests
WHERE 
    created_at >= NOW() - INTERVAL '30 days'
GROUP BY 
    day, service_name
ORDER BY 
    day DESC, total_requests DESC;
```

### Monitoring Data Quality

```sql
-- Data quality checks
-- Check for null values in critical fields
SELECT 
    'null_check' AS test_name,
    COUNT(*) AS failed_records
FROM users
WHERE email IS NULL OR created_at IS NULL;

-- Check for duplicates
SELECT 
    'duplicate_check' AS test_name,
    email,
    COUNT(*) AS duplicate_count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- Check data freshness
SELECT 
    'freshness_check' AS test_name,
    MAX(updated_at) AS last_update,
    NOW() - MAX(updated_at) AS age
FROM events;
```

## Data Architecture Patterns

### Event Streaming
- Use NATS for real-time event streaming
- Implement event schemas for consistency
- Design idempotent consumers
- Monitor stream lag and throughput

### Database Design
- Normalize data for transactional systems
- Denormalize for analytics workloads
- Implement appropriate indexes
- Partition large tables by time or tenant

### Data Governance
- Document data lineage and dependencies
- Implement data classification policies
- Ensure GDPR compliance for personal data
- Maintain data dictionary and schemas

## Tools & Technologies

### Data Processing
- **PostgreSQL**: Primary relational database
- **NATS**: Message streaming platform
- **Python**: Data processing and scripting
- **dbt**: Data transformation framework

### Monitoring & Observability
- **Prometheus**: Metrics collection
- **Grafana**: Data visualization
- **Elasticsearch**: Log aggregation
- **Azure Monitor**: Cloud monitoring

### Development Tools
- **SQL clients**: DBeaver, pgAdmin
- **Version control**: Git for code and schemas
- **CI/CD**: GitHub Actions for pipeline automation
- **Docker**: Containerized data processing jobs

## Best Practices

### Performance Optimization
- Use appropriate indexes for query patterns
- Implement connection pooling
- Batch operations when possible
- Monitor and optimize slow queries
- Use materialized views for complex aggregations

### Data Security
- Encrypt data at rest and in transit
- Implement row-level security where needed
- Use least privilege access principles
- Audit data access and modifications
- Mask sensitive data in non-production environments

### Data Quality
- Implement automated data validation
- Monitor data freshness and completeness
- Set up alerts for anomalies
- Document data quality metrics
- Establish data quality SLAs

## Related Personas

- **[Developer](./developer.md)**: Collaborate on API data requirements
- **[DevOps Engineer](./devops-engineer.md)**: Work together on pipeline infrastructure
- **[Database Administrator](../020-operations-professional/database-admin.md)**: Partner on database optimization
- **[Compliance Officer](../010-governance-compliance/compliance-officer.md)**: Ensure data compliance

## Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [NATS Documentation](https://docs.nats.io/)
- [dbt Documentation](https://docs.getdbt.com/)
- [Data Engineering Best Practices](https://www.dataengineeringweekly.com/)
