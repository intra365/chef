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
    <header className={styles.heroBanner}>
      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          <div className={styles.heroTagline}>AI Crafted with Excellence</div>
          <Heading as="h1" className={styles.heroTitle}>
            <span className={styles.heroTitlePrimary}>Intranet Glazing</span>
            <span className={styles.heroTitleAccent}>An Reference Architecture</span>
          </Heading>
          <p className={styles.heroSubtitle}>
           Most organizations already have an intranet or a Microsoft 365-based digital workplace – but employees still complain that it’s confusing, cluttered, and hard to love. The problem often isn’t the platform; it’s the glazing.
          </p>
          <div className={styles.buttons}>
            <Link
              className={styles.primaryButton}
              to="/docs/current/introduction/overview">
              Explore Architecture →
            </Link>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>100+</span>
              <span className={styles.heroStatLabel}>Happy Developers</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>50+</span>
              <span className={styles.heroStatLabel}>Architecture Patterns</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>5★</span>
              <span className={styles.heroStatLabel}>Enterprise Grade</span>
            </div>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <img 
            src="/img/icing.png" 
            alt="Architecture Excellence" 
            className={styles.heroImage}
          />
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
        {/* Introduction Section */}
        <section className={styles.introSection}>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="text--center">
                  <h2 className={styles.sectionTitle}>A Complete Reference Architecture</h2>
                  <p className={styles.sectionDescription}>
                    This reference architecture provides comprehensive documentation covering both technology patterns 
                    and human processes for building, deploying, and operating enterprise-grade 
                    GitOps platforms. Use this as a blueprint for your own implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Features Cards */}
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--6">
                <div className={styles.card}>
                  <div className="text--center">
                    <span className={styles.cardIcon}>🏗️</span>
                    <h3 className={styles.cardTitle}>Technology Architecture</h3>
                    <p className={styles.cardDescription}>
                      Complete technical reference including GitOps workflows, Kubernetes 
                      configurations, security implementations, infrastructure patterns, 
                      and service orchestration examples.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col--6">
                <div className={styles.card}>
                  <div className="text--center">
                    <span className={styles.cardIcon}>👥</span>
                    <h3 className={styles.cardTitle}>Human Process Frameworks</h3>
                    <p className={styles.cardDescription}>
                      Operational runbooks, incident response procedures, contribution 
                      guidelines, compliance workflows, and team collaboration patterns 
                      for sustainable operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={clsx('row', styles.featureRow)}>
              <div className="col col--4">
                <div className={styles.card}>
                  <div className="text--center">
                    <span className={styles.cardIcon}>🔄</span>
                    <h3 className={styles.cardTitle}>GitOps Patterns</h3>
                    <p className={styles.cardDescription}>
                      Deployment workflows, automation strategies, and version control 
                      practices for reliable software delivery.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.card}>
                  <div className="text--center">
                    <span className={styles.cardIcon}>🔒</span>
                    <h3 className={styles.cardTitle}>Security & Compliance</h3>
                    <p className={styles.cardDescription}>
                      Zero-trust security models, RAISE 2.0 compliance frameworks, and 
                      vulnerability management processes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col col--4">
                <div className={styles.card}>
                  <div className="text--center">
                    <span className={styles.cardIcon}>📚</span>
                    <h3 className={styles.cardTitle}>Operations Runbooks</h3>
                    <p className={styles.cardDescription}>
                      Day-to-day operational procedures, incident response playbooks, 
                      and maintenance workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
