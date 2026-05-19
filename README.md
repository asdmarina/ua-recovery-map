# UA Rebuild — Public Recovery & Contribution Memory Layer for Ukraine

**[uarebuild.org](https://uarebuild.org)** · Pilot / May 2026

A public system that records, verifies, and archives humanitarian and reconstruction contributions across Ukraine. Every donation, volunteer action, and rebuilt community — permanently recorded and independently verifiable via BNB Chain.

---

## What it is

UA Rebuild is a **civic recognition and verification platform**, not a reconstruction map.

It combines:
- **Wall of Rebuilders** — a public honor archive of verified contributors (NGOs, donors, volunteer groups)
- **Community Recovery Feed** — living recovery stories from 1,673 Ukrainian communities
- **On-chain verification** — records anchored to BNB Chain, publicly auditable on BscScan
- **AI-assisted queries** — natural language Q&A over community and contribution data (Claude API)

The goal: a permanent public record that cannot be revised, deleted, or forgotten.

---

## The problem it solves

Over $47B in international aid committed to Ukraine reconstruction — with no unified public accountability layer. OCHA, UNHCR, government registries, and NGO reports exist in silos. There is no tool that makes this data accessible, verifiable, and permanent at community level.

UA Rebuild is the missing layer on top of existing data sources.

---

## Pages

| File | Description |
|------|-------------|
| `index.html` | Main landing page — hero, wall preview, community feed, how it works, submission form, roadmap |
| `wall.html` | Full Wall of Rebuilders — filterable grid of verified contributor cards |
| `map.html` | Interactive community recovery map (Leaflet.js) with layer switching and sidebar details |

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML / CSS / Vanilla JS |
| Map | Leaflet.js 1.9.4 |
| Blockchain | BNB Chain (BEP-20 smart contract) |
| AI | Claude API (Anthropic) — Q&A, analytics, report generation |
| Data | OCHA, ACLED, UNHCR, Ukrainian state open datasets |
| Backend (planned) | Node.js, PostgreSQL |
| Fonts | Bebas Neue, IBM Plex Mono, Inter (Google Fonts) |

---

## Smart contract (Testnet)

**Address:** `0x93F529ad791D7F0FD27CA4091c253b5291947fcD`  
**Network:** BNB Chain Testnet  
**Verifications:** 9 on-chain records (pilot)  
[View on BscScan →](https://testnet.bscscan.com/address/0x93f529ad791d7f0fd27ca4091c253b5291947fcd)

---

## Status

**Pilot · May 2026**

- [x] System architecture
- [x] Interactive map prototype
- [x] Wall of Rebuilders — UI
- [x] AI chatbot — basic Q&A
- [x] BNB Chain testnet — 9 verifications live
- [x] Bilingual UI (UA / EN)
- [ ] BNB Chain mainnet deployment
- [ ] Real OCHA/UNHCR data pipeline
- [ ] NGO partner onboarding
- [ ] Public API

---

## Roadmap

| Phase | Target | Milestones |
|-------|--------|------------|
| 3 months | Aug 2026 | Mainnet deploy, 30–50 on-chain records, verification pipeline |
| 6 months | Nov 2026 | 100–200 records, first real NGO partners, automation spec |
| 12 months | May 2027 | 500+ records, public API, DREAM registry integration, replication model |

---

## Competitive landscape

| Platform | Focus | Gap |
|----------|-------|-----|
| DREAM | State project registry | Not public until 2027, no AI/blockchain |
| Big Recovery Portal | Object-level monitoring | No AI analytics, no on-chain verification |
| Antikorruptsiynyy Shtab map | Damaged buildings registry | No open data aggregation, no analytics layer |
| **UA Rebuild** | **Public civic memory + verification** | Fills the gap: AI queries + immutable on-chain proof |

---

## Founder

Marina Linchevska - Senior Product Designer with experience building monitoring systems for UNDP.

---

## Contact

- **Web:** [uarebuild.org](https://uarebuild.org)
- **Email:** hello@uarebuild.org
- **GitHub:** [github.com/asdmarina/uarebuild.org](https://github.com/asdmarina/uarebuild.org)

---

*UA Rebuild is built on open data, verified on-chain, and sustained by those who believe accountability is part of rebuilding.*
