export interface Chapter {
  id: string;
  number: number | string;
  title: string;
  partId: string;
  description: string;
  content: string[];
  keyQuote?: string;
  isMiniChapter?: boolean;
}

export interface Part {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  chapters: Chapter[];
}

export const PROLOGUE: Chapter = {
  id: "prologue",
  number: "Prologue",
  title: "The Invitation",
  partId: "prologue",
  description: "A call to rise beyond comfort and into alignment with your highest self.",
  keyQuote: "You are not being asked to be flawless. You are being asked to rise.",
  content: [
    "This is not a book for the comfortable.",
    "It is a book for the person who senses, quietly but relentlessly, that they were meant for something higher than the life they have been told to accept. Not more status. Not more applause. Not more performance.",
    "More alignment. More clarity. More truth.",
    "You have always felt it—the pressure between who you are and who you could become. Most people silence that pressure. They drown it in distraction, numb it with entertainment, negotiate it down to something manageable and socially acceptable.",
    "But you didn't. You couldn't. You wouldn't.",
    "There is a part of you that knows the truth: You are being called upward.",
    "Not to perfection as society defines it, but to Most Perfect—the highest standard a human being can hold without collapsing under ego or illusion.",
    "Not to superhuman fantasy, but to Above Human—a disciplined way of perceiving, thinking, choosing, and acting that transcends the default settings of fear, bias, emotional volatility, and self-deception.",
    "Not to blind faith or empty confidence, but to Proven and Verified—a life whose beliefs, decisions, identity, and purpose have all been tested under the light of reality.",
    "This book is an invitation into that higher life. A life where your mind becomes precise, your emotions become stable, your integrity becomes unshakeable, your decisions become evidence-based, your identity becomes crafted—not inherited, your purpose becomes aligned—not improvised, your legacy becomes intentional—not accidental.",
    "A life where you are no longer shaped by external noise but by internal law. A life where you no longer bend to pressure but refine because of it. A life where you stop surviving your humanity and start mastering it.",
    "If you are reading these words, you are already on the threshold. This is the moment where the line is drawn.",
    "You are being invited to the second path—calm, deliberate, aligned, verified, and deeply alive.",
    "You are not being asked to be flawless. You are being asked to rise. You are not being asked to become someone else. You are being asked to become who you were designed to be.",
    "This is your invitation. Turn the page. Step into alignment. Begin the life that proves itself."
  ],
};

export const EPILOGUE: Chapter = {
  id: "epilogue",
  number: "Epilogue",
  title: "The Final Integration",
  partId: "epilogue",
  description: "The path from human default to Above Human alignment—choose your standard, your system, your legacy.",
  keyQuote: "You are the proof. You are the standard. You are the living demonstration that the Most Perfect is possible.",
  content: [
    "Take a breath. Turn the page of your life. Let everything you have read become a standard you now embody.",
    "This is the covenant you make with yourself:",
    "I refuse the default human setting. I will not be ruled by fear, ego, bias, or inherited limitation. I choose a higher standard—one that does not bend to emotion, culture, or convenience.",
    "I pursue perfection as alignment, not image. My standard is internal. My proof is my character. My measure is my own progress.",
    "I submit every belief, decision, and identity to the test of truth. I live by what is Proven. I act from what is Verified. I rise through what is Real.",
    "I will think with clarity. I will act with integrity. I will endure with resilience. I will love with depth. I will speak with calm truth. I will stand with unwavering purpose.",
    "I choose the Above Human mindset. Not to transcend my humanity, but to elevate it. To refine it. To discipline it. To honor it.",
    "I compare myself only to who I was yesterday and who I am becoming tomorrow.",
    "I carry my standard quietly, consistently, and without apology. Not to impress anyone—but to remain aligned with what is Absolute.",
    "Let this be the dividing line of your life: Before this page, preparation. After this page, evidence.",
    "You are the proof. You are the standard. You are the living demonstration that the Most Perfect is possible.",
    "Live Above Human. Live Proven and Verified. Live Most Perfect."
  ],
};

export const bookParts: Part[] = [
  {
    id: "part-1",
    number: "I",
    title: "The Search for Perfection",
    subtitle: "Foundations",
    chapters: [
      {
        id: "ch-1",
        number: 1,
        title: "The Idea of the \"Most Perfect\"",
        partId: "part-1",
        description: "Why humans are obsessed with perfection — from Plato to modern psychology.",
        keyQuote: "Perfection is the consistent pursuit of virtue—the steady practice of excellence.",
        content: [
          "Perfection has always been one of humanity's most enduring obsessions. It appears in every civilization, across every generation, and within every individual who has ever attempted to improve something.",
          "The phrase \"Most Perfect\" takes the ambition further. It suggests a standard beyond even what is typically imagined—an expression that challenges assumptions and pushes boundaries.",
          "Human beings do not pursue perfection by accident. The desire is woven into how the brain learns, how societies evolve, and how individuals define meaning.",
          "The Drive Toward Mastery: Human survival depended on improvement. Early tools became sharper. Food preparation became safer. The brain evolved to reward progress, refinement, and mastery.",
          "The Desire for Identity and Significance: Perfection influences how people view themselves. People pursue it not only to improve performance, but to protect self-worth.",
          "The Search for Transcendence: Every culture contains a vision of \"something more\"—a higher state, a higher truth, a higher self. Perfection is a gateway to transcendence.",
          "Plato introduced one of the most influential views—the physical world is a flawed copy of a higher realm of perfect forms. Nothing humans create is truly perfect; everything is a reflection of an ideal beyond the senses.",
          "Aristotle brought perfection down to earth. Perfection means expressing virtue—choosing the right action in the right amount at the right time. The \"golden mean\" represents balance.",
          "In Christian theology, perfection is connected to holiness, purity, and alignment with divine will. Perfection becomes a standard of character, not performance.",
          "The Enlightenment shifted focus again. Mathematics became the new symbol of perfection. Scientific laws became the new pillars of certainty. Perfection was measurable, logical, and structural.",
          "Modern psychology identified two forms of perfectionism: Perfectionistic Strivings (healthy excellence) and Perfectionistic Concerns (unhealthy pressure). The concept of \"Most Perfect\" aims to elevate the healthy side."
        ],
      },
      {
        id: "ch-2",
        number: 2,
        title: "\"Above Human\" — Beyond the Limits of Flesh and Mind",
        partId: "part-1",
        description: "The default human operating system and what it means to transcend it.",
        keyQuote: "Being 'human' means being vulnerable to distorted perception. Being 'above human' means rising above these distortions.",
        content: [
          "Human beings possess extraordinary potential, yet they are bound by profound limitations. The phrase \"Above Human\" does not imply superiority over others—it describes a state of enhanced clarity, improved discipline, refined reasoning, and elevated consciousness.",
          "The human brain evolved for survival, not accuracy. It excels at pattern detection and quick decision making, but struggles with objectivity and precision.",
          "Common Limitations: Confirmation bias, availability bias, status quo bias, emotional reasoning, projection, and overconfidence. These biases shape how people interpret events, relationships, and themselves.",
          "Being \"human\" means being vulnerable to distorted perception. Being \"above human\" means rising above these distortions.",
          "Science succeeds because it deliberately counteracts cognitive error—observations are recorded systematically, experiments are repeated, claims are challenged openly, results are scrutinized.",
          "\"Above Human\" acknowledges both divine truth and empirical truth, recognizing that humans seek meaning through both spiritual intuition and objective understanding.",
          "To reach an \"above human\" state, individuals must learn to think with clarity, feel with wisdom, act with discipline, and align belief with evidence."
        ],
      },
      {
        id: "ch-3",
        number: 3,
        title: "\"Proven and Verified\" — The Demand for Evidence",
        partId: "part-1",
        description: "What makes something verified: logic, evidence, reproducibility, and lived results.",
        keyQuote: "Verification is a discipline. A commitment. A standard.",
        content: [
          "In a world filled with misinformation, emotional narratives, and conflicting opinions, people crave something stable—something grounded. This is where verification enters.",
          "\"Proven and Verified\" represents a standard for truth that is independent of preference, emotion, or belief.",
          "Verification requires three rigorous criteria: The Scientific Method (hypothesis, test, data, results), Reproducibility and Peer Review (multiple independent confirmations), and Logical Consistency (conclusions must follow from premises).",
          "Most conflicts arise when beliefs are mistaken for verified fact. Understanding the difference is essential for leadership, communication, and self-mastery.",
          "\"Proven and Verified\" teaches individuals to respect belief, pursue evidence, separate emotion from conclusion, and value clarity over assumption.",
          "Certainty provides psychological stability—it satisfies needs for safety, control, and identity. \"Proven and Verified\" becomes a remedy for the discomfort of uncertainty."
        ],
      },
      {
        id: "mini-ch",
        number: "Mini",
        title: "Worshipped or Crucified",
        partId: "part-1",
        isMiniChapter: true,
        description: "How your relationship with perfection shapes your fate.",
        keyQuote: "Will your pursuit of perfection turn you into a model of mastery or a symbol of threat?",
        content: [
          "In every field, there are people whose standards are legendary. Some are admired. Others are attacked.",
          "Modern psychology draws a clear distinction between adaptive perfectionism (the quiet pursuit of mastery) and maladaptive perfectionism (the loud display of flawlessness).",
          "Adaptive perfectionism is grounded in growth—internally driven. You set high standards, use feedback to improve, focus on output quality, and treat mistakes as information.",
          "Maladaptive perfectionism is grounded in fear—externally driven. You obsess over perception, overreact to errors, and use expectations as weapons rather than tools.",
          "The crucial difference: Adaptive perfectionism points inward (\"How can I improve?\"). Maladaptive perfectionism points outward (\"How can I avoid blame?\").",
          "Leaders who pursue mastery with humility tend to be respected. Leaders who perform flawlessness to protect ego tend to provoke tension.",
          "Choose: Shift from image to integrity. Make excellence shared. Treat mistakes as data. Hold yourself to a higher standard than you demand of others. Stay grounded in purpose, not performance."
        ],
      },
    ],
  },
  {
    id: "part-2",
    number: "II",
    title: "Applications of the Concept",
    subtitle: "Domains of Truth",
    chapters: [
      {
        id: "ch-4",
        number: 4,
        title: "Theological Dimension: God as \"Most Perfect Above Human\"",
        partId: "part-2",
        description: "God as the absolute standard of goodness and truth across religions.",
        keyQuote: "Faith and reason are complementary modes of verification.",
        content: [
          "God represents the absolute standard of goodness and truth in theological frameworks.",
          "In Christian theology: holiness, righteousness, and moral perfection form the foundation of the divine standard.",
          "Comparative religion reveals parallel concepts: Hindu moksha, Buddhist enlightenment, Islamic tawhid—all point toward a perfected state of being.",
          "Faith and reason serve as complementary modes of verification, not opposing forces.",
          "The theological dimension establishes that the pursuit of 'Most Perfect' has deep spiritual roots across cultures and traditions."
        ],
      },
      {
        id: "ch-5",
        number: 5,
        title: "Scientific Dimension: Laws and Proofs",
        partId: "part-2",
        description: "Mathematics as logical perfection and the scientific method as self-correction.",
        keyQuote: "The scientific method is the foundation of the 'Proven and Verified' standard.",
        content: [
          "Mathematics serves as a model of logical perfection—precise, provable, and universal.",
          "Physics represents the search for universal elegant laws that govern reality.",
          "The scientific method embodies self-correction: hypothesize, test, observe, revise. It is the ultimate system for eliminating bias.",
          "Applying scientific thinking to personal life transforms decision-making from intuitive to evidence-based.",
          "Science provides the methodological backbone of the 'Proven and Verified' standard."
        ],
      },
      {
        id: "ch-6",
        number: 6,
        title: "Technological Dimension: AI and the Quest for Perfection",
        partId: "part-2",
        description: "The dream of bias-free systems and the limits of 'perfect' AI.",
        keyQuote: "Above Human technology requires Above Human governance.",
        content: [
          "The technological age brings the dream of bias-free, transparent, errorless systems.",
          "Cryptography, algorithms, and machine learning represent humanity's attempt to build perfect decision-making tools.",
          "Yet AI has limits—it is trained on human-shaped data, inheriting our biases and blind spots.",
          "Above Human technology demands Above Human governance—oversight, ethics, and accountability.",
          "Technology is a mirror of human ambition: powerful but imperfect, requiring constant verification."
        ],
      },
      {
        id: "ch-7",
        number: 7,
        title: "Psychological Dimension: Human Striving for the Perfect Life",
        partId: "part-2",
        description: "Self-oriented, other-oriented, and socially prescribed perfectionism.",
        keyQuote: "Resilience, adaptability, and progress over flawlessness.",
        content: [
          "Psychology identifies three forms of perfectionism: self-oriented (internal standards), other-oriented (expectations of others), and socially prescribed (perceived external pressure).",
          "The inner experience of perfectionism includes shame, anxiety, and paralysis—the emotional cost of impossible standards.",
          "The Pareto principle offers an escape from perfection paralysis: 80% of results come from 20% of efforts.",
          "Resilience, adaptability, and progress over flawlessness—these form the psychological path to the 'Most Perfect' standard.",
          "The goal is not the elimination of imperfection but the mastery of response to it."
        ],
      },
      {
        id: "ch-8",
        number: 8,
        title: "Philosophical Dimension: Perfection in Stoicism",
        partId: "part-2",
        description: "A 2,000-year-old framework for verified excellence.",
        keyQuote: "The dichotomy of control creates internal excellence beyond envy.",
        content: [
          "The Ideal Sage in Stoicism serves as a regulating ideal, not a status to achieve—a compass, not a destination.",
          "Stoicism balances binary perfection (the Sage as absolute) with continuous progress (prokopē—daily advancement).",
          "The three disciplines of Stoicism: assent (what you accept as true), desire (what you pursue), and action (how you contribute).",
          "The dichotomy of control—focusing only on what you can influence—creates internal excellence beyond comparison or envy.",
          "Modern Stoic protocol for daily practice: morning intention, midday audit, evening review. A 2,000-year-old system verified by millennia of practitioners."
        ],
      },
    ],
  },
  {
    id: "part-3",
    number: "III",
    title: "Rising Beyond Limit",
    subtitle: "The Above Human Mindset",
    chapters: [
      {
        id: "ch-9",
        number: 9,
        title: "The Above Human Mind: A New Internal Standard",
        partId: "part-3",
        description: "Shifting from 'this is how I am' to 'this is my standard.'",
        keyQuote: "The Above Human Mind is the version of your mind that emerges when you rise above fear, bias, automatic reaction, and ego.",
        content: [
          "Every person carries two versions of themselves. One is shaped by instinct, fear, habit, and inherited patterns—reactive, biased, emotional. The other is quieter, sharper, more deliberate.",
          "The Above Human Mind is not supernatural. It is the version of your mind that emerges when you rise above fear, bias, automatic reaction, and ego.",
          "Core principles: Awareness Before Action (observe before reacting), Truth Over Comfort (seek truth even when uncomfortable), Discipline Over Impulse (follow systems, not feelings).",
          "Curiosity Over Judgment (mistakes become information, not fear), Service Over Ego (ask 'how does this make things better?'), Logic and Evidence Over Assumption.",
          "Consistency Over Performance: practice excellence even when nobody is watching. Consistency creates trust, credibility, identity.",
          "The Above Human identity is not built on perfection—it is built on precision, alignment, truth, evidence, purpose, and mastery."
        ],
      },
      {
        id: "ch-10",
        number: 10,
        title: "The 10 Laws of the Proven Life",
        partId: "part-3",
        description: "The foundational laws that govern the Above Human path.",
        keyQuote: "These ten laws are the operating system of a life that proves itself.",
        content: [
          "Law 1 — The Law of Verification: Submit every belief, decision, and claim to the test of evidence. What cannot be verified must be questioned.",
          "Law 2 — The Rejection of Bias: Actively identify and counteract cognitive distortions. Bias-aware thinking is the baseline of Above Human intelligence.",
          "Law 3 — The Pursuit of the Invariant: Seek principles that hold true across time, context, and culture. Build your life on what does not change.",
          "Law 4 — The Scientific Spirit: Approach life as an experiment. Hypothesize, test, observe, adjust. Never assume—always verify.",
          "Law 5 — The 80/20 Sanctity: Focus your energy on the 20% of actions that produce 80% of results. Eliminate perfectionism paralysis through strategic priority.",
          "Law 6 — The Transcendence of Ego: Your identity is not your image. Release the need for external validation and anchor your worth in alignment and evidence.",
          "Law 7 — The Duty of Articulation: What you cannot articulate, you do not truly understand. Clarity of expression reflects clarity of thought.",
          "Law 8 — The Resilience of Granite: Withstand pressure without losing shape. Develop emotional, mental, and spiritual fortitude.",
          "Law 9 — The Unity of Faith and Reason: Spiritual intuition and empirical evidence are complementary paths to truth. Honor both.",
          "Law 10 — The Ultimate Standard: Hold yourself to a standard so high it becomes your identity. Let your standard be your compass, your structure, and your legacy."
        ],
      },
      {
        id: "ch-11",
        number: 11,
        title: "Escaping Cognitive Bias",
        partId: "part-3",
        description: "How to outthink the limits of the human brain.",
        keyQuote: "Bias is the ceiling of ordinary performance. Awareness is the beginning of transcendence.",
        content: [
          "The human mind is powerful, but not neutral. It processes reality through filters—patterns of distortion known as cognitive biases.",
          "Cognitive bias is not a failure of intelligence. It is the starting point of intelligence.",
          "Confirmation Bias: Favor information that proves you right. Escape by hunting for disconfirming evidence.",
          "Availability Bias: What comes to mind first feels most true. Escape by expanding the sample—ask what information you're missing.",
          "Emotional Reasoning: How you feel is not evidence of what is real. Separate signals from stories.",
          "Overconfidence Bias: You know less than you think. The Expert Audit: seek those with more experience.",
          "Projection Bias: Not everyone thinks like you. Reality test through genuine dialogue.",
          "When you escape bias, you step into clarity under pressure, accuracy under uncertainty, and truth over ego."
        ],
      },
      {
        id: "ch-12",
        number: 12,
        title: "Breaking the Fear Loop",
        partId: "part-3",
        description: "Emotional mastery and the end of self-sabotage.",
        keyQuote: "Avoidance strengthens fear. Action dissolves it.",
        content: [
          "People do not sabotage themselves because they are weak. They sabotage themselves because they are afraid.",
          "The Fear Loop has four steps: Trigger → Interpretation → Reaction → Avoidance Behavior. This loop repeats until it becomes identity.",
          "Stage 1 — Interrupt the Trigger: Name what triggered you. Unnamed triggers grow; named triggers dissolve.",
          "Stage 2 — Rewrite the Interpretation: Fear is caused by meaning assigned to events, not events themselves. Challenge the interpretation.",
          "Stage 3 — Regulate the Reaction: Emotional mastery is regulation, not suppression. Breathe, label the emotion, ground your senses.",
          "Stage 4 — Replace Avoidance with Action: Take controlled steps. The first step is the hardest. By the tenth, the fear loop is broken.",
          "Once the fear loop collapses, self-sabotage has no oxygen. You stop delaying, performing, and shrinking your ambition to fit your comfort."
        ],
      },
      {
        id: "ch-13",
        number: 13,
        title: "Identity Reforging",
        partId: "part-3",
        description: "Becoming the person who can carry the Most Perfect Standard.",
        keyQuote: "Identity is not who you are. Identity is who you believe yourself to be.",
        content: [
          "Every transformation begins with an identity shift—not a cosmetic shift in habits, but a fundamental shift in how you see yourself.",
          "Identity is not who you are. Identity is who you believe yourself to be. Whatever you believe yourself to be becomes the ceiling of your achievement.",
          "Identity is composed of stories plus evidence. To change identity, you must change both the narratives you carry and the proof you create.",
          "Why behavior change fails without identity change: habits collapse when they contradict your self-concept.",
          "Building a Most Perfect identity through aligned proof: act consistently with who you want to become, and the evidence accumulates into a new identity.",
          "Release old labels and roles that no longer serve your standard. You are not your past—you are your direction."
        ],
      },
      {
        id: "ch-14",
        number: 14,
        title: "Proven and Verified: Truth-Based Leadership",
        partId: "part-3",
        description: "A repeatable decision flow for evidence-driven leaders.",
        keyQuote: "Becoming known as a stable, evidence-driven leader transforms your influence.",
        content: [
          "The cost of unverified leadership: decisions based on ego, emotion, or assumption erode trust and produce inconsistent results.",
          "A repeatable decision flow for leaders: Gather evidence → Challenge assumptions → Test conclusions → Act with clarity → Review outcomes.",
          "Applying verification to relationships: treat interpersonal dynamics with the same rigor as strategic decisions.",
          "Applying verification to teams: create cultures where evidence is valued over opinion, and clarity is valued over hierarchy.",
          "Becoming known as a stable, evidence-driven leader is the ultimate professional advantage. It transforms influence from personality-based to principle-based."
        ],
      },
    ],
  },
  {
    id: "part-4",
    number: "IV",
    title: "The Most Perfect Standard",
    subtitle: "Leadership, Work, and Life",
    chapters: [
      {
        id: "ch-15",
        number: 15,
        title: "A New Benchmark for Human Excellence",
        partId: "part-4",
        description: "What the Most Perfect Standard is and is not.",
        keyQuote: "The standard prevents drift—the slow erosion of excellence that happens without intentional vigilance.",
        content: [
          "The Most Perfect Standard is not about being flawless. It is about maintaining the highest possible alignment between your values, your actions, and your impact.",
          "Four domains of application: self (internal alignment), work (professional excellence), relationships (interpersonal integrity), and leadership (influence with purpose).",
          "The standard prevents drift—the slow erosion of excellence that happens without intentional vigilance.",
          "Why most people avoid high standards: fear of failure, fear of isolation, and the comfort of mediocrity. How to stand apart safely: let your standard serve others, not threaten them."
        ],
      },
      {
        id: "ch-16",
        number: 16,
        title: "The Standard of Mastery: Excellence Without Ego",
        partId: "part-4",
        description: "Skill mastery, systems mastery, and self mastery.",
        keyQuote: "Masters burn out less than strivers because their fuel is purpose, not anxiety.",
        content: [
          "Mastery vs performance: mastery is the relentless refinement of capability; performance is the display of capability for approval.",
          "Three levels: Skill mastery (technical excellence), Systems mastery (designing environments for sustained quality), Self mastery (governing your own mind and emotions).",
          "The mastery loop: observe, evaluate, adjust, repeat. This cycle never ends—mastery is a direction, not a destination.",
          "Why masters burn out less than strivers: their fuel is purpose, not anxiety. Their standard is internal, not externally imposed."
        ],
      },
      {
        id: "ch-17",
        number: 17,
        title: "The Standard of Communication: Truth Without Harm",
        partId: "part-4",
        description: "The Most Perfect communication formula.",
        keyQuote: "Speaking in a way that creates order, not chaos.",
        content: [
          "Why communication fails: emotion overrides clarity, assumptions replace inquiry, and defensiveness replaces curiosity.",
          "The Most Perfect communication formula: truth + clarity + stable tone. Say what is real, say it clearly, say it calmly.",
          "A model for hard conversations: state the fact, share your perspective, invite theirs, seek resolution.",
          "Speaking in a way that creates order, not chaos—this is the communication standard of the Above Human leader."
        ],
      },
      {
        id: "ch-18",
        number: 18,
        title: "The Standard of Discipline: Consistency Without Collapse",
        partId: "part-4",
        description: "Discipline as an operating system, not a mood.",
        keyQuote: "Aligned discipline prevents burnout because it flows from identity, not willpower.",
        content: [
          "Discipline is not motivation. It is an operating system—a structure that functions regardless of mood or circumstance.",
          "Identity-based discipline: when your identity includes 'I am disciplined,' the actions follow naturally.",
          "Systems, environment, and emotional regulation form the three pillars of sustainable discipline.",
          "Non-negotiable habits: the small daily actions that maintain your standard even on difficult days.",
          "Aligned discipline prevents burnout because it flows from identity, not willpower."
        ],
      },
      {
        id: "ch-19",
        number: 19,
        title: "The Standard of Integrity: Alignment Without Compromise",
        partId: "part-4",
        description: "Structural alignment of belief, speech, and behavior.",
        keyQuote: "Integrity is not a trait. It is an architecture.",
        content: [
          "Integrity is structural alignment between belief, speech, and behavior. When these three are in harmony, you are whole.",
          "Four dimensions of integrity: with self (honesty about who you are), with others (keeping commitments), with standards (maintaining quality), with reality (accepting truth).",
          "The integrity collapse pattern: small compromises accumulate until the gap between stated values and actual behavior becomes a chasm.",
          "Daily integrity checkpoints: Am I doing what I said I would? Am I being who I claim to be? Am I facing reality honestly?"
        ],
      },
      {
        id: "ch-20",
        number: 20,
        title: "The Standard of Leadership: Influence Without Force",
        partId: "part-4",
        description: "Designing cultures around standards, not personalities.",
        keyQuote: "The best leaders are not the most powerful—they are the most consistent.",
        content: [
          "Ego-driven leadership relies on control, charisma, and fear. Standard-based leadership relies on clarity, consistency, and truth.",
          "Four pillars of Above Human leadership: clarity of direction, consistency of behavior, emotional stability, and truth-based decision-making.",
          "Building trust without control: people follow leaders they trust, not leaders they fear.",
          "Designing cultures around standards, not personalities, ensures that excellence persists beyond any single leader."
        ],
      },
      {
        id: "ch-21",
        number: 21,
        title: "The Standard of Purpose: Direction Without Doubt",
        partId: "part-4",
        description: "Using purpose as a filter for commitments and decisions.",
        keyQuote: "Purpose is needed to sustain high standards through difficulty and doubt.",
        content: [
          "Purpose is the anchor that holds high standards in place when pressure, fatigue, and temptation push toward compromise.",
          "Three dimensions of purpose: personal (who you are becoming), relational (how you serve others), and mission (what you are building).",
          "Purpose vs motivation: motivation fluctuates with emotion; purpose endures through difficulty.",
          "A Most Perfect purpose statement crystallizes your direction into a sentence that guides every decision.",
          "Using purpose as a filter: every commitment and decision is measured against your stated purpose. What doesn't align gets released."
        ],
      },
    ],
  },
  {
    id: "part-5",
    number: "V",
    title: "The Above Human Operating System",
    subtitle: "Operating System and Legacy",
    chapters: [
      {
        id: "ch-22",
        number: 22,
        title: "The Above Human Operating System",
        partId: "part-5",
        description: "Turning principles into daily practice with seven components.",
        keyQuote: "You need an operating system, not only ideas.",
        content: [
          "Ideas without systems are aspirations. Systems without ideas are routines. The Above Human Operating System fuses both.",
          "Seven components: clarity rituals, identity anchors, discipline frameworks, emotional protocols, verification habits, environmental design, and reflection cycles.",
          "The Above Human day: morning (intention and clarity), midday (audit and adjustment), evening (review and gratitude).",
          "This is not about perfecting every moment—it is about maintaining alignment across the majority of moments."
        ],
      },
      {
        id: "ch-23",
        number: 23,
        title: "Pressure, Crisis, and Attack",
        partId: "part-5",
        description: "Holding the Most Perfect Standard when it hurts.",
        keyQuote: "Becoming unshakeable without becoming numb.",
        content: [
          "Three types of pressure: internal (self-doubt, fear), environmental (market shifts, resource scarcity), and interpersonal (conflict, betrayal, criticism).",
          "The pressure formula: Pause → Verify → Regulate → Decide → Act. Each step prevents reactive error.",
          "Crisis leadership in practice: maintain clarity, communicate truth, protect the standard, serve the mission.",
          "Becoming unshakeable without becoming numb: emotional resilience means feeling deeply while acting wisely."
        ],
      },
      {
        id: "ch-24",
        number: 24,
        title: "Relationships, Boundaries, and Environments",
        partId: "part-5",
        description: "Three forces that support or undermine your standard.",
        keyQuote: "When to elevate and when to exit—the hardest decisions of the Above Human life.",
        content: [
          "Three forces shape your standard: people (who surrounds you), boundaries (what you protect), and environments (where you operate).",
          "Relationship categories: aligned (strengthen your standard), neutral (neither help nor hinder), and destabilizing (weaken your resolve).",
          "Three types of boundaries: behavioral (what you will and won't do), emotional (what you absorb and deflect), and energetic (where you invest attention).",
          "Physical, digital, and social environment design: your surroundings either reinforce or erode your standard.",
          "When to elevate and when to exit—the hardest decisions of the Above Human life."
        ],
      },
      {
        id: "ch-25",
        number: 25,
        title: "Multiplying the Standard",
        partId: "part-5",
        description: "Teaching, leading, and designing systems for others.",
        keyQuote: "Raising standards without force is the art of true leadership.",
        content: [
          "Three levels of multiplication: modeling (being the example), teaching (transferring knowledge), and system design (building structures that sustain standards without your presence).",
          "Raising standards without force: inspiration over imposition, invitation over demand.",
          "Identifying who can carry your standard: aligned (ready), adaptable (willing to grow), and resistant (not yet ready).",
          "Building cultures that run on clarity, truth, and discipline—not personality, politics, or pressure."
        ],
      },
      {
        id: "ch-26",
        number: 26,
        title: "Legacy: Becoming Living Proof",
        partId: "part-5",
        description: "The legacy equation and what you want your life to prove.",
        keyQuote: "Legacy = Identity × Consistency × Systems − Drift",
        content: [
          "Legacy is not what you leave behind—it is what you build while you are here. Three forms: personal (character), relational (impact on others), and systemic (structures that outlive you).",
          "The legacy equation: Identity × Consistency × Systems − Drift. Every element matters; any gap creates erosion.",
          "What you want your life to prove: this question becomes the filter for every decision, relationship, and commitment.",
          "Integrating the three pillars—Most Perfect, Above Human, Proven and Verified—into a lived testimony that others can witness, test, and follow."
        ],
      },
    ],
  },
  {
    id: "part-6",
    number: "VI",
    title: "Living the Manifesto",
    subtitle: "Practical Frameworks",
    chapters: [
      {
        id: "ch-27",
        number: 27,
        title: "Virtues as the Path to Perfection",
        partId: "part-6",
        description: "Classical, Christian, and modern virtues unified into one framework.",
        keyQuote: "Virtue is the only stable path to 'Most Perfect.'",
        content: [
          "Virtue is the only stable path to 'Most Perfect'—it is the bridge between intention and character.",
          "Classical virtues: prudence (see clearly), temperance (master yourself), justice (act rightly), courage (overcome fear).",
          "Christian virtues: faith (trust what is true), hope (sustain vision), charity (serve beyond self).",
          "Modern virtues: integrity, curiosity, compassion, and innovation—the virtues demanded by our time.",
          "Unified virtue framework: see clearly, act rightly, master yourself, overcome fear, serve a higher purpose."
        ],
      },
      {
        id: "ch-28",
        number: 28,
        title: "Practical Tools for Verification in Daily Life",
        partId: "part-6",
        description: "Evidence-based decision-making, journaling, and verification rituals.",
        keyQuote: "What you do not examine, you cannot improve. What you do not verify, you cannot trust.",
        content: [
          "Evidence-based decision-making framework: define the question, gather data, challenge assumptions, decide, review the outcome.",
          "Journaling and reflection as self-verification: writing forces clarity and reveals patterns invisible to thought alone.",
          "Integrating science and spirituality for discernment: use empirical rigor for external decisions and spiritual wisdom for internal ones.",
          "Daily rituals: the Morning 'One True Thing' (identify today's most important truth) and Evening Review (what worked, what didn't, what to adjust).",
          "Weekly rituals: belief audit (which beliefs still serve you?) and bias checklist (where did bias influence you this week?).",
          "Monthly ritual: the 80/20 reset—identify the 20% of activities producing 80% of your results, and eliminate or reduce the rest."
        ],
      },
      {
        id: "ch-29",
        number: 29,
        title: "The Manifesto: A Life Beyond Human Limits",
        partId: "part-6",
        description: "Your personal manifesto and the Above Human declaration.",
        keyQuote: "Let this be the line in your life where everything before was preparation and everything after is proof.",
        content: [
          "A personal manifesto is a declaration of identity—a written commitment to who you are choosing to become.",
          "Defining your Most Perfect in career, relationships, and purpose: what does excellence look like in each domain of your life?",
          "Six steps to alignment: clarify beliefs, audit behaviors, design environments, curate relationships, verify decisions, embody the standard.",
          "The Above Human Manifesto declaration:",
          "I refuse to be ruled by my first thoughts, my weakest impulses, or the fears I inherited from the world. I choose to be governed by evidence, alignment, and the standards I claim as absolute.",
          "I will not worship perfection as image. I will pursue perfection as integrity.",
          "I will measure myself not against others, but against the person I was yesterday, and the person I am destined to become.",
          "I will build my identity on truth, not emotion; on virtue, not ego; on resilience, not comfort.",
          "My purpose is not performance. My purpose is alignment. My worth does not come from attention. My worth comes from the standard I carry.",
          "I will discipline my thoughts, refine my actions, and protect the environments that shape me.",
          "You will not be flawless. You will be aligned. You will not be unbreakable. You will be unwavering.",
          "You are the evidence. You are the proof. You are the living demonstration that a human being can reach beyond human limits and remain fully, beautifully human.",
          "Let this be the line in your life where everything before was preparation and everything after is proof. This is your Manifesto. Now live it."
        ],
      },
    ],
  },
];

export const allChapters: Chapter[] = [
  PROLOGUE,
  ...bookParts.flatMap((part) => part.chapters),
  EPILOGUE,
];

export const getChapterById = (id: string): Chapter | undefined =>
  allChapters.find((ch) => ch.id === id);

export const getNextChapter = (currentId: string): Chapter | undefined => {
  const idx = allChapters.findIndex((ch) => ch.id === currentId);
  return idx >= 0 && idx < allChapters.length - 1 ? allChapters[idx + 1] : undefined;
};

export const getPreviousChapter = (currentId: string): Chapter | undefined => {
  const idx = allChapters.findIndex((ch) => ch.id === currentId);
  return idx > 0 ? allChapters[idx - 1] : undefined;
};

export const getPartForChapter = (chapterId: string): Part | undefined =>
  bookParts.find((part) => part.chapters.some((ch) => ch.id === chapterId));
