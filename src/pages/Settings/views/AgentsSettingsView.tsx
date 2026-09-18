import { useEffect, useState } from 'react';
import { SettingsSectionLabel } from '../components';
import { Button } from '../../../components';
import {
  AgentDef,
  getActiveAgentId,
  loadAgents,
  saveAgents,
  setActiveAgentId,
} from '../../../features/agents/defaults';
import { SettingsTabViewProps } from '../types';

export function AgentsSettingsView({
  config,
  onSaveConfig,
}: SettingsTabViewProps) {
  const [agents, setAgents] = useState<AgentDef[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    setAgents(loadAgents());
    setActive(getActiveAgentId());
  }, []);

  const applyAgent = async (agent: AgentDef) => {
    setActiveAgentId(agent.id);
    setActive(agent.id);
    await onSaveConfig({
      ...config,
      systemMessage: agent.systemMessage,
    });
  };

  const clearAgent = async () => {
    setActiveAgentId(null);
    setActive(null);
  };

  const addAgent = () => {
    const id = `agent-${Date.now()}`;
    const next = [
      ...agents,
      {
        id,
        name: 'New Agent',
        description: 'Custom agent',
        systemMessage: 'You are a helpful agent.',
      },
    ];
    setAgents(next);
    saveAgents(next);
  };

  const updateAgent = (id: string, patch: Partial<AgentDef>) => {
    const next = agents.map((a) => (a.id === id ? { ...a, ...patch } : a));
    setAgents(next);
    saveAgents(next);
  };

  return (
    <div className="flex flex-col gap-4">
      <SettingsSectionLabel>Agents</SettingsSectionLabel>
      <p className="text-sm opacity-70">
        Agents set a focused system message. Apply one to overwrite the current
        system message (Settings → General).
      </p>
      {agents.map((a) => (
        <div
          key={a.id}
          className="p-3 rounded-xl border border-base-300 bg-base-200/40 flex flex-col gap-2"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <input
              className="input input-sm input-bordered flex-1 min-w-[8rem]"
              value={a.name}
              onChange={(e) => updateAgent(a.id, { name: e.target.value })}
            />
            <Button
              className={`btn btn-sm ${
                active === a.id ? 'btn-primary' : 'btn-outline'
              }`}
              onClick={() => applyAgent(a)}
            >
              {active === a.id ? 'Active' : 'Apply'}
            </Button>
          </div>
          <input
            className="input input-sm input-bordered w-full"
            value={a.description}
            onChange={(e) => updateAgent(a.id, { description: e.target.value })}
          />
          <textarea
            className="textarea textarea-bordered text-sm w-full min-h-24"
            value={a.systemMessage}
            onChange={(e) =>
              updateAgent(a.id, { systemMessage: e.target.value })
            }
          />
        </div>
      ))}
      <div className="flex gap-2">
        <Button className="btn btn-sm btn-outline" onClick={addAgent}>
          Add agent
        </Button>
        <Button className="btn btn-sm btn-ghost" onClick={clearAgent}>
          Clear active agent
        </Button>
      </div>
    </div>
  );
}
