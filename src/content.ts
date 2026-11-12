/* ==========================================================================
   content.ts — every word on the site lives in this file.
   Edit text here; the layout (src/pages/index.astro) never needs touching.

   Two small conventions:
   1. Footnotes. Write [^some-id] inside any text marked "rich" below and add
      the note under `notes`. They are numbered automatically in page order.
   2. Cross-references. Each experience / project / certificate has a `uses`
      list of skill ids (the `id` fields in `definitions`). Hovering that
      skill in clause 3 traces a line to every entry that lists it.
   ========================================================================== */

export const meta = {
  name: 'Emna Hasnaoui',
  title: 'AI & Machine Learning Engineer, research-oriented',
  docNumber: 'EH-TS 26.001',
  version: 'V3.0.0',
  date: '2026-11',
  docType: 'Technical Specification',
  release: '3',
  // Rows of the small table on the cover page.
  status: [
    { label: 'Release', value: '3' },
    { label: 'Status', value: 'Available for MASc research', accent: true },
    { label: 'Location', value: 'Ottawa / Tunis' },
  ],
  keywords: ['LLM evaluation', 'AI agents', 'LLM-as-judge', 'STRIDE', '5G', 'machine learning for networks'],
  coverMarginNote: 'Status as of 2026-11.',
  coverNotice:
    'The present document specifies one engineer. It is maintained by its subject and revised as the work progresses.',
  // Used for <meta name="description"> and link previews.
  description:
    'Emna Hasnaoui — AI & Machine Learning Engineer. Research between LLM evaluation and 5G network security, written up as a technical specification.',
};

/* Footnotes, referenced from text as [^id]. */
export const notes: Record<string, string> = {
  'llm-eval':
    'See clause 4.1: an agentic, LLM-as-judge framework that evaluates STRIDE threat analyses written by LLMs.',
  stride:
    'STRIDE: Spoofing, Tampering, Repudiation, Information disclosure, Denial of service, Elevation of privilege.',
  routenet:
    'RouteNet: a graph neural network model that estimates network performance from topology, routing and traffic.',
  accuracy: 'The only quantitative result reported in this revision. No other metric is claimed.',
};

/* Clause titles. `id` is the anchor; changing a title here updates the
   heading, the table of contents and the running footer. */
export const clauses = {
  scope: { id: 'c1', num: '1', title: 'Scope' },
  references: { id: 'c2', num: '2', title: 'References' },
  definitions: { id: 'c3', num: '3', title: 'Definitions' },
  functional: { id: 'c4', num: '4', title: 'Functional Description' },
  tests: { id: 'c5', num: '5', title: 'Test Results' },
  conformance: { id: 'c6', num: '6', title: 'Conformance' },
  annexA: { id: 'annex-a', num: 'Annex A', qualifier: 'informative', title: 'Languages' },
  annexB: { id: 'annex-b', num: 'Annex B', qualifier: '', title: 'Contact' },
  annexC: { id: 'annex-c', num: 'Annex C', qualifier: '', title: 'Printable version' },
};

/* ---- 1 Scope ----------------------------------------------------------- */
export const scope = {
  marginNote: 'Open to MASc research positions.',
  // rich text
  paragraphs: [
    'The present document specifies the background, capabilities and measured results of Emna Hasnaoui, AI & Machine Learning Engineer, research-oriented.',
    'Engineering graduate in Computer Networks and Telecommunications with hands-on research experience in LLM evaluation[^llm-eval], AI agents, and machine learning for networked systems.',
    'The work specified here sits between LLM evaluation and 5G network security.',
  ],
};

/* ---- 2 References (education + activities) ----------------------------- */
export const references = {
  intro: 'The following documents contain provisions which, through reference in this text, constitute the basis of the present document.',
  normativeTitle: 'Normative references',
  normativeMarginNote: 'Degrees.',
  normative: [
    {
      institution: 'INSAT, Tunis',
      title: 'Engineering Degree, Computer Networks and Telecommunications',
      period: '09/2023 – 09/2026',
    },
    {
      institution: 'INSAT',
      title: 'Integrated Preparatory Cycle in Mathematics, Physics and Computer Science',
      period: '09/2021 – 07/2023',
    },
  ],
  informativeTitle: 'Informative references',
  informativeMarginNote: 'Societies and clubs.',
  informative: ['IEEE Computer Society (INSAT Student Branch)', 'ESSAI Machine Learning Club', 'Securinets INSAT'],
};

/* ---- 3 Definitions (skills) -------------------------------------------- */
export const definitions = {
  intro: 'For the purposes of the present document, the following terms and definitions apply.',
  hint: 'Underlined terms are cross-referenced: hover or focus one to trace where it is used, click to pin the trace.',
  marginNote: 'Trace: hover or focus. Pin: click. Clear: Esc.',
  usedInLabel: 'Used in',
  groups: [
    {
      title: 'Programming',
      terms: [
        { id: 'python', term: 'Python', def: 'high-level programming language; the default for machine-learning and data tooling.' },
        { id: 'matlab', term: 'MATLAB', def: 'numerical computing environment for matrix computation, signal processing and simulation.' },
        { id: 'java', term: 'Java', def: 'statically typed, object-oriented language running on the JVM.' },
        { id: 'c-cpp', term: 'C/C++', def: 'compiled systems languages offering direct control over memory and performance.' },
      ],
    },
    {
      title: 'AI & agentic systems',
      terms: [
        { id: 'pytorch', term: 'PyTorch', def: 'deep-learning framework built on dynamic computation graphs.' },
        { id: 'tensorflow', term: 'TensorFlow', def: 'deep-learning framework used to build and deploy neural networks.' },
        { id: 'llm-systems', term: 'LLM-based systems', def: 'applications whose core logic is delegated to a large language model through prompting, tool use or structured output.' },
        { id: 'langchain', term: 'LangChain', def: 'framework used to compose LLM calls, prompts, tools and memory into applications.' },
        { id: 'langgraph', term: 'LangGraph', def: 'framework used to build stateful, multi-step LLM agents as graphs of nodes and edges.' },
        { id: 'agent-design', term: 'AI agent design', def: 'the structuring of an LLM-driven system into roles, state, tools and control flow.' },
        { id: 'model-eval', term: 'Model evaluation', def: 'the measurement of model output quality against labels, rubrics or a judging model.' },
      ],
    },
    {
      title: 'Security & networking',
      terms: [
        { id: 'stride', term: 'STRIDE threat modeling', def: 'method that classifies threats as Spoofing, Tampering, Repudiation, Information disclosure, Denial of service or Elevation of privilege.' },
        { id: '5g', term: '5G', def: 'fifth-generation mobile network system, specified by 3GPP.' },
        { id: 'cybersecurity', term: 'Cybersecurity fundamentals', def: 'the principles of confidentiality, integrity and availability, with their common attack and defence patterns.' },
        { id: 'ccna', term: 'CCNA', def: 'Cisco Certified Network Associate curriculum covering routing, switching, wireless and network automation.' },
        { id: 'distributed', term: 'Distributed systems', def: 'systems whose components run on networked machines and coordinate by passing messages.' },
      ],
    },
    {
      title: 'Engineering & DevOps',
      terms: [
        { id: 'fastapi', term: 'FastAPI', def: 'Python web framework used to build typed HTTP APIs.' },
        { id: 'spring-boot', term: 'Spring Boot', def: 'Java framework used to build stand-alone web services.' },
        { id: 'angular', term: 'Angular', def: 'TypeScript framework for single-page web applications.' },
        { id: 'nestjs', term: 'NestJS', def: 'Node.js framework for structured server-side applications in TypeScript.' },
        { id: 'rest', term: 'REST APIs', def: 'HTTP interfaces that expose resources through uniform, stateless operations.' },
        { id: 'aws', term: 'AWS', def: 'Amazon Web Services; cloud computing platform.' },
        { id: 'docker', term: 'Docker', def: 'container platform used to package an application with its dependencies.' },
        { id: 'kubernetes', term: 'Kubernetes', def: 'orchestration system used to deploy and scale containers.' },
        { id: 'terraform', term: 'Terraform', def: 'infrastructure-as-code tool used to declare cloud resources.' },
        { id: 'ci-cd', term: 'CI/CD', def: 'continuous integration and delivery; automated build, test and release pipelines.' },
        { id: 'mysql', term: 'MySQL', def: 'relational database management system.' },
        { id: 'postgresql', term: 'PostgreSQL', def: 'relational database management system with an extensible type system.' },
        { id: 'mongodb', term: 'MongoDB', def: 'document-oriented NoSQL database.' },
      ],
    },
  ],
};

/* Block-diagram stage. kind: 'in' (document), 'proc' (step),
   'model' (ML model), 'out' (result). `inset` draws a dashed accent box
   inside the stage; `emph` prints the label in the accent colour. */
export type Stage = {
  label: string;
  sub?: string;
  kind?: 'in' | 'proc' | 'model' | 'out';
  inset?: string;
  emph?: boolean;
};

/* ---- 4 Functional Description (experience) ----------------------------- */
export const experience = {
  intro: 'This clause describes the functions performed by the engineer in each deployment, most recent first.',
  entries: [
    {
      role: 'Applied Research Intern & Final-Year Thesis',
      org: 'Next Generation Networks Lab, Carleton University, Ottawa',
      period: '04/2026 – 09/2026',
      marginNote: 'Final-year thesis.',
      // rich text
      items: [
        'Designed an agentic framework (LangGraph) to automatically evaluate STRIDE[^stride] threat analyses generated by LLMs (5G threat modeling, LLM-as-judge).',
        'Built mechanisms to extract and analyze model outputs (labels, empty responses, structured answers).',
        'Implemented consistency checks between predicted labels and generated explanations to detect invalid reasoning.',
      ],
      uses: ['langgraph', 'llm-systems', 'agent-design', 'model-eval', 'stride', '5g'],
      stride: true, // show the STRIDE matrix (below) in this entry
      figure: {
        caption: 'STRIDE evaluation agent, functional blocks',
        stages: [
          { kind: 'in', label: 'LLM-generated STRIDE analysis', sub: '5G threat modeling' },
          { kind: 'proc', label: 'Output extraction', sub: 'labels · empty responses · structured answers' },
          { kind: 'proc', label: 'Consistency check', sub: 'predicted label vs. explanation' },
          { kind: 'model', label: 'LLM-as-judge', sub: 'LangGraph agent' },
          { kind: 'out', label: 'Evaluation', sub: 'invalid reasoning detected' },
        ] as Stage[],
      },
    },
    {
      role: 'Full-Stack AI Engineer Intern',
      org: 'Allence-Tunisie',
      period: '06/2025 – 08/2025',
      marginNote: '',
      items: [
        'Designed and deployed an AI-powered interview chatbot using LangChain; applied research on LLM-based conversational agents for reasoning and evaluation.',
      ],
      uses: ['langchain', 'llm-systems', 'agent-design', 'model-eval'],
      stride: false,
      figure: null,
    },
    {
      role: 'Full-Stack Developer Intern',
      org: 'Nexus Global Banking',
      period: '06/2024 – 07/2024',
      marginNote: '',
      items: [
        'Built an internal IT request management platform with Angular and Spring Boot, automating approval workflows through REST APIs.',
      ],
      uses: ['angular', 'spring-boot', 'rest', 'java'],
      stride: false,
      figure: null,
    },
  ],
};

/* The interactive matrix inside 4.1. One line per category. */
export const strideMatrix = {
  caption: 'STRIDE categories checked by the evaluation agent',
  prompt: 'Select a category to read how the agent checks it.',
  categories: [
    { letter: 'S', name: 'Spoofing', check: 'Checks that an analysis labelled Spoofing explains an impersonation of an identity or network function; a mismatch is reported as invalid reasoning.' },
    { letter: 'T', name: 'Tampering', check: 'Checks that an analysis labelled Tampering explains an unauthorised modification of data, messages or configuration; a mismatch is reported as invalid reasoning.' },
    { letter: 'R', name: 'Repudiation', check: 'Checks that an analysis labelled Repudiation explains an action that cannot be attributed or audited; a mismatch is reported as invalid reasoning.' },
    { letter: 'I', name: 'Information disclosure', check: 'Checks that an analysis labelled Information disclosure explains an exposure of data to a party not authorised to read it; a mismatch is reported as invalid reasoning.' },
    { letter: 'D', name: 'Denial of service', check: 'Checks that an analysis labelled Denial of service explains a loss or degradation of availability; a mismatch is reported as invalid reasoning.' },
    { letter: 'E', name: 'Elevation of privilege', check: 'Checks that an analysis labelled Elevation of privilege explains a gain of rights beyond those granted; a mismatch is reported as invalid reasoning.' },
  ],
};

/* ---- 5 Test Results (research projects) -------------------------------- */
export const projects = {
  intro: 'This clause reports the research projects carried out as test cases. Each is drawn as a block diagram: boxes are stages, arrows are data.',
  marginNote: 'Document-shaped box: input. Double-sided box: model. Underlined box: result.',
  summaryCaption: 'Summary of test cases',
  summaryHead: ['Ref.', 'Test case', 'Period', 'Measured outcome'],
  entries: [
    {
      title: 'Token Understanding for Invoice Validation',
      context: 'IEEE Tunisia Section',
      period: '02/2025 – 05/2025',
      // rich text
      summary: 'LLM-driven field extraction from handwritten and machine-generated invoices; token-level understanding for automated validation.',
      outcome: 'Not quantified in this revision',
      outcomeAccent: false,
      marginNote: '',
      uses: ['llm-systems'],
      figure: {
        caption: 'Invoice field-extraction and validation pipeline',
        stages: [
          { kind: 'in', label: 'Invoice', sub: 'handwritten · machine-generated' },
          { kind: 'model', label: 'LLM field extraction' },
          { kind: 'proc', label: 'Token-level understanding' },
          { kind: 'out', label: 'Automated validation' },
        ] as Stage[],
      },
    },
    {
      title: 'ML and Digital Twins for Network Performance',
      context: '',
      period: '10/2024 – 01/2025',
      summary: 'ML models for network performance prediction; enhanced the RouteNet[^routenet] GNN with an attention mechanism; QoS analysis on simulated datasets.',
      outcome: 'Not quantified in this revision',
      outcomeAccent: false,
      marginNote: '',
      uses: [] as string[],
      figure: {
        caption: 'Attention-augmented RouteNet pipeline',
        stages: [
          { kind: 'in', label: 'Simulated datasets' },
          { kind: 'model', label: 'RouteNet GNN', inset: '+ attention' },
          { kind: 'proc', label: 'Performance prediction' },
          { kind: 'out', label: 'QoS analysis' },
        ] as Stage[],
      },
    },
    {
      title: 'Sentiment Analysis on a Tunisian Dataset',
      context: '',
      period: '11/2024 – 12/2024',
      summary: 'Custom dataset (BeautifulSoup, NLTK); TF-IDF + Random Forest classifier reaching 85% accuracy[^accuracy].',
      outcome: '85 % accuracy',
      outcomeAccent: true,
      marginNote: 'Result: 85 % accuracy.',
      uses: ['python'],
      figure: {
        caption: 'Sentiment classification pipeline',
        stages: [
          { kind: 'in', label: 'Custom Tunisian dataset', sub: 'BeautifulSoup · NLTK' },
          { kind: 'proc', label: 'TF-IDF', sub: 'features' },
          { kind: 'model', label: 'Random Forest', sub: 'classifier' },
          { kind: 'out', label: '85 %', sub: 'accuracy', emph: true },
        ] as Stage[],
      },
    },
  ],
};

/* ---- 6 Conformance (certificates) -------------------------------------- */
export const certificates = {
  intro: 'The engineer holds the following certificates.',
  caption: 'Certificates held',
  head: ['Ref.', 'Certificate', 'Issuer'],
  entries: [
    {
      title: 'CCNA',
      parts: ['Introduction to Networks', 'Switching, Routing and Wireless', 'Enterprise Networking, Security and Automation'],
      issuer: 'Cisco',
      uses: ['ccna'],
    },
    {
      title: 'Natural Language Processing',
      parts: [] as string[],
      issuer: 'NVIDIA',
      uses: [] as string[],
    },
  ],
};

/* ---- Annex A: Languages ------------------------------------------------ */
export const languages = {
  caption: 'Languages, CEFR levels',
  head: ['Language', 'Level', 'CEFR band'],
  entries: [
    { name: 'French', level: 'C2', band: 'Proficient user' },
    { name: 'English', level: 'C1', band: 'Proficient user' },
    { name: 'German', level: 'A2', band: 'Basic user' },
  ],
};

/* ---- Annex B: Contact --------------------------------------------------
   Replace the three placeholders. While a value still starts with "[" it is
   printed as plain text instead of a link. No phone number, by design. */
export const contact = {
  intro: 'The engineer can be reached over the following interfaces.',
  caption: 'Contact interfaces',
  head: ['Interface', 'Address'],
  entries: [
    { label: 'Email', value: '[MY_EMAIL]', kind: 'email' },
    { label: 'LinkedIn', value: '[LINKEDIN_URL]', kind: 'url' },
    { label: 'GitHub', value: '[GITHUB_URL]', kind: 'url' },
  ],
};

/* ---- Annex C: Printable version ---------------------------------------- */
export const printable = {
  text: 'A printable version of the present document is available as a PDF.',
  linkLabel: 'Download PDF',
  // Put the file at public/Emna_Hasnaoui_CV.pdf
  path: 'Emna_Hasnaoui_CV.pdf',
};

export const colophon = 'End of document. Set in Source Serif 4 and IBM Plex Mono.';
