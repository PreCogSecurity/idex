# idex

Decentralized exchange contract for trading ERC-20 tokens. Built with Solidity ^0.4.6/^0.4.7.

## Overview

This repository implements a contract-matching exchange (idex-style) with order book matching, whitelisting, and fee handling. The core contracts are:

- **Exchange** - Main exchange contract with order matching
- **ExchangeWhitelist** - Exchange with whitelist-based access control
- **MyToken** - ERC-20 compatible token contract
- **DVIP** - Fee interface contract
- **Namereg** - Name registration resolution service

## Prerequisites

- [Solidity](https://solidity-lang.org/) ^0.4.6 or ^0.4.7 (compiler)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) (for containerized local development)
- [Git](https://git-scm.com/)

## Local Development

### Using Docker Compose

```bash
docker-compose up -d
```

This builds the container and starts the service. The Dockerfile copies the repository contents into an Ubuntu 22.04 container.

### Manual Solidity Compilation

```bash
# Compile with solc
solc --version 0.4.7
solc --optimize --bin --abi -o build/ *.sol
```

### Development Workflow

1. Clone the repository
2. Run `docker-compose up` or compile Solidity contracts manually
3. Deploy contracts to your preferred Ethereum network
4. Use the exchange interface to trade tokens

## Environment Variables

The following environment variables are referenced in the Docker Compose configuration:

| Variable | Description | Example |
|---|---|---|
| `NODE_ENV` | Runtime environment | `development` |
| `PORT` | Server port | `8080` |

See `.env.example` for placeholder values.

## Repository Structure

```
.
  Exchange.sol              - Main exchange contract
  ExchangeWhitelist.sol     - Exchange with whitelist
  MyToken.sol               - ERC-20 token
  DVIP.sol                  - Fee calculation interface
  lib/                      - Library contracts (Math, Owned, etc.)
  interface/                - Contract interfaces
  docker-compose.yml        - Local development environment
  Dockerfile                - Containerized build environment
```

## Testing

No automated test suite is configured beyond the project-level structure validation. Manual verification through contract deployment and transaction simulation is recommended until a test framework (e.g., Truffle, Hardhat) is integrated.

## Contributing

Work is organized into small, test-paired commits that include both code changes and corresponding validations. See the test suite in `test/` for the project's validation pattern.