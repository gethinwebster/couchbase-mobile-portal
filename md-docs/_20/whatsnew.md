---
layout: whatsnew
features:
  - title: New API
    description: |
      Couchbase Lite 2.0 is a groundbreaking new release. We’ve re-imagined the developer experience with a cross-platform common core, new simplified API, and automated conflict resolution. In this release, we are bringing N1QL queries and full-text search capabilities to mobile.
    links: 
      - name: Learn more
        value: 'couchbase-lite/index.html'
  - title: No Conflicts Mode
    description: |
      Sync Gateway 2.0 introduces a 'no conflicts mode'. When enabled, Sync Gateway will reject any revision that would create a conflict. This mode is specifically designed for scenarios where you do not wish to use the multi version concurrency control aspect of Couchbase Mobile.
    links:
      - name: Sync Gateway Configuration
        value: 'guides/sync-gateway/config-properties/index.html#2.0/databases-foo_db-allow_conflicts'
  - title: Travel Sample
    description: |
      This application synchronizes documents with Sync Gateway 1.5 and Couchbase Server 5.0. Shared bucket access is enabled to allow web and mobile clients to perform the same operations on the bucket. It uses the Couchbase Lite 2.0 API that includes support for a N1QL like query interface and Full Text Search.
    links:
      - name: Start building
        value: 'http://docs.couchbase.com/tutorials/travel-sample/'
---