# Project Architecture

Autonomous Reward Agent

Workflow:

User event
↓
Agent starts
↓
Load configuration
↓
Check reward rules
↓
Execute reward
↓
Record logs
↓
Complete process

Modules:

- index.js → application entry point
- agent.js → workflow controller
- rules.js → reward validation
- rewards.js → reward execution
- logger.js → action logging
- config.json → configurable settings

