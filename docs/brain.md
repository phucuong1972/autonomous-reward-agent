# Autonomous Reward Agent Brain

## Vision

The purpose of this project is not to automate rewards.

The purpose is to build an autonomous agent that can observe, reason, decide, and act.

Rewards are only one capability of the agent.

---

# Brain Architecture

```
                BRAIN
                   │
    ┌──────────────┼──────────────┐
    ▼              ▼              ▼
 Perception    Knowledge      Reasoning
                   │              │
                   └──────┬───────┘
                          ▼
                     Decision
                          │
                          ▼
                     Execution
```

---

# 1. Perception

Perception answers one question:

> What happened?

Examples:

- A task was completed.
- A reward was requested.
- A task failed.
- A user connected.
- A wallet received tokens.

Perception does not judge.

It only observes facts.

---

# 2. Knowledge

Knowledge answers:

> What do I currently know?

Examples:

- user
- task
- event
- score
- verification
- previous rewards
- wallet state
- network state

Knowledge contains facts.

Not opinions.

---

# 3. Reasoning

Reasoning answers:

> What can I conclude from what I know?

Example

Evidence

✓ Task completed

✓ Event authentic

✓ User verified

✓ Score acceptable

✗ Reward already claimed

Conclusion

User is NOT eligible.

Reasoning produces conclusions.

Not actions.

---

# 4. Decision

Decision answers:

> What should the agent do?

Possible decisions

- reward
- validate
- reject
- queue
- notify
- ignore

A decision is chosen only after reasoning.

---

# 5. Execution

Execution performs the chosen decision.

Examples

reward
    → send payment

notify
    → send notification

queue
    → save for later

ignore
    → finish

---

# Principles

## Principle 1

Observation is not judgment.

Receiving an event does not make it valid.

---

## Principle 2

A request is not proof.

A reward request requires validation.

---

## Principle 3

One fact is never enough.

The agent should reason using multiple pieces of evidence.

---

## Principle 4

Every decision should be explainable.

The agent should always know WHY it made a decision.

---

## Principle 5

Policies guide the brain.

Policies should define behavior.

They should never replace reasoning.

---

# Long-term Goal

The brain should become smarter over time.

Future capabilities include:

- Memory
- Reputation
- Learning
- Planning
- Multi-step reasoning

The architecture should support these capabilities without redesign.