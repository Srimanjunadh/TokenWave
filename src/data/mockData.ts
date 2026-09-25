import type { CapabilityItem, IndustryItem, CaseStudy, JobRole, OfficeLocation } from '../types';

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'applied-ai-engineering',
    title: 'Applied AI Engineering',
    shortDesc: 'Autonomous multi-agent swarms, custom model fine-tuning, and deterministic guardrail pipelines engineered for production scale.',
    fullDesc: 'We architect enterprise applied AI systems that bridge the gap between foundation model research and mission-critical production. From multi-agent swarms and task orchestrators to custom model fine-tuning and sub-45ms latency inference, we deliver architectures that execute deterministically without hallucination risk or runaway compute costs.',
    icon: 'Brain',
    metrics: [
      { label: 'Loop Convergence', value: '< 4 Rounds' },
      { label: 'Guardrail Enforcement', value: '100% Policy Match' },
      { label: 'Inference Latency', value: '< 45ms P99' }
    ],
    features: [
      'Hierarchical planner-worker-verifier swarm orchestration',
      'Deterministic AST schema verification before tool execution',
      'Domain-specific PEFT/LoRA fine-tuning and model distillation',
      'Air-gapped sovereign VPC deployment with zero data egress'
    ],
    techStack: ['Python', 'PyTorch', 'LangGraph', 'Ray Distributed', 'vLLM', 'NVIDIA TensorRT'],
    architectureSnippet: `class AppliedAIEngine:
    def __init__(self, cluster="sovereign-vpc"):
        self.guardrail = DeterministicASTGuard(enforce_strict_schema=True)
        self.swarm = RaySwarmOrchestrator(workers=32)

    async def execute_task(self, goal_vector):
        plan = await self.swarm.planner.synthesize(goal_vector)
        assert self.guardrail.verify(plan), "Policy violation intercepted"
        return await self.swarm.worker_pool.map_reduce(plan)`
  },
  {
    id: 'enterprise-data-engineering',
    title: 'Enterprise Data Engineering',
    shortDesc: 'Resilient data mesh architectures, real-time streaming pipelines, and unified vector databases powering AI-ready analytics.',
    fullDesc: 'High-performance AI requires pristine, high-velocity data foundations. We design and scale distributed data platforms—from petabyte-scale lakehouses and real-time Kafka/Flink streaming meshes to multi-tenant vector databases with document-level access control (ACL) and strict zero-leakage compliance.',
    icon: 'Database',
    metrics: [
      { label: 'Ingestion Throughput', value: '10M+ events/sec' },
      { label: 'Vector Query Latency', value: '< 120ms P99' },
      { label: 'Data Freshness', value: '< 2 sec Real-Time' }
    ],
    features: [
      'Distributed Lakehouse pipelines (Apache Iceberg, Delta Lake)',
      'Event-driven streaming meshes with Apache Kafka & Flink',
      'Hybrid dense-sparse vector databases with multi-tenant partitioning',
      'Automated data governance, lineage tracking, and schema validation'
    ],
    techStack: ['Apache Iceberg', 'Apache Kafka', 'Apache Flink', 'Milvus 2.4', 'Snowflake', 'dbt'],
    architectureSnippet: `mesh = EnterpriseDataMesh(
    lakehouse=IcebergCatalog("enterprise_lake_v3"),
    stream=KafkaEventStream(topics=["transactions", "telemetry"]),
    vector_store=MilvusPartitionedIndex(dim=1536)
)
# Ingests, validates schema, and indexes vectors with zero loss
mesh.stream.pipe(validate_schema).pipe(mesh.vector_store.upsert)`
  },
  {
    id: 'generative-ai-solutions',
    title: 'Generative AI Solutions',
    shortDesc: 'Enterprise GenAI platforms, custom multimodal copilots, and intelligent workflow automation built on private foundation models.',
    fullDesc: 'Accelerate enterprise decision-making with secure Generative AI solutions. We build cognitive enterprise search, specialized multimodal copilots, automated document reasoning engines, and synthetic data pipelines—fully hosted within your sovereign cloud boundary with zero third-party data retention.',
    icon: 'Sparkles',
    metrics: [
      { label: 'Citation Fidelity', value: '99.9% Source Verified' },
      { label: 'Cost Reduction', value: '68% Lower Inference Cost' },
      { label: 'Adoption Rate', value: '94% Active Utilization' }
    ],
    features: [
      'Hybrid Dense-Sparse RAG with cross-encoder reranking',
      'Sovereign enterprise copilots with role-based access control (RBAC)',
      'Intelligent document parsing, tabular reasoning, and contract auditing',
      'Guardrailed prompt engineering, continuous red-teaming, and LLM safety'
    ],
    techStack: ['Llama 3 / Mistral', 'vLLM', 'Qdrant', 'Haystack', 'LangChain', 'FastAPI'],
    architectureSnippet: `genai = SovereignGenAIPipeline(
    retriever=HybridRAGRetriever(collection="corp_knowledge_base"),
    llm=vLLMEngine(model="llama-3.1-70b", tensor_parallel=4),
    auditor=SourceCitationVerifier()
)
response = await genai.synthesize(query="Q3 risk exposure", tenant="fintech")
assert response.verified_citations, "Unverified hallucination blocked"`
  },
  {
    id: 'platform-reliability-devops',
    title: 'Platform Reliability & DevOps',
    shortDesc: 'Cloud-native infrastructure, GitOps automation, autonomous AI SREs, and self-healing systems ensuring 99.999% uptime.',
    fullDesc: 'Modernize infrastructure with resilient, auto-scaling cloud platforms. We build zero-trust Kubernetes architectures, automated CI/CD delivery pipelines, multi-region failover topologies, and autonomous AI-assisted SRE observability that intercepts incidents before human on-call engineers are paged.',
    icon: 'Cloud',
    metrics: [
      { label: 'Uptime SLA', value: '99.999% Availability' },
      { label: 'MTTR Reduction', value: '88% Faster Remediation' },
      { label: 'Deployment Velocity', value: '50+ Zero-Downtime Deploys/Day' }
    ],
    features: [
      'Multi-cloud and hybrid Kubernetes (EKS, GKE, Sovereign Bare Metal)',
      'GitOps continuous deployment with automated canary rollouts',
      'Autonomous SRE agents reading OpenTelemetry logs & traces in real-time',
      'Infrastructure as Code (IaC) with automated drift detection'
    ],
    techStack: ['Kubernetes', 'Istio Mesh', 'Terraform', 'ArgoCD', 'Prometheus', 'OpenTelemetry'],
    architectureSnippet: `sre_controller = AutonomousCloudSRE(
    telemetry_stream="prod-kubernetes-cluster",
    actions=["scale_pod_replicas", "reroute_traffic", "canary_rollback"]
)
# Detects latency spikes and executes automated remediation
sre_controller.monitor_and_heal(sla_threshold_ms=120)`
  },
  {
    id: 'software-product-engineering',
    title: 'Software Product Engineering',
    shortDesc: 'Full-lifecycle product engineering, high-performance distributed systems, and modern microservices designed for hyper-scale.',
    fullDesc: 'We engineer mission-critical digital products from conceptual architecture to hyper-scale production. Combining resilient domain-driven microservices, lightning-fast reactive web/mobile frontends, and hardened API ecosystems, we craft software products that deliver exceptional performance and enterprise reliability.',
    icon: 'Code2',
    metrics: [
      { label: 'API Latency', value: '< 18ms Global Avg' },
      { label: 'Automated Test Coverage', value: '> 95% End-to-End' },
      { label: 'Concurrent Scale', value: '100k+ Active Connections' }
    ],
    features: [
      'Domain-driven microservices with event-sourcing and CQRS',
      'Reactive, accessible web and mobile client applications',
      'High-throughput asynchronous APIs (GraphQL, gRPC, REST)',
      'Automated end-to-end testing, chaos engineering, and load hardening'
    ],
    techStack: ['TypeScript', 'React / Next.js', 'Go', 'Node.js', 'PostgreSQL', 'gRPC'],
    architectureSnippet: `interface ServiceGateway {
  routeRequest(req: HttpRequest): Promise<HttpResponse>;
  applyCircuitBreaker(policy: ResiliencePolicy): void;
}

const productGateway = new DistributedGateway({
  rateLimiter: new TokenBucket({ capacity: 10000, refillRate: 500 }),
  circuitBreaker: new AdaptiveCircuitBreaker({ failureThreshold: 0.05 }),
  serviceMesh: "grpc://internal-mesh.prod"
});`
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'commerce',
    name: 'Commerce',
    tagline: 'Autonomous checkout orchestration, high-concurrency inventory allocation, and sub-second dynamic pricing.',
    agentName: 'Agent Vanijya (Commerce)',
    challenge: 'Global multi-channel commerce platforms lose up to 14% top-line revenue to cart abandonment, inventory reconciliation lag across warehouses, and flash-sale checkout bottlenecks.',
    solution: 'TokenWave AI deploys edge commerce swarms that synchronize multi-region catalog caches, forecast localized demand curves in real-time, and automate fraud-free express settlement.',
    outcomes: [
      { label: 'Cart Conversion Lift', value: '+34.8%' },
      { label: 'Checkout Latency', value: '< 22ms' },
      { label: 'Stockout Reduction', value: '-67%' }
    ],
    compliance: ['PCI-DSS Level 1', 'GDPR e-Privacy', 'SOC2 Type II', 'Zero PII Egress'],
    telemetrySimulation: {
      status: 'TRANSACTION_SETTLED',
      latency: '18.4ms',
      verifiedRate: '99.99%',
      eventLog: [
        'FLASH_EVENT: 140,000 concurrent SKU checkouts queued across 8 edge nodes',
        'AGENT_VANIJYA: Distributed lock acquired on warehouse inventory partition #4',
        'FRAUD_VERIFY: Behavioral risk scoring passed with 0.998 certainty',
        'VERDICT: Instantaneous settlement completed; ERP inventory ledger synchronized.'
      ]
    }
  },
  {
    id: 'health',
    name: 'Health',
    tagline: 'Ambient clinical listening copilots, automated structured FHIR notes, and sovereign HIPAA on-prem models.',
    agentName: 'Agent Arogya (Health)',
    challenge: 'Physicians spend up to 4.2 hours per shift manually charting EHR data, creating severe clinician burnout while hospital compliance strictly prohibits external cloud LLM APIs.',
    solution: 'Air-gapped acoustic copilots fine-tuned on SNOMED-CT and ICD-10 medical nomenclatures run on local hospital servers to draft comprehensive clinical notes in real-time.',
    outcomes: [
      { label: 'Physician Charting Time', value: '-72%' },
      { label: 'EHR Coding Precision', value: '99.4%' },
      { label: 'PHI Leakage Risk', value: '0.00%' }
    ],
    compliance: ['HIPAA BAA Compliant', 'HITECH Certified', 'HL7 FHIR v4', 'FDA SAMD Guidance'],
    telemetrySimulation: {
      status: 'CLINICAL_VERIFIED',
      latency: '24.2ms',
      verifiedRate: '99.7%',
      eventLog: [
        'ACOUSTIC_STREAM: 16kHz dual-microphone encrypted clinical consult ingested',
        'AGENT_AROGYA: Identified vitals, symptoms, drug dosages, and differential diagnoses',
        'ICD10_MAPPER: Mapped acute bronchitis to J20.9 with formal confidence score 0.99',
        'VERDICT: Structured EHR record pushed to Epic/Cerner via local FHIR API.'
      ]
    }
  },
  {
    id: 'finance',
    name: 'Finance',
    tagline: 'Deterministic anti-fraud reasoning, algorithmic trade settlement, and sub-millisecond liquidity routing.',
    agentName: 'Agent Kavacha (Finance)',
    challenge: 'Tier-1 capital markets and retail banking face multi-hop synthetic account fraud and strict regulatory latency mandates where delayed settlements cost millions in slippage.',
    solution: 'Ray-distributed reasoning swarms deployed directly in the core transaction pipeline execute temporal graph embeddings and OFAC sanctions audits in under 16ms before ledger commit.',
    outcomes: [
      { label: 'Fraud Interception Rate', value: '99.6%' },
      { label: 'Decision Latency', value: '< 16ms' },
      { label: 'False Positive Drop', value: '-84%' }
    ],
    compliance: ['FFIEC Conformance', 'PCI-DSS v4.0', 'MiFID II', 'Basel III Ready'],
    telemetrySimulation: {
      status: 'CLEARING_CONFIRMED',
      latency: '14.8ms',
      verifiedRate: '99.99%',
      eventLog: [
        'SWIFT_INGEST: $1,250,000 corporate cross-border liquidity transfer tagged',
        'AGENT_KAVACHA: Executed multi-hop counterparty graph verification in 1.2ms',
        'COMPLIANCE_AST: Sanctions, AML & KYC deterministic rule evaluation PASS',
        'VERDICT: Transaction cleared and committed to private distributed ledger.'
      ]
    }
  },
  {
    id: 'edtech',
    name: 'EdTech',
    tagline: 'Adaptive personalized learning swarms, automated grading rubric alignment, and student retention analytics.',
    agentName: 'Agent Vidya (EdTech)',
    challenge: 'Higher education institutions and online platforms face high student drop-out rates and unsustainable grading backlogs while student privacy laws (FERPA) restrict cloud data sharing.',
    solution: 'TokenWave AI deploys private generative tutoring swarms that adapt lesson curricula to individual student cognitive paces and grade subjective submissions with rubric-faithful deterministic checks.',
    outcomes: [
      { label: 'Course Completion Rate', value: '+42%' },
      { label: 'Grading Turnaround', value: '< 30 sec' },
      { label: 'Concept Mastery Score', value: '+28%' }
    ],
    compliance: ['FERPA Compliant', 'COPPA Certified', 'SOC2 Type II', 'Zero PII Retention'],
    telemetrySimulation: {
      status: 'ASSESSMENT_EVALUATED',
      latency: '32.1ms',
      verifiedRate: '99.7%',
      eventLog: [
        'SUBMISSION_INGEST: 2,400 programming assignments queued for concurrent grading',
        'AGENT_VIDYA: Abstract syntax tree (AST) code analysis & automated test execution',
        'PEDAGOGY_ALIGN: Generated constructive, individualized feedback aligned with syllabus',
        'VERDICT: Verified rubric evaluation submitted to LMS gradebook with full provenance.'
      ]
    }
  },
  {
    id: 'industrial',
    name: 'Industrial',
    tagline: 'SCADA predictive maintenance, physics-informed digital twins, and autonomous shop-floor robotics control.',
    agentName: 'Agent Urja (Industrial)',
    challenge: 'Heavy manufacturing plants and robotic assembly lines endure costly unplanned downtime when mechanical actuators fail without warning, while high electrical noise hinders inspection.',
    solution: 'Air-gapped edge inference models running on PLC hardware fuse vibrational telemetry, thermography, and physics-informed neural networks (PINNs) to preempt micro-fracture failures.',
    outcomes: [
      { label: 'Unplanned Downtime', value: '-82%' },
      { label: 'Asset Lifespan Extended', value: '+4.2 Yrs' },
      { label: 'Maintenance ROI', value: '420%' }
    ],
    compliance: ['IEC 62443 Cyber', 'ISO 9001 / 14001', 'ATEX Safety', 'Zero Cloud Link'],
    telemetrySimulation: {
      status: 'PREEMPTIVE_CORRECTED',
      latency: '9.4ms',
      verifiedRate: '99.96%',
      eventLog: [
        'SCADA_EDGE: 40kHz acoustic sensor telemetry collected from 6-axis milling robot',
        'AGENT_URJA: Harmonic resonance spike isolated in primary spindle bearing',
        'CLOSED_LOOP_ACT: Automated feed-rate dampening applied; preventative work order issued',
        'VERDICT: Critical spindle bearing failure averted; zero downtime incurred.'
      ]
    }
  },
  {
    id: 'sports',
    name: 'Sports',
    tagline: 'Computer-vision kinematic telemetry, biometric fatigue forecasting, and real-time tactical strategy simulation.',
    agentName: 'Agent Kreeda (Sports)',
    challenge: 'Professional sports franchises struggle to fuse high-speed multi-angle tracking cameras, player biometric sensors, and opponent tactics into actionable sub-second in-game insights.',
    solution: 'Low-latency spatial computer vision and kinematic models track player velocity vectors, model muscle fatigue curves, and simulate opponent set-piece responses in real-time.',
    outcomes: [
      { label: 'Injury Risk Reduction', value: '-38%' },
      { label: 'Spatial Tracking Latency', value: '< 28ms' },
      { label: 'Tactical Win-Rate', value: '+19.5%' }
    ],
    compliance: ['Athlete Biometric GDPR', 'WADA Conformance', 'Encrypted Edge Sync', 'Broadcast Standard'],
    telemetrySimulation: {
      status: 'KINEMATICS_STREAMED',
      latency: '12.1ms',
      verifiedRate: '99.91%',
      eventLog: [
        'OPTICAL_TRACKING: 60fps 4K video feeds synchronized across 16 stadium cameras',
        'AGENT_KREEDA: 3D skeletal pose estimation calculated for 22 on-field athletes',
        'BIOMETRIC_PREDICT: Hamstring strain threshold warning flagged for Athlete #7',
        'VERDICT: Real-time tactical bench alert delivered to head trainer tablet.'
      ]
    }
  },
  {
    id: 'proptech',
    name: 'PropTech',
    tagline: 'Smart building HVAC decarbonization swarms, autonomous lease valuation, and geospatial property analytics.',
    agentName: 'Agent Vastu (PropTech)',
    challenge: 'Commercial real estate portfolios waste millions on unoptimized building energy envelopes and manual tenant lease underwriting burdened by fragmented municipal datasets.',
    solution: 'Sovereign IoT building management swarms dynamically balance thermal loads while autonomous underwriting agents audit zoning bylaws and project 10-year yield curves.',
    outcomes: [
      { label: 'Building Energy Waste', value: '-31.4%' },
      { label: 'Lease Audit Velocity', value: '14x Faster' },
      { label: 'Cap Rate Optimization', value: '+85 bps' }
    ],
    compliance: ['ASHRAE Standard 90.1', 'LEED Platinum Framework', 'SOC2 Type II', 'ESG Disclosure'],
    telemetrySimulation: {
      status: 'GRID_OPTIMIZED',
      latency: '21.0ms',
      verifiedRate: '99.88%',
      eventLog: [
        'BMS_TELEMETRY: Ingested occupancy and ambient solar gain from 42 office floors',
        'AGENT_VASTU: Recalibrated chiller sequencing and variable air volume dampers',
        'ENERGY_HARVEST: Peak kilowatt draw trimmed by 280kW ahead of utility tariff window',
        'VERDICT: Energy conservation target achieved; ESG compliance metrics logged.'
      ]
    }
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    tagline: 'Satellite multispectral crop telemetry, autonomous variable-rate irrigation, and predictive harvest yields.',
    agentName: 'Agent Krishi (Agriculture)',
    challenge: 'Industrial agri-enterprises and cooperative farm networks face volatile weather patterns, topsoil depletion, and fertilizer cost spikes without reliable connectivity for cloud analytics.',
    solution: 'Air-gapped solar edge stations running multispectral drone/satellite models map moisture stress, detect pest outbreaks early, and command precision drip irrigation.',
    outcomes: [
      { label: 'Water Consumption', value: '-42%' },
      { label: 'Crop Yield Increase', value: '+26%' },
      { label: 'Chemical Input Drop', value: '-35%' }
    ],
    compliance: ['ISO 11783 (ISOBUS)', 'EPA Agricultural Standard', 'Off-Grid Resilient', 'Zero Data Leak'],
    telemetrySimulation: {
      status: 'IRRIGATION_OPTIMIZED',
      latency: '19.6ms',
      verifiedRate: '99.92%',
      eventLog: [
        'MULTISPECTRAL_IN: 10-band NDVI drone imagery ingested across 8,000 acres',
        'AGENT_KRISHI: Isolated early fungal rust outbreak on Sector 14 before visible spread',
        'AUTONOMOUS_ACT: Variable-rate targeted fungicide command dispatched to GPS sprayers',
        'VERDICT: Outbreak contained; 98% of crop yield protected with minimal chemical usage.'
      ]
    }
  },
  {
    id: 'biotechnology',
    name: 'Biotechnology',
    tagline: 'Generative protein folding validation, automated assay telemetry, and sovereign drug discovery pipelines.',
    agentName: 'Agent Jeeva (Biotech)',
    challenge: 'Biopharma research labs risk compromising billion-dollar patentable molecular compounds if they query public cloud APIs, while screening candidate molecules takes years.',
    solution: 'Air-gapped high-performance GPU clusters running custom structural biology diffusion models and deterministic molecular docking engines within sovereign lab perimeters.',
    outcomes: [
      { label: 'Target Lead Discovery', value: '5x Accelerated' },
      { label: 'Binding Affinity Match', value: '99.1%' },
      { label: 'IP Leakage Risk', value: '0.00%' }
    ],
    compliance: ['21 CFR Part 11', 'Good Laboratory Practice (GLP)', 'GAMP 5 Certified', 'ITAR / Export Safe'],
    telemetrySimulation: {
      status: 'CONFORMATION_VALIDATED',
      latency: '44.3ms',
      verifiedRate: '99.98%',
      eventLog: [
        'CRYO_EM_DATA: 3.2-angstrom resolution protein target ingested from spectrometer',
        'AGENT_JEEVA: 10,000 candidate small-molecule ligands screened in parallel on Ray cluster',
        'DOCKING_VERIFY: Top 3 candidate conformations passed free energy barrier thresholds',
        'VERDICT: Lead compound candidate confirmed for automated wet-lab synthesis.'
      ]
    }
  },
  {
    id: 'government',
    name: 'Government',
    tagline: 'FedRAMP High-ready sovereign citizen services, classified document reasoning, and multi-agency zero-trust.',
    agentName: 'Agent Shasan (Government)',
    challenge: 'Public sector agencies face massive citizen case backlogs and inter-departmental data silos under strict statutory security mandates prohibiting public cloud usage.',
    solution: 'Air-gapped sovereign LLM stacks with cryptographic role-based access control process public benefits eligibility, procurement auditing, and citizen inquiries with zero data leakage.',
    outcomes: [
      { label: 'Citizen Service Resolution', value: '-85% Wait Time' },
      { label: 'Procurement Audit Time', value: '12x Faster' },
      { label: 'Security Classification', value: 'IL-5 / FedRAMP High' }
    ],
    compliance: ['FedRAMP High Ready', 'DoD IL-5 Authorized', 'NIST SP 800-53', 'Zero-Trust Architecture'],
    telemetrySimulation: {
      status: 'AUDIT_CERTIFIED',
      latency: '15.3ms',
      verifiedRate: '100.0%',
      eventLog: [
        'CITIZEN_INGEST: Multi-lingual benefits application submitted with 18 document attachments',
        'AGENT_SHASAN: Deterministic policy evaluation verified cross-agency eligibility rules',
        'SECURITY_AUDIT: Cryptographic audit log signed and committed to immutable state store',
        'VERDICT: Application approved and benefit dispersal queued with zero human backlog.'
      ]
    }
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'leadcliques-admission-crm',
    client: 'LeadCliques',
    industry: 'Admission CRM',
    title: 'Unified admission pipeline for a multi-campus education group',
    summary: 'A Hyderabad-based education group consolidated enquiry handling across six campuses, reducing counselor response time and improving conversion visibility for leadership.',
    challenge: 'Enquiries arriving from digital campaigns, walk-ins, and affiliates were fragmented across six separate campus centers, leading to delayed counselor follow-ups and uncoordinated outreach.',
    solution: 'Implemented LeadCliques admission CRM to centralize enquiry ingestion, automate counselor allocation, and provide real-time conversion telemetry to executive leadership.',
    metrics: [
      { label: 'Faster enquiry response', value: '65%', detail: 'Sub-minute first touch' },
      { label: 'Higher conversion rate', value: '45%', detail: 'Optimized pipeline stages' },
      { label: 'Campuses connected', value: '6', detail: 'Consolidated admissions' },
    ],
    quote: {
      text: 'LeadCliques brought complete clarity to our multi-campus admissions. Counselors respond in minutes and our conversion jumped 45%.',
      author: 'Admissions Director',
      title: 'Hyderabad Education Group'
    },
    stack: ['LeadCliques Core', 'Multi-Campus Routing', 'Automated Allocation', 'Analytics Dashboard'],
    link: 'https://neuraltrixai.com/our-work/case-studies/leadcliques-education-enrollment',
    tags: ['Admission CRM', 'Multi-Campus', 'Higher Ed']
  },
  {
    id: 'staffcliques-workforce-monitoring',
    client: 'StaffCliques',
    industry: 'Workforce Monitoring',
    title: 'Workforce visibility for a distributed BPO operations center',
    summary: 'A Visakhapatnam operations center gained live productivity tracking, attendance compliance, and AI alerts across 1,200+ agents working in hybrid shifts.',
    challenge: 'Managing over 1,200 hybrid agents across irregular shift rosters caused reporting lag, unmonitored idle times, and frequent SLA compliance infractions.',
    solution: 'Deployed StaffCliques real-time agent visibility platform with automated attendance reconciliation, anomaly detection, and automated supervisor escalation alerts.',
    metrics: [
      { label: 'Average productivity', value: '87.6%', detail: 'Live telemetry tracking' },
      { label: 'Employees monitored', value: '1,248', detail: 'Across hybrid shifts' },
      { label: 'Fewer compliance gaps', value: '34%', detail: 'Automated audit logs' },
    ],
    quote: {
      text: 'With StaffCliques, our supervisors instantly identify idle bottlenecks and shift adherence issues across 1,200+ agents in real time.',
      author: 'Head of Operations',
      title: 'BPO Delivery Center, Visakhapatnam'
    },
    stack: ['StaffCliques Agent', 'Shift Telemetry', 'AI Anomaly Detector', 'Compliance Engine'],
    link: 'https://neuraltrixai.com/our-work/case-studies/staffcliques-distributed-operations',
    tags: ['Workforce Monitoring', 'BPO Operations', 'Productivity AI']
  },
  {
    id: 'procsquare-live-proctoring',
    client: 'ProcSquare',
    industry: 'Live Proctoring',
    title: 'Secure remote examinations for a state university consortium',
    summary: 'A university consortium proctored 2,500+ concurrent candidates with AI violation detection, identity verification, and integrity scoring during degree assessments.',
    challenge: 'Conducting high-stakes remote semester assessments required ironclad anti-impersonation checks and real-time cheating detection without overwhelming human proctors.',
    solution: 'Utilized ProcSquare multi-modal AI proctoring with facial biometric verification, multiple-face detection, audio anomaly scanning, and continuous integrity auditing.',
    metrics: [
      { label: 'Candidates proctored', value: '2,543', detail: 'Concurrent assessment session' },
      { label: 'Violations auto-flagged', value: '156', detail: 'Instant evidentiary logging' },
      { label: 'Session completion rate', value: '99.2%', detail: 'Zero platform disruption' },
    ],
    quote: {
      text: 'ProcSquare enabled us to administer statewide university examinations remotely with 100% evidentiary integrity and seamless candidate experience.',
      author: 'Controller of Examinations',
      title: 'State University Consortium'
    },
    stack: ['ProcSquare AI Engine', 'Biometric Verification', 'Video Telemetry', 'Integrity Scoring'],
    link: 'https://neuraltrixai.com/our-work/case-studies/procsquare-university-exams',
    tags: ['Live Proctoring', 'University Exams', 'Biometrics AI']
  },
  {
    id: 'schooltrix-institution-platform',
    client: 'SchoolTrix',
    industry: 'Institution & Mobile Platform',
    title: 'Institution management and parent engagement for a school network',
    summary: 'Sunrise High International School unified academics, fees, and parent communication through SchoolTrix web and native mobile apps across 2,500+ students.',
    challenge: 'Fragmented paper notice boards, manual fee accounting queues, and disconnected parent communication led to billing delays and poor school-parent engagement.',
    solution: 'Rolled out SchoolTrix web platform and cross-platform native mobile apps, connecting attendance scanners, automated fee payment gateways, and real-time parent notifications.',
    metrics: [
      { label: 'Students managed', value: '2,543', detail: 'Unified school ecosystem' },
      { label: 'Attendance visibility', value: '93.6%', detail: 'Daily parent notification rate' },
      { label: 'Fees collected digitally', value: '₹48.75L', detail: 'Automated gateway reconciliation' },
    ],
    quote: {
      text: 'SchoolTrix transformed how our institution operates. Parents love the instant fee receipts and real-time attendance updates on mobile.',
      author: 'Principal',
      title: 'Sunrise High International School'
    },
    stack: ['SchoolTrix Web', 'Native Mobile Apps', 'Digital Fee Gateway', 'Parent Notification Mesh'],
    link: 'https://neuraltrixai.com/our-work/case-studies/schooltrix-multi-campus-school',
    tags: ['Web platform dashboard', 'Native mobile apps']
  },
  {
    id: 'talentrix-campus-recruitment',
    client: 'Talentrix',
    industry: 'Campus Recruitment',
    title: 'Campus placement operations for an engineering college cluster',
    summary: 'An Andhra engineering college cluster processed 1,200+ applications with NeuralTrix AI interviewing and resume matching during a multi-campus placement season.',
    challenge: 'Placement officers were overwhelmed by thousands of unstandardized resumes and manual initial technical screening rounds across multiple tier-1 and tier-2 hiring companies.',
    solution: 'Implemented Talentrix AI recruitment engine for semantic resume-to-job matching, automated asynchronous AI technical interviews, and centralized candidate shortlisting.',
    metrics: [
      { label: 'Applications processed', value: '1,248', detail: 'Multi-campus placement drives' },
      { label: 'Candidates screened', value: '856', detail: 'Automated AI assessments' },
      { label: 'Offers accepted', value: '32', detail: 'High-package hiring' },
    ],
    quote: {
      text: 'Talentrix cut our campus interview scheduling and resume parsing time by over 80%, allowing students to interview with top firms seamlessly.',
      author: 'Dean of Placements',
      title: 'Andhra Engineering College Cluster'
    },
    stack: ['Talentrix AI Interviewer', 'Semantic Resume Parser', 'Video Proctoring', 'Placement CRM'],
    link: 'https://neuraltrixai.com/our-work/case-studies/talentrix-engineering-placements',
    tags: ['Campus Recruitment', 'AI Interviewing', 'Resume Matching']
  },
  {
    id: 'medclues-hospital-operations',
    client: 'MedClues',
    industry: 'Hospital Operations',
    title: 'Hospital operations command center for a regional care network',
    summary: 'A regional hospital network unified OPD, IPD, pharmacy, and laboratory workflows with live patient monitoring and AI bed-demand insights across 3,200+ patients.',
    challenge: 'Siloed hospital departments resulted in prolonged OPD wait times, sub-optimal emergency bed allocation, and manual paper-based discharge delays.',
    solution: 'Deployed MedClues hospital operations command center with real-time bed availability dashboards, automated electronic triage, and cross-department electronic health record flows.',
    metrics: [
      { label: 'Patients managed', value: '3,245', detail: 'Active inpatient & outpatient' },
      { label: 'Average bed occupancy', value: '76.4%', detail: 'Optimized triage allocation' },
      { label: 'Faster OPD throughput', value: '22%', detail: 'Reduced patient wait times' },
    ],
    quote: {
      text: 'MedClues gave our hospital administration single-pane-of-glass visibility into emergency bed demands, pharmacy stocks, and patient throughput.',
      author: 'Medical Superintendent',
      title: 'Regional Care Hospital Network'
    },
    stack: ['MedClues Command Center', 'OPD/IPD Workflow', 'Bed-Demand Predictor', 'FHIR EMR Connector'],
    link: 'https://neuraltrixai.com/our-work/case-studies/medclues-regional-hospital',
    tags: ['Hospital Operations', 'Care Network', 'Healthcare AI']
  },
  {
    id: 'telebuddy-ivr-telecalling',
    client: 'TeleBuddy',
    industry: 'IVR Telecalling',
    title: 'IVR outreach campaigns for an education admissions program',
    summary: 'An admissions outreach program handled 125,000+ calls with IVR flows, predictive dialing, and AI campaign insights to re-engage dormant enquiries.',
    challenge: 'Counselors could not manually call 100,000+ candidate leads before application deadlines, leading to high drop-off rates on previously engaged enquiries.',
    solution: 'Leveraged TeleBuddy intelligent predictive dialer and multi-lingual interactive voice response (IVR) engine to pre-qualify student interests and route high-intent callers to counselors.',
    metrics: [
      { label: 'Calls handled', value: '125K+', detail: 'Automated predictive dialing' },
      { label: 'Conversion rate', value: '12.45%', detail: 'Re-engaged dormant leads' },
      { label: 'AI performance uplift', value: '18%', detail: 'Optimized calling schedules' },
    ],
    quote: {
      text: 'TeleBuddy automated over 125,000 outbound outreach calls in two weeks, boosting our application completion and enrollment numbers dramatically.',
      author: 'Campaign Outreach Head',
      title: 'Admissions Outreach Program'
    },
    stack: ['TeleBuddy IVR', 'Predictive Dialing Engine', 'Voice Bot NLP', 'Admissions Telemetry'],
    link: 'https://neuraltrixai.com/our-work/case-studies/telebuddy-admissions-outreach',
    tags: ['IVR Telecalling', 'Admissions Outreach', 'Predictive Dialing']
  }
];

export const JOB_ROLES: JobRole[] = [
  {
    id: 'principal-multi-agent',
    title: 'Principal Multi-Agent Systems Engineer',
    department: 'Applied Swarm Engineering',
    location: 'San Jose, CA / London / Remote',
    type: 'Full-time',
    experience: '8+ Years Exp',
    description: 'Lead the architecture of asynchronous multi-agent orchestration frameworks with deterministic AST guardrails, stateful graph memory, and sub-40ms loop convergence.',
    tags: ['Ray Distributed', 'LangGraph', 'Python/C++', 'Multi-Agent Game Theory'],
    responsibilities: [
      'Design fault-tolerant supervisor-worker topologies on Ray clusters',
      'Implement deterministic AST schema validators for tool calling',
      'Collaborate with Fortune 100 enterprise architects on production deployments'
    ]
  },
  {
    id: 'senior-mlops-triton',
    title: 'Senior MLOps & Triton Infrastructure Architect',
    department: 'Inference Infrastructure',
    location: 'New York, NY / Tokyo / Hybrid',
    type: 'Full-time',
    experience: '6+ Years Exp',
    description: 'Optimize high-throughput Triton serving clusters, vLLM PagedAttention engines, and FP8 quantization pipelines across distributed NVIDIA H100 pods.',
    tags: ['NVIDIA Triton', 'vLLM', 'CUDA', 'Kubernetes Operator', 'Prometheus'],
    responsibilities: [
      'Scale air-gapped private VPC inference serving clusters to 50k+ tok/s',
      'Profile GPU kernel latency bottlenecks and memory KV caching overhead',
      'Automate parameter-efficient fine-tuning (LoRA) evaluation pipelines'
    ]
  },
  {
    id: 'enterprise-rag-lead',
    title: 'Enterprise RAG Solutions Lead',
    department: 'Knowledge Systems',
    location: 'Bengaluru, India / Singapore / Onsite',
    type: 'Full-time',
    experience: '5+ Years Exp',
    description: 'Architect billion-scale hybrid vector-lexical search meshes combining Milvus, Qdrant, and cross-encoder rerankers with document-level security ACLs.',
    tags: ['Milvus', 'Qdrant', 'Dense/Sparse Retrieval', 'Graph RAG', 'Python'],
    responsibilities: [
      'Design sub-300ms retrieval pipelines across heterogeneous enterprise repositories',
      'Embed cryptographic multi-tenant ACL partition filters into vector spaces',
      'Author benchmark evaluations for hallucination elimination'
    ]
  },
  {
    id: 'distributed-systems-eng',
    title: 'High-Performance Distributed Systems Engineer',
    department: 'Core Infrastructure',
    location: 'San Jose, CA / Remote',
    type: 'Full-time',
    experience: '6+ Years Exp',
    description: 'Build low-latency inter-process communication layers, zero-copy socket buffers, and custom C++ bindings for real-time agent message passing.',
    tags: ['C++20', 'Rust', 'eBPF', 'ZeroMQ / gRPC', 'Linux Kernel'],
    responsibilities: [
      'Optimize sub-millisecond IPC communication between sovereign micro-sandboxes',
      'Implement real-time hardware telemetry monitors with eBPF probes',
      'Ensure zero telemetry egress across all network interfaces'
    ]
  },
  {
    id: 'staff-ai-security',
    title: 'Staff AI Security & Guardrails Researcher',
    department: 'AI Safety & Verification',
    location: 'London, UK / New York / Remote',
    type: 'Full-time',
    experience: '7+ Years Exp',
    description: 'Pioneer deterministic semantic guardrail matrices, formal evaluation proofs, and automated red-teaming agents against adversarial prompt jailbreaks.',
    tags: ['Formal Methods', 'OWASP LLM', 'Red Teaming', 'ISO 42001', 'Cryptography'],
    responsibilities: [
      'Formalize mathematical evaluation proofs for multi-agent tool execution',
      'Lead continuous automated adversarial attack simulations against customer swarms',
      'Represent TokenWave AI in international AI governance working groups'
    ]
  }
];

export const GLOBAL_OFFICES: OfficeLocation[] = [
  { city: 'San Jose (HQ)', country: 'USA', address: '3000 Sand Hill Road, Silicon Valley', timezone: 'America/Los_Angeles', phone: '+1 (408) 780-4920', isHQ: true },
  { city: 'New York', country: 'USA', address: '10 Hudson Yards, Suite 3400', timezone: 'America/New_York', phone: '+1 (212) 902-8150' },
  { city: 'London', country: 'UK', address: '25 Bank Street, Canary Wharf', timezone: 'Europe/London', phone: '+44 20 7946 0912' },
  { city: 'Bengaluru', country: 'India', address: 'Indiranagar 100ft Road, Tech Corridor', timezone: 'Asia/Kolkata', phone: '+91 80 4123 9080' },
  { city: 'Singapore', country: 'Singapore', address: '1 Marina Boulevard, Marina Bay', timezone: 'Asia/Singapore', phone: '+65 6812 7700' },
  { city: 'Tokyo', country: 'Japan', address: 'Marunouchi Park Building, Chiyoda', timezone: 'Asia/Tokyo', phone: '+81 3 5555 0192' },
];
