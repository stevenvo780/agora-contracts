export const AGENT_UI_PANEL_REGISTRY = [
  { panelId: 'files', label: 'Archivos', openAction: 'sidebar', sidebarView: 'files', agentAlias: 'files' },
  { panelId: 'search', label: 'Buscar', openAction: 'sidebar', sidebarView: 'search', agentAlias: 'search' },
  { panelId: 'git', label: 'Git', openAction: 'sidebar', sidebarView: 'git', agentAlias: 'git' },
  { panelId: 'snippets', label: 'Snippets', openAction: 'sidebar', sidebarView: 'snippets', agentAlias: 'snippets' },
  { panelId: 'board', label: 'Tablero', openAction: 'mosaic', mosaicType: 'board', agentAlias: 'board' },
  { panelId: 'semantic', label: 'Glosario semántico', openAction: 'mosaic', mosaicType: 'semantic-browser', agentAlias: 'semantic' },
  { panelId: 'st', label: 'ST runner', openAction: 'mosaic', mosaicType: 'st-runner', agentAlias: 'st' },
  { panelId: 'formalizer', label: 'Formalizador', openAction: 'mosaic', mosaicType: 'formalizer', agentAlias: 'formalizer' },
  { panelId: 'ai', label: 'Agora AI', openAction: 'right-panel', agentAlias: 'ai' },
  { panelId: 'ai-config', label: 'Configuración IA', openAction: 'modal', agentAlias: 'ai-config' },
  { panelId: 'linter-config', label: 'Configuración linter', openAction: 'event', agentAlias: 'linter-config' },
  { panelId: 'terminal', label: 'Terminal', openAction: 'bottom-dock', agentAlias: 'terminal' },
  { panelId: 'problems', label: 'Problemas', openAction: 'bottom-dock', agentAlias: 'problems' },
  { panelId: 'settings', label: 'Ajustes', openAction: 'modal', agentAlias: 'settings' }
] as const;

export type AgentUiPanelRegistryEntry = typeof AGENT_UI_PANEL_REGISTRY[number];
export type AgentUiPanel = AgentUiPanelRegistryEntry['panelId'];

export const AGENT_UI_PANELS = AGENT_UI_PANEL_REGISTRY.map((entry) => entry.panelId) as AgentUiPanel[];
export const AGENT_UI_PANEL_DESCRIPTION = AGENT_UI_PANELS.join(', ');

const AGENT_UI_PANEL_SET = new Set<string>(AGENT_UI_PANELS);

export function isAgentUiPanel(value: string): value is AgentUiPanel {
  return AGENT_UI_PANEL_SET.has(value);
}

export const AGENT_UI_COMMAND_TYPES = [
  'open_panel',
  'focus_folder',
  'open_terminal',
  'open_problems',
  'open_ai_config',
  'open_linter_config',
  'focus-document-section',
  'prompt-user-choice',
  'show-diff',
  'agent-status',
  'agent-plan'
] as const;

export type AgentUiCommandType = typeof AGENT_UI_COMMAND_TYPES[number];

const AGENT_UI_COMMAND_TYPE_SET = new Set<string>(AGENT_UI_COMMAND_TYPES);

export function isAgentUiCommandType(value: string): value is AgentUiCommandType {
  return AGENT_UI_COMMAND_TYPE_SET.has(value);
}

export function commandTypeForPanel(panel: AgentUiPanel): AgentUiCommandType {
  if (panel === 'terminal') return 'open_terminal';
  if (panel === 'problems') return 'open_problems';
  if (panel === 'ai-config') return 'open_ai_config';
  if (panel === 'linter-config') return 'open_linter_config';
  return 'open_panel';
}
