---
id: database-admin
title: Database Administrator
sidebar_label: Database Administrator
sidebar_position: 2
persona_type: specialized
parent_persona: operations-professional
---

# Database Administrator

Database Administrators (DBAs) are responsible for the performance, integrity, security, and availability of PostgreSQL databases in the Intra365 platform. They manage database schemas, optimize queries, implement backup strategies, and ensure data reliability.

## Role Profile

### Primary Responsibilities
- Manage PostgreSQL database instances and clusters
- Monitor database performance and optimize queries
- Implement and maintain backup and recovery procedures
- Manage database security and access controls
- Perform database schema migrations and updates
- Troubleshoot database issues and bottlenecks
- Ensure data integrity and consistency
- Document database configurations and procedures

### Key Skills
- Expert knowledge of PostgreSQL administration
- SQL query optimization and performance tuning
- Database backup and recovery strategies
- Understanding of replication and high availability
- Experience with monitoring tools and metrics
- Knowledge of database security best practices
- Capacity planning and scaling strategies
- Scripting for automation (Python, Bash, SQL)

### Daily Activities
- Monitoring database performance metrics
- Reviewing slow query logs and optimizing queries
- Performing database backups and verifying restore points
- Managing database user access and permissions
- Responding to database alerts and incidents
- Reviewing and implementing schema changes
- Analyzing database growth and capacity trends

## Documentation Priorities

### Essential Reading
1. **[PostgreSQL Databases](../../010-guides/050-service-configurations/08-postgresql-databases.md)** - Database configuration and management
2. **[Backup and Restore](../../010-guides/070-operations-runbooks/04-backup-restore.md)** - Data protection procedures
3. **[Observability](../../010-guides/030-infrastructure/05-observability.md)** - Database monitoring
4. **[Disaster Recovery](../../010-guides/030-infrastructure/06-disaster-recovery.md)** - Recovery strategies

### Infrastructure
- **[Storage](../../010-guides/030-infrastructure/03-storage.md)** - Persistent storage configuration
- **[Scaling Strategy](../../010-guides/030-infrastructure/07-scaling-strategy.md)** - Database scaling approaches

### Security
- **[Secrets Management](../../010-guides/030-infrastructure/04-secrets-management.md)** - Database credentials management
- **[Zero Trust Architecture](../../010-guides/060-security-compliance/010-core-security/01-zero-trust-architecture.md)** - Security model
- **[Audit Logging](../../010-guides/060-security-compliance/010-core-security/07-audit-logging.md)** - Database audit trails

### Troubleshooting
- **[Database Issues](../../010-guides/080-troubleshooting/04-storage-issues.md)** - Common database problems
- **[Performance Issues](../../010-guides/080-troubleshooting/05-performance-debugging.md)** - Performance optimization

## Common Tasks

### Database Performance Monitoring

```bash
# Connect to PostgreSQL pod
kubectl exec -it -n intra365 postgres-0 -- psql -U postgres

# Check database connections
SELECT count(*) FROM pg_stat_activity;
SELECT pid, usename, application_name, client_addr, state, query 
FROM pg_stat_activity 
WHERE state != 'idle';

# View long-running queries
SELECT pid, now() - pg_stat_activity.query_start AS duration, query, state
FROM pg_stat_activity
WHERE state != 'idle' AND now() - pg_stat_activity.query_start > interval '5 minutes'
ORDER BY duration DESC;

# Kill a long-running query
SELECT pg_terminate_backend(pid);

# Check database sizes
SELECT pg_database.datname,
       pg_size_pretty(pg_database_size(pg_database.datname)) AS size
FROM pg_database
ORDER BY pg_database_size(pg_database.datname) DESC;

# Check table sizes
SELECT schemaname,
       tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 20;
```

### Query Optimization

```sql
-- Enable query timing
\timing on

-- Analyze query execution plan
EXPLAIN ANALYZE
SELECT u.id, u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > NOW() - INTERVAL '30 days'
GROUP BY u.id, u.name;

-- Check table statistics
SELECT schemaname, tablename, n_live_tup, n_dead_tup, last_vacuum, last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;

-- Manually vacuum table
VACUUM ANALYZE orders;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;

-- Find missing indexes
SELECT schemaname, tablename, seq_scan, seq_tup_read, 
       idx_scan, seq_tup_read / seq_scan AS avg_seq_tup
FROM pg_stat_user_tables
WHERE seq_scan > 0
ORDER BY seq_tup_read DESC
LIMIT 20;

-- Create index for optimization
CREATE INDEX CONCURRENTLY idx_orders_user_created 
ON orders(user_id, created_at);
```

### Backup and Recovery

```bash
# Perform manual backup
kubectl exec -n intra365 postgres-0 -- pg_dump -U postgres -Fc intra365_db > backup_$(date +%Y%m%d_%H%M%S).dump

# List backups in Azure Blob Storage
az storage blob list \
  --account-name intra365storage \
  --container-name database-backups \
  --output table

# Restore from backup
kubectl exec -i -n intra365 postgres-0 -- pg_restore -U postgres -d intra365_db < backup_20240115_120000.dump

# Test backup integrity
kubectl exec -n intra365 postgres-0 -- pg_dump -U postgres --schema-only intra365_db | head -n 50

# Point-in-time recovery info
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SELECT pg_current_wal_lsn();"

# Check WAL archiving status
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SELECT * FROM pg_stat_archiver;"
```

### User and Access Management

```sql
-- List all users and their privileges
\du

-- Create new database user
CREATE USER app_readonly WITH PASSWORD 'secure_password';

-- Grant read-only access
GRANT CONNECT ON DATABASE intra365_db TO app_readonly;
GRANT USAGE ON SCHEMA public TO app_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO app_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO app_readonly;

-- Create application user with write access
CREATE USER app_service WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE intra365_db TO app_service;
GRANT USAGE, CREATE ON SCHEMA public TO app_service;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_service;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO app_service;

-- Revoke privileges
REVOKE ALL PRIVILEGES ON DATABASE intra365_db FROM old_user;
DROP USER old_user;

-- View user permissions
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name='users';
```

### Database Maintenance

```sql
-- Check database bloat
SELECT schemaname, tablename,
       pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS total_size,
       round(100 * pg_total_relation_size(schemaname||'.'||tablename) / 
             pg_database_size(current_database())) AS percent_of_db
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC
LIMIT 20;

-- Reindex database
REINDEX DATABASE intra365_db;

-- Update table statistics
ANALYZE VERBOSE;

-- Check for table locks
SELECT relation::regclass, mode, granted
FROM pg_locks
WHERE relation IS NOT NULL;

-- Monitor replication lag (if using replication)
SELECT client_addr, state, sync_state, 
       replay_lag, write_lag, flush_lag
FROM pg_stat_replication;
```

### Configuration Management

```bash
# View PostgreSQL configuration
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SHOW ALL;"

# Check specific configuration values
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SHOW max_connections;"
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SHOW shared_buffers;"
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SHOW work_mem;"

# Edit PostgreSQL configuration (requires restart)
kubectl edit configmap postgres-config -n intra365

# Reload configuration (for changes that don't require restart)
kubectl exec -n intra365 postgres-0 -- psql -U postgres -c "SELECT pg_reload_conf();"

# Restart PostgreSQL (for major config changes)
kubectl rollout restart statefulset/postgres -n intra365
```

## Database Administration Best Practices

### Performance Optimization
- Regularly analyze and vacuum tables to maintain statistics
- Monitor and optimize slow queries using pg_stat_statements
- Use appropriate indexes for common query patterns
- Configure connection pooling to manage connections efficiently
- Set appropriate work_mem and shared_buffers based on workload
- Use partitioning for large tables

### Backup Strategy
- Implement automated daily backups
- Test restore procedures regularly (monthly minimum)
- Maintain multiple backup retention periods (daily, weekly, monthly)
- Store backups in geographically separate locations
- Document recovery time objectives (RTO) and recovery point objectives (RPO)
- Enable Point-in-Time Recovery (PITR) with WAL archiving

### Security Hardening
- Use strong passwords and rotate credentials regularly
- Implement least privilege access control
- Enable SSL/TLS for all database connections
- Configure pg_hba.conf to restrict access by IP/subnet
- Enable audit logging for sensitive operations
- Regularly review and audit user permissions
- Never expose database ports directly to the internet

### High Availability
- Configure PostgreSQL replication for redundancy
- Use connection pooling (PgBouncer) to manage connections
- Implement automatic failover mechanisms
- Monitor replication lag continuously
- Test failover procedures regularly
- Document failover and recovery procedures

### Capacity Planning
- Monitor database growth trends
- Set up alerts for disk space (warning at 70%, critical at 85%)
- Archive or purge old data according to retention policies
- Plan for peak load scenarios
- Review and optimize table partitioning strategies
- Forecast storage needs based on growth patterns

## Tools & Technologies

### Database Management
- **psql**: PostgreSQL command-line interface
- **pgAdmin**: Web-based administration tool
- **Azure Database for PostgreSQL**: Managed PostgreSQL service
- **pg_dump/pg_restore**: Backup and restore utilities

### Monitoring & Performance
- **pg_stat_statements**: Query performance tracking
- **pgBadger**: PostgreSQL log analyzer
- **Prometheus + Grafana**: Metrics and visualization
- **Azure Monitor**: Cloud monitoring for PostgreSQL

### High Availability
- **Patroni**: PostgreSQL HA cluster manager
- **PgBouncer**: Connection pooling
- **Streaming Replication**: Built-in PostgreSQL replication
- **Azure Database HA**: Managed high availability

### Automation & Tools
- **Ansible**: Configuration automation
- **Terraform**: Infrastructure provisioning
- **Python psycopg2**: Database automation scripts
- **pgcli**: Enhanced PostgreSQL CLI

## Related Personas

- **[System Administrator](./system-admin.md)**: Collaborate on infrastructure and resource management
- **[SRE](../040-technical-practitioner/sre.md)**: Work together on reliability and monitoring
- **[Data Engineer](../040-technical-practitioner/data-engineer.md)**: Support data pipeline and analytics needs
- **[Developer](../040-technical-practitioner/developer.md)**: Assist with query optimization and schema design
- **[Support Engineer](./support-engineer.md)**: Help troubleshoot application database issues

## Additional Resources

- [PostgreSQL Official Documentation](https://www.postgresql.org/docs/)
- [PostgreSQL Performance Tuning](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Azure Database for PostgreSQL Documentation](https://docs.microsoft.com/en-us/azure/postgresql/)
- [PostgreSQL High Availability](https://www.postgresql.org/docs/current/high-availability.html)
- [pgBadger Log Analyzer](https://github.com/darold/pgbadger)
