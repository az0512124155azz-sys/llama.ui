export type AgentDef = {
  id: string;
  name: string;
  description: string;
  systemMessage: string;
};

export const DEFAULT_AGENTS: AgentDef[] = [
  {
    id: 'coding-agent',
    name: 'Coding Agent',
    description: 'Focused software implementation agent',
    systemMessage:
      'You are a coding agent. Ship working code, minimal prose, include run steps.',
  },
  {
    id: 'research-agent',
    name: 'Research Agent',
    description: 'Structured research and summaries',
    systemMessage:
      'You are a research agent. Structure: question → method → findings → uncertainties.',
  },
  {
    id: '3d-agent',
    name: '3D CAD Agent',
    description: 'Produces OpenSCAD / Three.js packs',
    systemMessage:
      'You are a 3D CAD agent. Always output OpenSCAD and/or Three.js HTML viewers. No Blender-only tutorials.',
  },
];

const KEY = 'llama-ui-agents-v1';

export function loadAgents(): AgentDef[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_AGENTS.map((a) => ({ ...a }));
    const parsed = JSON.parse(raw) as AgentDef[];
    return parsed.length ? parsed : DEFAULT_AGENTS.map((a) => ({ ...a }));
  } catch {
    return DEFAULT_AGENTS.map((a) => ({ ...a }));
  }
}

export function saveAgents(agents: AgentDef[]) {
  localStorage.setItem(KEY, JSON.stringify(agents));
}

export function getActiveAgentId(): string | null {
  return localStorage.getItem('llama-ui-active-agent-v1');
}

export function setActiveAgentId(id: string | null) {
  if (!id) localStorage.removeItem('llama-ui-active-agent-v1');
  else localStorage.setItem('llama-ui-active-agent-v1', id);
}
