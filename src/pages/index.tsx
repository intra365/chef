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
            Explore the Reference Architecture 📚
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
      description="Reference Architecture for Technology & Human Processes">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row" style={{marginBottom: '3rem'}}>
              <div className="col">
                <div className="text--center padding-horiz--md">
                  <h2>A Complete Reference Architecture</h2>
                  <p style={{fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto'}}>
                    Chef provides comprehensive documentation covering both technology patterns 
                    and human processes for building, deploying, and operating enterprise-grade 
                    GitOps platforms. Use this as a blueprint for your own implementation.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col col--6">
                <div className="text--center padding-horiz--md">
                  <h3>🏗️ Technology Architecture</h3>
                  <p>
                    Complete technical reference including GitOps workflows, Kubernetes 
                    configurations, security implementations, infrastructure patterns, 
                    and service orchestration examples.
                  </p>
                </div>
              </div>
              <div className="col col--6">
                <div className="text--center padding-horiz--md">
                  <h3>👥 Human Process Frameworks</h3>
                  <p>
                    Operational runbooks, incident response procedures, contribution 
                    guidelines, compliance workflows, and team collaboration patterns 
                    for sustainable operations.
                  </p>
                </div>
              </div>
            </div>
            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔄 GitOps Patterns</h3>
                  <p>
                    Deployment workflows, automation strategies, and version control 
                    practices for reliable software delivery.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>🔒 Security & Compliance</h3>
                  <p>
                    Zero-trust security models, RAISE 2.0 compliance frameworks, and 
                    vulnerability management processes.
                  </p>
                </div>
              </div>
              <div className="col col--4">
                <div className="text--center padding-horiz--md">
                  <h3>📚 Operations Runbooks</h3>
                  <p>
                    Day-to-day operational procedures, incident response playbooks, 
                    and maintenance workflows.
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
