import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/current/introduction/overview">
            Get Started - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): React.ReactElement {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Reference Architecture for Technology & Human Processes in Enterprise Integration">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="text--center" style={{marginBottom: '3rem'}}>
              <Heading as="h2">
                A Comprehensive Reference Architecture
              </Heading>
              <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '1rem auto'}}>
                Chef documents battle-tested patterns for building and operating 
                enterprise integration platforms, covering technical implementation 
                and the human processes that make them successful.
              </p>
            </div>
            
            <Heading as="h3" style={{textAlign: 'center', marginBottom: '2rem'}}>
              🏗️ Technical Architecture
            </Heading>
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔄 GitOps-Driven</h3>
                  <p>
                    All deployments triggered by Git commits, ensuring version control,
                    auditability, and easy rollbacks.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🚀 Automated Deployments</h3>
                  <p>
                    GitHub Actions workflows automatically deploy services when changes
                    are merged to main branches.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔒 Zero-Trust Security</h3>
                  <p>
                    Integration with Azure Key Vault, network policies, and RAISE 2.0
                    DevSecOps compliance.
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>📊 Full Observability</h3>
                  <p>
                    Built-in monitoring, logging, and tracing for all deployed services
                    across environments.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🎯 Service Discovery</h3>
                  <p>
                    Automatic service registration and discovery through NATS messaging
                    infrastructure.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🧠 AI-Powered Configuration</h3>
                  <p>
                    Prompt-based platform configuration that adapts to new patterns and
                    cloud features rapidly.
                  </p>
                </div>
              </div>
            </div>

            <Heading as="h3" style={{textAlign: 'center', marginTop: '4rem', marginBottom: '2rem'}}>
              👥 Human Processes & Operations
            </Heading>
            <div className="row">
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>📋 Operations Runbooks</h3>
                  <p>
                    Documented procedures for day-to-day operations, incident response,
                    and maintenance tasks.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🤝 Team Collaboration</h3>
                  <p>
                    Best practices for team organization, communication patterns,
                    and decision-making processes.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔄 Change Management</h3>
                  <p>
                    Structured approaches to planning, reviewing, and deploying
                    changes across environments.
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🛡️ Security Practices</h3>
                  <p>
                    Security review processes, compliance workflows, and audit
                    procedures for enterprise requirements.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔧 Troubleshooting Guides</h3>
                  <p>
                    Common issues, debugging techniques, and resolution strategies
                    developed from real-world experience.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>📈 Continuous Improvement</h3>
                  <p>
                    Feedback loops, metrics tracking, and evolving practices based
                    on lessons learned.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
