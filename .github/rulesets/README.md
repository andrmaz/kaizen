# Branch Protection Rulesets

This directory contains repository rulesets for branch protection.

## Main Branch Protection

The `main-branch-protection.json` ruleset protects the main branch with the following rules:

### Protection Rules

1. **Deletion Prevention**: Prevents deletion of the main branch
2. **Non-Fast-Forward Prevention**: Prevents force pushes and ensures linear history
3. **Required Linear History**: Enforces a linear commit history
4. **Pull Request Requirements**:
   - At least 1 approving review required
   - Stale reviews are dismissed on new pushes
   - All review threads must be resolved before merging
5. **Required Status Checks**:
   - CI workflow must pass before merging
   - Branches must be up to date before merging (strict mode)

### Applying the Ruleset

GitHub repository rulesets can be applied through the GitHub UI:

1. Go to repository Settings → Rules → Rulesets
2. Import or manually create the ruleset using the configuration in this directory
3. Ensure the ruleset is set to "Active" enforcement

Alternatively, if you have repository admin permissions, you can use the GitHub REST API to apply the ruleset programmatically.

### Modifying the Ruleset

To modify the ruleset:

1. Edit the JSON file in this directory
2. Ensure the JSON is valid
3. Update the ruleset in GitHub repository settings or via the API

### Notes

- The `integration_id: 15368` refers to GitHub Actions CI integration
- Bypass actors can be configured if certain users or teams need to bypass these rules
- The ruleset targets branches matching `refs/heads/main`
