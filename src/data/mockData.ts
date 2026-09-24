import type { CapabilityItem, IndustryItem, CaseStudy, JobRole, OfficeLocation } from '../types';

export const CAPABILITIES_DATA: CapabilityItem[] = [
  {
    id: 'agent-swarms',
    title: 'Autonomous Multi-Agent Swarms',
    shortDesc: 'Goal-oriented agent networks with deterministic guardrails, structured peer communication, and auditable supervisor controls.',
    fullDesc: 'We architect enterprise-grade swarm networks where specialized LLM and SLM agents collaborate asynchronously. Every agent decision passes through mathematical deterministic guardrails, stopping infinite execution loops and hallucinated actions before reaching database writes or API mutations.',
    icon: 'Bot',
    metrics: [
      { label: 'Loop Convergence', value: '< 4 Rounds' },
      { label: 'Guardrail Enforcement', value: '100% Policy Match' },
      { label: 'Throughput', value: '45k decisions/min' }
    ],
    features: [
      'Hierarchical planner-worker-verifier topology',
      'Deterministic AST schema verification before tool dispatch',
      'Persistent memory mesh with stateful checkpointing',
      'Zero socket leakage with air-gapped IPC channels'
    ],
    techStack: ['Ray Distributed', 'LangChain', 'LangGraph', 'Redis Sentinel', 'Python C++ Bindings'],
    architectureSnippet: `class SovereignAgentSwarm:
    def __init__(self, supervisor_policy="ISO_42001"):
        self.guardrail = DeterministicASTGuard(enforce_schema=True)
        self.ray_cluster = ray.init(address="auto", namespace="tw-mesh")

    async def dispatch_goal(self, goal_vector):
        plan = await self.planner.synthesize(goal_vector)
        assert self.guardrail.verify(plan), "Policy breach intercepted"
        return await self.worker_pool.map_reduce(plan)`
  },
  {
    id: 'rag-mesh',
    title: 'Enterprise RAG Knowledge Mesh',
    shortDesc: 'Hybrid dense-sparse vector search (<800ms) with zero hallucination risk, semantic chunking, and multi-tenant ACL filters.',
    fullDesc: 'Moving beyond naive RAG, our Knowledge Mesh blends BM25 lexical precision with dense geometric embeddings and graph-guided rerankers. We enforce document-level Access Control Lists (ACLs) directly within the vector index, guaranteeing sensitive data never leaks between organizational tiers.',
    icon: 'Database',
    metrics: [
      { label: 'Search Latency', value: '< 280ms P99' },
      { label: 'Citation Fidelity', value: '99.9% Source Verified' },
      { label: 'Index Scale', value: '100M+ Embedded Docs' }
    ],
    features: [
      'Hybrid Dense (BGE-M3) & Sparse (SPLADE) search fusion',
      'Cross-encoder reranking running on GPU micro-batches',
      'Strict multi-tenant cryptographic partition tokens',
      'Automated knowledge deprecation & recency scoring'
    ],
    techStack: ['Milvus 2.4', 'Qdrant Vector', 'Cohere Rerank', 'ChromaDB', 'Unstructured.io'],
    architectureSnippet: `retriever = HybridKnowledgeMesh(
    dense_collection=milvus.Collection("enterprise_docs_v4"),
    sparse_index=splade.SparseModel(device="cuda:0"),
    reranker=TritonCrossEncoder(batch_size=32)
)
# Returns guaranteed zero-hallucination context with cryptographically signed citation IDs
verified_chunks = retriever.query(user_query, tenant_id="corp_fintech", min_threshold=0.89)`
  },
  {
    id: 'sovereign-mlops',
    title: 'Sovereign MLOps & High-Throughput Inference',
    shortDesc: 'Triton serving clusters, Ray distributed compute, continuous token expenditure monitoring, and private VPC model residency.',
    fullDesc: 'Eliminate external cloud dependency and runaway token billing. We deploy dedicated Triton and vLLM clusters inside your sovereign VPC, utilizing PagedAttention and FP8 quantization to achieve 4.5x greater token throughput at 60% lower compute overhead.',
    icon: 'Cpu',
    metrics: [
      { label: 'Inference Speedup', value: '4.5x vs Stock vLLM' },
      { label: 'Compute Cost Reduction', value: '62% Saved' },
      { label: 'Data Egress', value: '0.00 Bytes' }
    ],
    features: [
      'Triton dynamic batching with KV cache optimization',
      'Air-gapped parameter efficient fine-tuning (LoRA/QLoRA)',
      'Real-time token cost allocation down to team & request ID',
      'Continuous drift detection and automated data distillation'
    ],
    techStack: ['NVIDIA Triton', 'vLLM', 'Ray Train', 'Prometheus', 'Grafana Enterprise'],
    architectureSnippet: `model_config = TritonModelConfig(
    name="llama3-70b-sovereign-tw",
    max_batch_size=64,
    instance_group=[{"kind": "KIND_GPU", "count": 8}],
    dynamic_batching={"max_queue_delay_microseconds": 2000},
    optimization={"paged_attention": True, "quantization": "fp8"}
)`
  },
  {
    id: 'edge-vision',
    title: 'Edge AI & Computer Vision',
    shortDesc: 'Multimodal local models deployed on low-power devices with offline support, sub-15ms edge inference, and zero cloud dependency.',
    fullDesc: 'Deploy intelligent vision, acoustic telemetry, and SLMs directly to edge gateways, Jetson boards, and remote manufacturing hubs. Our quantized neural pipelines run completely severed from the public internet, delivering real-time defect identification and worker safety telemetry.',
    icon: 'Eye',
    metrics: [
      { label: 'Edge Inference', value: '< 14ms on Orin' },
      { label: 'Offline Resiliency', value: '100% Autonomous' },
      { label: 'Model Footprint', value: 'Reduced by 84%' }
    ],
    features: [
      'TensorRT optimization for NVIDIA Jetson and custom silicon',
      'Self-contained ONNX runtimes with hardware watchdogs',
      'Encrypted federated model synchronization when uplink is restored',
      'Sub-millisecond optical anomaly detection for assembly lines'
    ],
    techStack: ['TensorRT', 'ONNX Runtime', 'OpenVINO', 'NVIDIA JetPack', 'YOLOv10 DeepStream'],
    architectureSnippet: `engine = EdgeTensorRTRuntime(
    weights="industrial_defect_v8.engine",
    precision="INT8",
    device_id=0,
    watchdog_timeout_ms=50
)
# Zero internet connection needed; runs directly inside SCADA PLC ring
detections = engine.infer_frame(camera_feed.get_raw_buffer())`
  },
  {
    id: 'cloud-modernization',
    title: 'Core Cloud Modernization & AI SREs',
    shortDesc: 'Event-driven containerized microservices and autonomous AI SRE agents for self-healing infrastructure and sub-second failover.',
    fullDesc: 'Transform brittle legacy monoliths into elastic, agent-supervised cloud native architectures. Our autonomous SRE agents continuously analyze distributed traces, intercept anomaly spikes, and execute safe rolling rollbacks and traffic shed commands before human on-call pagers trip.',
    icon: 'CloudCog',
    metrics: [
      { label: 'MTTR Reduction', value: '88% Faster' },
      { label: 'Auto-Healing Rate', value: '94% Incidents' },
      { label: 'Uptime SLA', value: '99.995%' }
    ],
    features: [
      'Agentic SRE swarms reading OpenTelemetry logs & traces',
      'Automated root-cause causality graphs synthesized in real-time',
      'GitOps-backed remediation workflows with canary verification',
      'Zero-downtime database schema migration copilots'
    ],
    techStack: ['Kubernetes', 'Istio Service Mesh', 'OpenTelemetry', 'ArgoCD', 'Terraform'],
    architectureSnippet: `sre_agent = AutonomousCloudSRE(
    telemetry_stream="k8s-us-east-prod",
    healing_permissions=["scale_hpa", "evict_pod", "rollback_canary"]
)
# Analyzes anomalies and triggers safe rollback with verifiable audit trail
sre_agent.listen_and_remediate(threshold_p99_latency_ms=120)`
  },
  {
    id: 'sovereign-foundation',
    title: 'Custom Sovereign Foundation Models & SLMs',
    shortDesc: 'Domain-adapted small language models fine-tuned on proprietary enterprise weights with zero parameter leakage.',
    fullDesc: 'Train and deploy bespoke 3B to 70B parameter models strictly inside your private boundary. We perform continuous parameter-efficient fine-tuning (PEFT/LoRA) and Direct Preference Optimization (DPO) on domain-specific terminology, delivering higher domain accuracy than massive generalist cloud models at a fraction of the compute footprint.',
    icon: 'Zap',
    metrics: [
      { label: 'Domain Accuracy', value: '98.6% MMLU-Pro' },
      { label: 'Model Footprint', value: '3.8B Quantized' },
      { label: 'Zero Leakage', value: '100% Air-Gapped' }
    ],
    features: [
      'Direct Preference Optimization (DPO) on enterprise tradecraft',
      'Air-gapped synthetic data generation and distillation pipelines',
      'Quantization-aware training (QAT) for edge-to-server elasticity',
      'Cryptographic model weights signing and verification'
    ],
    techStack: ['Axolotl', 'Unsloth', 'vLLM', 'Hugging Face TGI', 'FlashAttention-2'],
    architectureSnippet: `finetuner = SovereignDPOPipeline(
    base_model="meta-llama/Llama-3-8B-Instruct",
    dataset="s3://private-vpc-enclave/training_dpo.jsonl",
    quantization="4bit_bnb"
)
# Trains domain-specific adapter without sending a single byte outside the firewall
adapter_weights = finetuner.train(epochs=3, lr=2e-4)`
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    tagline: 'Deterministic anti-fraud reasoning, algorithmic KYC, and sub-millisecond settlement assurance.',
    agentName: 'Agent Kavacha (Shield)',
    challenge: 'Tier-1 global financial institutions lose billions annually to distributed synthetic identity fraud while traditional rule-engines cause 18% false positive friction on legitimate VIP transfers.',
    solution: 'We engineered Agent Kavacha—an ensemble multi-agent reasoning swarm deployed directly in the core transaction pipeline. Kavacha calculates deep behavioral graph embeddings and audits illicit structuring patterns in under 18ms before ledger debit.',
    outcomes: [
      { label: 'Fraud Interception Rate', value: '99.4%' },
      { label: 'False Positive Drop', value: '-82%' },
      { label: 'Decision Latency', value: '< 18ms' }
    ],
    compliance: ['FFIEC Conformance', 'PCI-DSS Level 1', 'SOC2 Type II', 'Zero-Egress Core'],
    telemetrySimulation: {
      status: 'VERIFIED_SETTLED',
      latency: '16.4ms',
      verifiedRate: '99.98%',
      eventLog: [
        'INCOMING_PAYMENT: $482,000.00 SWIFT GPI transfer tagged for scrutiny',
        'AGENT_KAVACHA: Synthesized multi-hop graph from entity historical counterparties',
        'GUARDRAIL_CHECK: Sanctions OFAC & PEP deterministic lookup PASS (0.9ms)',
        'VERDICT: Legit corporate dividend distribution confirmed. Transaction cleared.'
      ]
    }
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Clinical Systems',
    tagline: 'Ambient clinical listening copilots, automated structured SOAP note generation, and HIPAA on-prem models.',
    agentName: 'Agent Arogya (Wellness)',
    challenge: 'Physicians spend up to 4.2 hours per shift manually charting EHR data, creating clinician burnout and documentation delays while hospital compliance rules prohibit external LLM cloud APIs.',
    solution: 'TokenWave AI created Agent Arogya, an ambient acoustic copilot fine-tuned on medical nomenclatures (SNOMED-CT, ICD-10). Running on local air-gapped clinical hospital servers, it drafts comprehensive SOAP notes in real-time as doctors converse with patients.',
    outcomes: [
      { label: 'Physician Charting Time', value: '-70%' },
      { label: 'EHR Coding Precision', value: '99.2%' },
      { label: 'PHI Cloud Leakage Risk', value: '0.00%' }
    ],
    compliance: ['HIPAA BAA Compliant', 'HITECH Certified', 'Local Hardware Residing', 'FDA SAMD Guidance'],
    telemetrySimulation: {
      status: 'SOAP_GENERATED',
      latency: '34.8ms',
      verifiedRate: '99.7%',
      eventLog: [
        'ACOUSTIC_STREAM: 16kHz dual-microphone encrypted clinical consult ingested',
        'AGENT_AROGYA: Identified symptoms, vitals, drug dosages, and differential diagnoses',
        'ICD10_MAPPER: Mapped acute bronchitis to J20.9 with formal confidence score 0.99',
        'VERDICT: Structured EHR record pushed to Epic/Cerner via local FHIR API.'
      ]
    }
  },
  {
    id: 'telecom',
    name: 'Telecom & 5G Edge',
    tagline: 'Real-time subscriber churn prediction, dynamic beamforming optimization, and self-healing Open RAN networks.',
    agentName: 'Agent Astra (Network)',
    challenge: '5G standalone networks generate terabytes of telemetry every second. Manual network operations centers (NOCs) cannot remediate radio frequency interference or predictive tower failures in real-time.',
    solution: 'We deployed Agent Astra as an edge-native distributed multi-agent mesh across Open RAN cell nodes. Astra autonomously detects packet jitter patterns, predicts churn probability before contract expiration, and dynamically adjusts beamforming azimuth angles.',
    outcomes: [
      { label: 'Subscriber Churn Reduced', value: '29%' },
      { label: 'Tower Outage Prediction', value: '4.5 hrs prior' },
      { label: 'Energy Grid Savings', value: '18.4%' }
    ],
    compliance: ['3GPP Release 18', 'Open RAN O-RU/O-DU Spec', 'Carrier Grade 99.999%', 'GDPR Telephony'],
    telemetrySimulation: {
      status: 'BEAM_OPTIMIZED',
      latency: '8.2ms',
      verifiedRate: '99.99%',
      eventLog: [
        'EDGE_INGEST: 140,000 sub-carrier CQI samples collected at Base Station #902',
        'AGENT_ASTRA: Anomaly detected: micro-reflection interference detected on Sector 3',
        'CLOSED_LOOP_ACTION: Reconfigured beamforming weighting matrix over eCPRI bus',
        'VERDICT: Signal-to-Interference ratio restored to +22dB. No human NOC intervention needed.'
      ]
    }
  },
  {
    id: 'energy',
    name: 'Energy & Smart Manufacturing',
    tagline: 'SCADA sensor telemetry predictive maintenance, physics-informed digital twins, and autonomous safety sentries.',
    agentName: 'Agent Urja (Energy)',
    challenge: 'Critical offshore oil rigs and gigawatt wind farms endure catastrophic downtime when turbine components fail unpredictably. Satellite links are too intermittent for cloud AI analysis.',
    solution: 'Agent Urja operates as an air-gapped on-premise sensory inference engine embedded directly in SCADA PLC controllers. By fusing vibrational accelerometer data with physics-informed neural networks (PINNs), Urja forecasts bearing fatigue days before thermal degradation.',
    outcomes: [
      { label: 'Unplanned Downtime', value: '-84%' },
      { label: 'Asset Lifespan Extended', value: '+3.8 Yrs' },
      { label: 'Prevented Losses', value: '$14.2M/yr' }
    ],
    compliance: ['IEC 62443 Industrial Cyber', 'ATEX Explosive Safety', 'NERC CIP Cyber', 'Zero Cloud Link'],
    telemetrySimulation: {
      status: 'ANOMALY_RESOLVED',
      latency: '11.5ms',
      verifiedRate: '99.95%',
      eventLog: [
        'SCADA_TELEMETRY: High-frequency 20kHz acoustic vibration sensor on Turbine #14',
        'AGENT_URJA: Harmonic spike detected in inner bearing raceway at 1,740 RPM',
        'SAFETY_SENTRY: Autonomously de-rated load to 72% to prevent micro-fracture propagation',
        'VERDICT: Work order auto-generated with exact replacement parts for scheduled maintenance.'
      ]
    }
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'apex-fintech',
    client: 'Apex FinTech Global',
    industry: 'Financial Infrastructure',
    title: 'Autonomous Fraud Reasoning Across 120M+ High-Frequency Transactions',
    summary: 'How Apex FinTech replaced legacy rule engines with Agent Kavacha swarms to intercept sophisticated synthetic account takeovers with sub-18ms latency.',
    challenge: 'Apex was facing an escalation in multi-hop identity fraud rings causing $65M+ in illicit settlements and excessive operational overhead with false positive alert fatigue.',
    solution: 'TokenWave AI deployed an air-gapped Ray cluster executing graph-neural reasoning agents with deterministic schema guards directly within Apex’s PCI-DSS VPC.',
    metrics: [
      { label: 'Annual Intercepted Fraud', value: '$48.5M', detail: 'Zero chargeback leakage' },
      { label: 'Evaluation Latency', value: '16.4ms', detail: 'Sub-millisecond verification' },
      { label: 'False Positive Drop', value: '-82%', detail: 'Seamless VIP transactions' },
    ],
    quote: {
      text: 'TokenWave AI delivered what three major cloud vendors claimed was impossible: sub-20ms multi-agent reasoning with zero data egress and absolute deterministic guardrails.',
      author: 'Marcus Vance',
      title: 'Chief Risk & Technology Officer, Apex FinTech'
    },
    stack: ['Agent Kavacha', 'Ray Distributed', 'Triton Server', 'FP8 Llama-3-70B']
  },
  {
    id: 'medglobal-health',
    client: 'MedGlobal Hospital Network',
    industry: 'Healthcare & Clinical Care',
    title: 'Ambient Clinical Copilots Slashing Physician Burnout Across 42 Acute Hospitals',
    summary: 'Deploying Agent Arogya to automate structured EHR documentation directly at the point of care with 100% local hardware residency.',
    challenge: 'Over 3,200 emergency and outpatient physicians were logging 4+ hours of chart time every evening, triggering unprecedented physician attrition and billing claim errors.',
    solution: 'We installed customized on-prem GPU nodes running localized acoustic speech-to-EHR pipelines fine-tuned on clinical nomenclatures with automated FHIR integration.',
    metrics: [
      { label: 'Charting Time Reduced', value: '70%', detail: 'Gave 3 hours back per shift' },
      { label: 'EHR Coding Precision', value: '99.2%', detail: 'Direct ICD-10 mapping' },
      { label: 'PHI Breach Risk', value: '0.00%', detail: '100% On-Premise Air-Gapped' },
    ],
    quote: {
      text: 'Our clinicians regained their personal lives. Patient eye contact during consultations is back, and our billing error denials plummeted by double digits.',
      author: 'Dr. Aris Thorne',
      title: 'VP of Medical Informatics, MedGlobal Health'
    },
    stack: ['Agent Arogya', 'Whisper-Med-Local', 'Milvus RAG', 'FHIR API Bridge']
  },
  {
    id: 'energycore-offshore',
    client: 'EnergyCore Offshore',
    industry: 'Energy & Heavy Industry',
    title: 'Autonomous Edge Sentry Mesh Preventing Catastrophic Offshore Turbine Failures',
    summary: 'Self-contained neural monitoring agents embedded in North Sea deepwater platform SCADA networks with zero satellite uplink dependency.',
    challenge: 'Offshore wind and drilling platforms suffered multimillion-dollar downtime whenever bearing micro-fissures propagated undetected between physical maintenance rounds.',
    solution: 'TokenWave AI embedded quantized physics-informed neural network (PINN) agents onto Jetson Orin edge modules directly inside turbine nacelles, running autonomous predictive telemetry.',
    metrics: [
      { label: 'Downtime Prevented', value: '$14.2M/yr', detail: 'Saved 3 major nacelle failures' },
      { label: 'Unplanned Outages', value: '-84%', detail: 'Predictive 7-day warning' },
      { label: 'Internet Dependency', value: '0.00%', detail: '100% Edge Autonomous' },
    ],
    quote: {
      text: 'In the middle of the North Sea with stormy weather cutting off communication, TokenWave’s edge agents caught a critical rotor misalignment 4 days before catastrophic thermal runaway.',
      author: 'Elena Rostova',
      title: 'Head of Offshore Operations, EnergyCore'
    },
    stack: ['TensorRT JetPack', 'Physics-Informed NNs', 'SCADA Modbus IPC', 'Agent Urja']
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
