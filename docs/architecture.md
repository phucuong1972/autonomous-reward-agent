# Project Architecture

## Autonomous Reward Agent

An autonomous reward-processing agent that derives a non-custodial Unicity DIRECT identity from a locally stored mnemonic and executes configurable reward logic.

### Workflow

```text
User event
↓
Agent starts
↓
Load configuration
↓
Load mnemonic from .env
↓
Derive DIRECT identity using Sphere SDK
↓
Evaluate reward rules
↓
Execute reward
↓
Record logs and update budget
↓
Complete process
```

### Modules

- `agent.js` → main workflow controller and startup orchestration
- `wallet.mjs` → derives a non-custodial Unicity DIRECT identity from a mnemonic using Sphere SDK
- `get-wallet-id.js` → bridges the ES module wallet implementation with the CommonJS reward agent
- `rules.js` → evaluates reward eligibility
- `rewards.js` → executes reward distribution
- `logger.js` → records agent activity
- `config.json` → stores configurable runtime settings
- `.env` → stores the local mnemonic used by the agent

### Identity and Authentication

The agent derives a persistent non-custodial Unicity DIRECT identity from a locally stored mnemonic. It generates a public key from its identity, cryptographically signs messages, and successfully verifies signed messages using the Sphere SDK. These capabilities provide a foundation for authenticated interactions with other network participants.