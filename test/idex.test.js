/**
 * Simple test suite for the idex Solidity project.
 * Validates that contract files exist and have proper structure.
 * 
 * This test suite addresses the "no test suite detected" finding
 * from the datafactor.com assessment, making the project's test
 * suite runnable on a fresh clone.
 */

const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

const SOLIDITY_DIR = path.join(__dirname, "..");
const SOLIDITY_EXT = ".sol";

function solidityFiles(dir) {
  const results = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      results.push(...solidityFiles(fullPath));
    } else if (file.name.endsWith(SOLIDITY_EXT)) {
      results.push(fullPath);
    }
  }
  return results;
}

// Collect all Solidity source files
const contractFiles = solidityFiles(SOLIDITY_DIR);

describe("idex - Solidity project structure", function () {
  it("Should have Solidity contract files", function () {
    expect(contractFiles).to.be.an("array").that.is.not.empty;
  });

  it("Solidity files should have valid pragma version", function () {
    for (const file of contractFiles) {
      const content = fs.readFileSync(file, "utf8");
      // Check for pragma solidity statement at the top of the file
      // Format: pragma solidity ^0.4.6;
      const hasPragma = /^pragma\s+solidity\s*\^?/.test(content, "m");
      if (!hasPragma) {
        throw new Error(`${file} lacks a pragma solidity statement`);
      }
    }
    // If we get here, all files have pragmas
    expect(true).to.equal(true);
  });

  it("Solidity files should have correct file structure", function () {
    for (const file of contractFiles) {
      const content = fs.readFileSync(file, "utf8");
      // Check that the file doesn't start with a shebang (unusual for Solidity)
      const firstLine = content.split("\n")[0];
      if (firstLine.startsWith("#!")) {
        throw new Error(`${file} has a shebang which is unusual for Solidity`);
      }
    }
    // If we get here, no files have shebangs
    expect(true).to.equal(true);
  });
});