/* ==========================================================================
   content.ts — every word on the site lives in this file.
   Edit text here; the layout (src/pages/index.astro) never needs touching.

   Tags: a tag that appears on two or more rows (projects or experience)
   becomes hoverable and highlights the other rows that share it. A tag that
   appears once is printed as a plain label. Spelling must match exactly
   ("LLMs" and "LLM" would count as two different tags).

   Section headings: wrap a word in *asterisks* to set it in italics,
   e.g. 'Selected *work*'.
   ========================================================================== */

export const site = {
  name: 'Emna Hasnaoui',
  // Browser tab and link previews.
  title: 'Emna Hasnaoui — LLM agents, AI for network security and 5G',
  description:
    'Emna Hasnaoui builds and evaluates LLM agents, with a focus on AI for network security and 5G. Starting a MASc at Carleton University in Winter 2027.',
  nav: [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ],
};

/* ---- Contact details ----------------------------------------------------
   Replace the three placeholders. While a value still starts with "[" it is
   shown as un-linked text. No phone number, by design. */
export const contact = {
  email: '[MY_EMAIL]',
  linkedin: '[LINKEDIN_URL]',
  github: '[GITHUB_URL]',
  // Put the file at public/Emna_Hasnaoui_CV.pdf
  cv: 'Emna_Hasnaoui_CV.pdf',
  heading: 'Contact',
  sentence: 'If you work on LLM evaluation or AI for network security, I would like to hear from you.',
};

/* ---- Hero --------------------------------------------------------------- */
export const hero = {
  sentence: 'I build and evaluate LLM agents, with a focus on AI for network security and 5G.',
  lookingFor: 'Starting a MASc at Carleton University (Winter 2027) — open to research collaborations.',
  // The thesis pipeline drawn next to the name. `note` is the sentence shown
  // when a stage is hovered, focused or tapped.
  diagram: {
    label: 'Thesis pipeline · Carleton NGN Lab',
    hint: 'Hover or tap a stage to see what it does.',
    stages: [
      {
        name: 'LLM output',
        sub: 'a STRIDE threat analysis',
        note: 'An LLM writes a STRIDE threat analysis for a 5G system. That analysis is what gets evaluated.',
      },
      {
        name: 'Extraction',
        sub: 'labels · empty responses · structured answers',
        note: 'The agent pulls out what the model actually answered: its labels, its empty responses and its structured answers.',
      },
      {
        name: 'Consistency check',
        sub: 'label vs. explanation',
        note: 'Each predicted label is compared with the explanation written for it, to catch labels that contradict their own reasoning.',
      },
      {
        name: 'Verdict',
        sub: 'LLM-as-judge',
        note: 'An LLM judge returns the evaluation and flags analyses whose reasoning is invalid.',
      },
    ],
  },
};

/* ---- Selected work ------------------------------------------------------ */
export const work = {
  heading: 'Selected *work*',

  // The first project, shown larger, with text instead of a diagram.
  featured: {
    title: 'LLM-as-judge for 5G threat modeling',
    org: 'Carleton NGN Lab',
    outcome: 'An agentic LangGraph pipeline that evaluates STRIDE threat analyses produced by LLMs.',
    role: 'Applied research intern, final-year thesis',
    dates: '04/2026 – 09/2026',
    tags: ['Python', 'LangGraph', 'LLMs'],
    diagramLink: 'See the pipeline diagram at the top of the page',
    details: [
      {
        label: 'The problem',
        text: 'LLMs can produce STRIDE threat analyses for 5G systems, but their output has to be checked before anyone can rely on it, and checking it by hand does not scale.',
      },
      {
        label: 'What I built',
        text: 'An agentic framework in LangGraph that evaluates those analyses automatically, with an LLM as the judge. It first extracts what each model actually answered: labels, empty responses and structured answers.',
      },
      {
        label: 'What it catches',
        text: 'Invalid reasoning. For example, a predicted label that contradicts the explanation the model wrote for it.',
      },
    ],
  },

  // Diagram boxes: `lines` is the label and `accent` the optional highlighted
  // text under it. Both take one array item per line; keep each line short
  // (about 13 characters) so it stays inside its box.
  projects: [
    {
      title: 'Attention-augmented RouteNet',
      org: '',
      outcome: 'A GNN for network performance prediction, extended with an attention mechanism; QoS analysis on simulated data.',
      role: 'Research project',
      dates: '10/2024 – 01/2025',
      // TODO: add 'PyTorch' or 'TensorFlow' here, whichever the project used.
      tags: ['Python', 'GNN'],
      diagramLabel: 'Simulated data goes into the RouteNet GNN with added attention, which feeds a QoS analysis.',
      diagram: [
        { lines: ['Simulated', 'data'] },
        { lines: ['RouteNet', 'GNN'], accent: ['+ attention'] },
        { lines: ['QoS', 'analysis'] },
      ],
    },
    {
      title: 'Token-level invoice validation',
      org: 'IEEE Tunisia Section',
      outcome: 'LLM field extraction from handwritten and printed invoices, with token-level understanding for automated validation.',
      role: 'Research project — IEEE Tunisia Section',
      dates: '02/2025 – 05/2025',
      tags: ['Python', 'LLMs'],
      diagramLabel: 'A handwritten or printed invoice goes through LLM field extraction, then validation.',
      diagram: [
        { lines: ['Invoice'], accent: ['handwritten', 'or printed'] },
        { lines: ['LLM field', 'extraction'] },
        { lines: ['Validation'] },
      ],
    },
  ],

  more: {
    label: 'More projects',
    items: [
      {
        title: 'Sentiment analysis on a Tunisian dataset',
        text: 'custom dataset, TF-IDF + Random Forest classifier, 85% accuracy.',
        dates: '11/2024 – 12/2024',
        tags: ['Python', 'BeautifulSoup', 'NLTK', 'scikit-learn'],
      },
    ],
  },
};

/* ---- Experience --------------------------------------------------------- */
export const experience = {
  heading: 'Experience',
  entries: [
    {
      year: '2026',
      dates: '04/2026 – 09/2026',
      role: 'Applied Research Intern & Final-Year Thesis',
      org: 'Next Generation Networks Lab, Carleton University, Ottawa',
      text: 'Designed an agentic LangGraph framework that automatically evaluates LLM-generated STRIDE threat analyses for 5G, with consistency checks between predicted labels and explanations to detect invalid reasoning.',
      tags: ['Python', 'LangGraph', 'LLMs'],
    },
    {
      year: '2025',
      dates: '06/2025 – 08/2025',
      role: 'Full-Stack AI Engineer Intern',
      org: 'Allence-Tunisie',
      text: 'Designed and deployed an AI-powered interview chatbot using LangChain; applied research on LLM-based conversational agents for reasoning and evaluation.',
      tags: ['LangChain', 'LLMs'],
    },
    {
      year: '2024',
      dates: '06/2024 – 07/2024',
      role: 'Full-Stack Developer Intern',
      org: 'Nexus Global Banking',
      text: 'Built an internal IT request management platform with Angular and Spring Boot, automating approval workflows through REST APIs.',
      tags: ['Angular', 'Spring Boot', 'REST APIs'],
    },
  ],
};

/* ---- Skills ------------------------------------------------------------- */
export const skills = {
  heading: 'Skills',
  groups: [
    { label: 'Programming', text: 'Python, MATLAB, Java, C/C++' },
    {
      label: 'AI & agents',
      text: 'PyTorch, TensorFlow, LLM-based systems, LangChain, LangGraph, AI agent design, model evaluation',
    },
    {
      label: 'Security & networking',
      text: 'STRIDE threat modeling, 5G, cybersecurity fundamentals, CCNA, distributed systems',
    },
    {
      label: 'Engineering & DevOps',
      text: 'FastAPI, Spring Boot, Angular, NestJS, REST APIs, AWS, Docker, Kubernetes, Terraform, CI/CD, MySQL, PostgreSQL, MongoDB',
    },
  ],
};

/* ---- Education & certificates ------------------------------------------- */
export const education = {
  heading: 'Education & *certificates*',
  degreesLabel: 'Education',
  degrees: [
    {
      title: 'Engineering Degree, Computer Networks and Telecommunications',
      place: 'INSAT, Tunis',
      dates: '2023 – 2026',
    },
    {
      title: 'Integrated Preparatory Cycle in Mathematics, Physics and Computer Science',
      place: 'INSAT, Tunis',
      dates: '2021 – 2023',
    },
  ],
  certificatesLabel: 'Certificates',
  certificates: [
    {
      title: 'CCNA',
      detail: 'Introduction to Networks · Switching, Routing and Wireless · Enterprise Networking, Security and Automation',
    },
    { title: 'NVIDIA', detail: 'Natural Language Processing' },
  ],
  activitiesLabel: 'Activities',
  activities: ['IEEE Computer Society, INSAT Student Branch', 'ESSAI Machine Learning Club', 'Securinets INSAT'],
  languagesLabel: 'Languages',
  languages: [
    { name: 'French', level: 'C2' },
    { name: 'English', level: 'C1' },
    { name: 'German', level: 'A2' },
  ],
};
