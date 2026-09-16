"use client";

import { useId, useState } from "react";
import type { Sector } from "../types";

export function SectorNavigation({ sectors, activeKey, onNavigate }: {
  sectors: Sector[]; activeKey?: string; onNavigate: (route: string) => void;
}) {
  const [expanded, setExpanded] = useState(Boolean(activeKey));
  const listId = useId();
  if (!sectors.length) return null;
  return <section className="sector-navigation" aria-label="Setores da URE">
    <button type="button" className="sector-navigation-toggle" aria-expanded={expanded}
      aria-controls={listId} onClick={() => setExpanded(value => !value)}>
      <span>SETORES DA URE</span><i aria-hidden="true">{expanded ? "⌃" : "⌄"}</i>
    </button>
    <ul id={listId} className="sector-navigation-list" hidden={!expanded}>
      {sectors.map(sector => <li key={sector.key}>
        <a href={sector.route} className={sector.key === activeKey ? "active" : undefined}
          aria-current={sector.key === activeKey ? "page" : undefined} title={sector.name}
          onClick={event => {
            if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); onNavigate(sector.route);
          }}>
          <i aria-hidden="true">{sector.icon}</i><span>{sector.label}</span>
        </a>
      </li>)}
    </ul>
  </section>;
}
