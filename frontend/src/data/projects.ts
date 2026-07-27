export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  status?: string
  featured?: boolean
  longDescription?: string
  highlights?: string[]
  images?: string[]   // paths relative to /public/projects/
}

export const projects: Project[] = [
  {
    id: 'lumi',
    title: 'Lumi',
    description:
      'Health awareness companion for underrepresented women. RAG-powered chat grounded in NHS-aligned knowledge, symptom tracking with gamification, and GP appointment prep.',
    tags: ['RAG', 'FastAPI', 'ChromaDB', 'LangChain', 'React', 'Supabase'],
    github: 'https://github.com/yourhandle/lumi',
    status: 'Active',
    featured: true,
    longDescription:
      'Lumi is a full-stack health AI companion designed for underrepresented women who often struggle to get clear, trusted health information. It combines a RAG pipeline grounded in NHS-aligned sources with a conversational UI that feels less clinical and more like a knowledgeable friend.',
    highlights: [
      'Retrieval-augmented generation over curated NHS & NICE guidelines',
      'Symptom tracker with streaks and gamification to encourage consistent logging',
      'GP appointment prep mode — generates a structured summary the user can bring to their doctor',
      'Auth and profile persistence via Supabase',
    ],
    images: ['/projects/lumi-1.png', '/projects/lumi-2.png'],
  },
  {
    id: 'smarthome',
    title: 'SmartHome Energy Middleware',
    description:
      'Kafka-based middleware between solar panels and home appliances. A simulated producer streams solar energy data; the consumer advises the user on available power — e.g. whether there is enough to run the washing machine.',
    tags: ['Kafka', 'Java', 'Spring Boot', 'Event Streaming'],
    github: 'https://github.com/yourhandle/smarthome',
    status: 'Demo',
    featured: true,
    longDescription:
      'SmartHome sits as a middleware layer between a solar panel installation and household electronics. A Kafka producer simulates real-time energy readings from the panels; the Java consumer processes the stream and advises the homeowner on how much power is currently available and which appliances can safely run. The core focus is demonstrating event-driven architecture with Kafka — decoupled, real-time, and resilient to producer downtime.',
    highlights: [
      'Kafka producer simulates solar panel energy output with realistic time-of-day variation',
      'Java consumer continuously processes the energy stream and maintains a rolling available-power state',
      'User-facing recommendations: appliance-level decisions (washing machine, dishwasher, EV charger) based on current surplus',
      'Decoupled architecture — producer and consumer run independently, demonstrating Kafka\'s durability guarantees',
    ],
    images: [],
  },
  {
    id: 'grafana-mcp-agent',
    title: 'Grafana MCP Agent',
    description:
      'AI agent that connects to Grafana via a Model Context Protocol server, giving an LLM live access to team dashboards, firing alerts, and configured datasources (Prometheus + CloudWatch).',
    tags: ['MCP', 'Agents', 'Grafana', 'Prometheus', 'CloudWatch', 'TypeScript'],
    github: 'https://github.com/yourhandle/grafana-mcp',
    status: 'Demo',
    featured: true,
    longDescription:
      'A Model Context Protocol (MCP) server that exposes Grafana as a set of structured tools an LLM agent can call. The agent can search and retrieve pre-built team dashboards, inspect firing and pending alert rules, and enumerate all configured datasources — including Prometheus and CloudWatch — without leaving the chat interface. The goal is to bring observability data into natural-language workflows: ask the agent what is alerting right now, or pull the latency dashboard for a specific service.',
    highlights: [
      'search_dashboards / get_dashboard_by_uid — agent can find and read any pre-built team dashboard by name or UID',
      'list_alert_rules / get_alert_rule_by_uid — exposes firing and pending alert state to the LLM in structured form',
      'list_datasources — enumerates Prometheus and CloudWatch connections already configured in Grafana',
      'MCP transport layer decouples the agent from Grafana internals — swap datasources without changing the agent prompt',
    ],
    images: [],
  },
  {
    id: 'localinfopoint',
    title: 'LocalInfoPoint',
    description:
      'Mobile app connecting tourists with local knowledge — nearby points of interest, events, and hidden gems surfaced from local sources rather than generic travel guides.',
    tags: ['Mobile', 'React Native', 'Local Discovery'],
    github: 'https://github.com/yourhandle/localinfopoint',
    status: 'Demo',
    featured: false,
    longDescription:
      'LocalInfoPoint is a mobile app designed to give tourists access to the kind of information only locals know — neighbourhood-specific events, lesser-known attractions, and practical tips that generic travel platforms miss. The focus is on hyperlocal relevance: content is scoped to the user\'s current location and surfaced from local contributors rather than aggregated review sites.',
    highlights: [
      'Location-aware feed surfaces points of interest, events, and tips within the user\'s immediate area',
      'Local-first content model — information contributed by residents, not scraped from global review platforms',
      'Designed for tourists who want authentic local experience over mainstream tourist trails',
    ],
    images: [],
  },
]
