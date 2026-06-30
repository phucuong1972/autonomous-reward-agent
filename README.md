# Autonomous Reward Agent

## Overview
Autonomous Reward Agent is an agent built for Unicity Testnet v2 that automatically rewards users for completing predefined actions without requiring manual approval for each transaction.

## Problem
Communities and online systems often distribute rewards manually, creating delays and requiring human intervention.

## Solution
The agent observes events, evaluates predefined rules, and executes rewards automatically.

## Example Flow

1. User submits:
> "Completed task #12"

2. Agent checks:
- Is task #12 valid?
- Has it already been rewarded?
- Is reward budget available?

3. Agent decides:
> Reward approved

4. Agent executes:
> Send 5 testnet tokens

5. Agent records:
- User
- Reward amount
- Timestamp
- Transaction ID

## Autonomous Behavior
The agent initiates and completes economic actions automatically after rules are defined.

## Network Primitives Used

- Identity
- Messaging
- Payments
- Settlement

## Network
Unicity Testnet v2

## Potential Astrid Integration

- Budget limits
- Execution tracing
- Safety policies

## Status
Early development
# Build Path

### Phase 1: Project Definition
- Define the problem and autonomous workflow
- Specify agent behavior and network primitives

### Phase 2: MVP Development
- Create the agent event loop
- Implement predefined reward rules
- Add payment execution logic
- Add action logging

### Phase 3: Network Integration
- Connect to Unicity Testnet v2
- Enable identity, messaging, and settlement functionality

### Phase 4: Deployment
- Deploy the application publicly
- Test autonomous execution flow
- Prepare submission materials

## Agentic Status

Yes

The agent autonomously initiates and completes economic actions after rules are defined.

## AstridOS Status

Planned / Not yet integrated

## Current Progress

- Project repository created
- Agent workflow connected
- Reward rules implemented
- Logging system implemented
- Config-based reward handling added

- ## Run Instructions

1. Clone the repository

```bash
git clone https://github.com/phucuong1972/autonomous-reward-agent.git
```

2. Enter the project directory

```bash
cd autonomous-reward-agent
```

3. Run the application

```bash
npm start
```

Expected output:

```text
[LOG]: Agent started
Reward sent: 5
[LOG]: Reward amount: 5
[LOG]: Reward of 5 completed
```

