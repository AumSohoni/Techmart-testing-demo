# TechMart QA Automation Framework

A structured QA project that demonstrates end-to-end software testing practice on a sample e-commerce application (TechMart).

## Purpose

This repository is used to plan, execute, and document professional QA work across:

- Manual functional testing
- Playwright end-to-end automation
- Test planning and risk analysis
- Evidence-based reporting and traceability

The goal is to show a complete testing lifecycle with clear artifacts, reproducible steps, and measurable outcomes.

## What This Project Demonstrates

- Risk-based test planning
- Manual functional testing
- Playwright E2E automation
- Page Object Model
- API validation
- Test data management
- Cross-browser testing
- CI/CD with GitHub Actions
- Automated test reporting
- Defect documentation

Quick reference:

- `Testing_Guides/QUICK_REFERENCE.md`

## Repository Structure

```text
software-testing-course/
|-- README.md
|-- auto-commit.ps1
|-- package.json
|-- sample-app/
|   |-- server.js
|   |-- package.json
|   `-- public/
`-- Testing_Guides/
    |-- MANUAL_TEST_CASES.md
    |-- PLAYWRIGHT_SETUP_GUIDE.md
    |-- QUICK_REFERENCE.md
    `-- TEST_PLAN.md
```

## Current Workstreams

- Manual test execution and evidence logging
- Playwright automation build-out
- Defect tracking and re-test cycles
- Coverage and pass-rate reporting

## Success Metrics

This project targets:

- High coverage of critical user flows
- Consistent execution logs for manual and automated runs
- Clear defect documentation with severity and impact
- Reliable regression suite for repeatable validation

## Local Setup

### Prerequisites

- Node.js 18+
- npm
- Git

### Start the sample app

```bash
cd sample-app
npm install
npm start
```

App URL: `http://localhost:3000`

### Install test dependencies at repo root

```bash
cd ..
npm install
```

### Run Playwright tests

```bash
npm test
```

## Optional: Auto Commit Watcher

A PowerShell watcher is available to auto-commit and push repository changes while you work.

```powershell
powershell -ExecutionPolicy Bypass -File .\auto-commit.ps1 -Branch main
```

## Execution Standards

- Keep test outcomes factual and reproducible
- Record evidence for failed scenarios and critical paths
- Use structured commit messages:
  - `test(manual): ...`
  - `test(e2e): ...`
  - `fix(app): ...`
  - `docs(qa): ...`

## Roadmap

1. Finalize and baseline manual test execution logs
2. Implement core Playwright auth/cart/checkout coverage
3. Add CI execution and automated report publishing
4. Review quality metrics and refine regression suite

## License

This repository is for learning and portfolio demonstration.
