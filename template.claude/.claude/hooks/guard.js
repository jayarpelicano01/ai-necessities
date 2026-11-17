let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

process.stdin.on('end', () => {
  let event;
  try {
    event = JSON.parse(input || '{}');
  } catch {
    process.exit(0);
  }

  const tool = String(event.tool_name || '');
  const toolInput = event.tool_input || {};

  const deny = (reason) => {
    process.stdout.write(
      JSON.stringify({
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason: reason,
        },
      }),
    );
  };

  if (tool === 'Bash' || tool === 'PowerShell') {
    const command = String(toolInput.command || '');
    const normalized = command.toLowerCase();

    // Matches git plus global options such as `-C <repo>` before the subcommand.
    const git = String.raw`\bgit(?:\s+(?:-c\s+\S+|--[\w-]+(?:=\S+)?))*\s+`;

    const blockedCommands = [
      [
        new RegExp(git + String.raw`push\b[^;|&\n]*(\s-[a-z]*f\b|\s--force|\s\+\S)`),
        'Force-push is blocked by the Claude adapter.',
      ],
      [/\bnpm\s+publish\b/, 'npm publish is blocked by the Claude adapter.'],
      [
        /(\brm\s+-[a-z]*(rf|fr)|\b(rm|del|rmdir|rd|ri|remove-item)\b[^;|&\n]*\s-r(ecurse)?\b)/,
        'Destructive deletion is blocked by the Claude adapter.',
      ],
      [new RegExp(git + String.raw`reset\s+--hard\b`), 'git reset --hard is blocked by the Claude adapter.'],
      [new RegExp(git + String.raw`clean\s+-[a-z]*f`), 'git clean -f is blocked by the Claude adapter.'],
      [/(supabase\s+db\s+push|terraform\s+destroy)/, 'Destructive remote changes are blocked by the Claude adapter.'],
    ];

    for (const [pattern, reason] of blockedCommands) {
      if (pattern.test(normalized)) {
        deny(reason);
        return;
      }
    }
  }

  if (tool === 'Edit' || tool === 'Write' || tool === 'NotebookEdit') {
    const filePath = String(
      toolInput.file_path || toolInput.path || toolInput.notebook_path || '',
    ).replaceAll('\\', '/');
    const baseName = filePath.split('/').pop().toLowerCase();

    if (/\.env(?:\.|$)/i.test(baseName) && baseName !== '.env.example') {
      deny('Secret environment files are blocked. Use the project secret workflow.');
      return;
    }

    if (/(^|\/)(\.git|node_modules)(\/|$)/i.test(filePath)) {
      deny('Git metadata and installed dependency folders are protected.');
      return;
    }

    if (/(^|\/)(id_rsa|id_ed25519|credentials\.json|service-account\.json)(\/|$)/i.test(filePath) || /\.(pem|key)$/i.test(baseName)) {
      deny('Credential and private-key files are protected.');
      return;
    }
  }

  process.exit(0);
});
