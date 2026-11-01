export type WorkflowStage = {
  slug: string;
  phase: string;
  name: string;
  category: string;
  title: string;
  accent: string;
  intro: string;
  outcome: string;
  deliverables: [string, string][];
  steps: [string, string][];
  faq: [string, string][];
};

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    "slug": "fault-intake",
    "phase": "INTAKE",
    "name": "Describe",
    "category": "REPAIR CARE",
    "title": "Your fault. A clear starting point.",
    "accent": "A clear starting point.",
    "intro": "Share the model, symptoms and service location. Describe what still works and when the fault appears.",
    "outcome": "A useful symptom record helps identify the assessment needed.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Share the model, symptoms and service location. Describe what still works and when the fault appears."
      ],
      [
        "Confirm the next step",
        "A useful symptom record helps identify the assessment needed."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "fault-diagnosis",
    "phase": "ASSESS",
    "name": "Assess",
    "category": "REPAIR CARE",
    "title": "Look closer. Find the cause.",
    "accent": "Find the cause.",
    "intro": "Arrange model-specific checks rather than selecting a replacement part from a symptom alone.",
    "outcome": "The likely cause, further checks and repair feasibility are explained.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Arrange model-specific checks rather than selecting a replacement part from a symptom alone."
      ],
      [
        "Confirm the next step",
        "The likely cause, further checks and repair feasibility are explained."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-estimate",
    "phase": "ESTIMATE",
    "name": "Estimate",
    "category": "REPAIR CARE",
    "title": "Clear costs. Informed choices.",
    "accent": "Informed choices.",
    "intro": "Review inspection charges, labour, parts and exclusions before agreeing to repairs.",
    "outcome": "An estimate separates essential work from optional service.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Review inspection charges, labour, parts and exclusions before agreeing to repairs."
      ],
      [
        "Confirm the next step",
        "An estimate separates essential work from optional service."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-approval",
    "phase": "APPROVE",
    "name": "Approve",
    "category": "REPAIR CARE",
    "title": "Your device. Your decision.",
    "accent": "Your decision.",
    "intro": "Agree the repair scope before work begins. Further faults or changes need a separate conversation.",
    "outcome": "The approved work and any limitations are understood.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Agree the repair scope before work begins. Further faults or changes need a separate conversation."
      ],
      [
        "Confirm the next step",
        "The approved work and any limitations are understood."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-work",
    "phase": "REPAIR",
    "name": "Repair",
    "category": "REPAIR CARE",
    "title": "The agreed work. Carefully scoped.",
    "accent": "Carefully scoped.",
    "intro": "Repair or service focuses on the assessed fault, compatible parts and the work you approved.",
    "outcome": "The agreed repair is completed or revised options are discussed.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Repair or service focuses on the assessed fault, compatible parts and the work you approved."
      ],
      [
        "Confirm the next step",
        "The agreed repair is completed or revised options are discussed."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "function-testing",
    "phase": "TEST",
    "name": "Test",
    "category": "REPAIR CARE",
    "title": "Check the function. Review the result.",
    "accent": "Review the result.",
    "intro": "Review charging, display, recording, cooling, drainage or other relevant functions after work.",
    "outcome": "Completed checks and any remaining limitations are recorded.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Review charging, display, recording, cooling, drainage or other relevant functions after work."
      ],
      [
        "Confirm the next step",
        "Completed checks and any remaining limitations are recorded."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-handover",
    "phase": "HANDOVER",
    "name": "Handover",
    "category": "REPAIR CARE",
    "title": "Ready to return. Clear on care.",
    "accent": "Clear on care.",
    "intro": "Review completed work, returned accessories and applicable repair terms before daily use.",
    "outcome": "You have the service details needed for future questions.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Review completed work, returned accessories and applicable repair terms before daily use."
      ],
      [
        "Confirm the next step",
        "You have the service details needed for future questions."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  },
  {
    "slug": "repair-aftercare",
    "phase": "AFTERCARE",
    "name": "Aftercare",
    "category": "REPAIR CARE",
    "title": "Keep the record. Keep care close.",
    "accent": "Keep care close.",
    "intro": "Report recurring symptoms with the model and service reference. Discuss preventive care where useful.",
    "outcome": "A follow-up request starts with clear history rather than repeated guesses.",
    "deliverables": [
      [
        "Model and symptom record",
        "Record the exact equipment, symptoms and relevant damage history."
      ],
      [
        "Agreed scope",
        "Confirm what this stage includes and any further checks or charges."
      ],
      [
        "Useful service details",
        "Keep the assessment, approvals and completed checks together."
      ]
    ],
    "steps": [
      [
        "Share the context",
        "Explain the fault and any change since the previous conversation."
      ],
      [
        "Review the options",
        "Report recurring symptoms with the model and service reference. Discuss preventive care where useful."
      ],
      [
        "Confirm the next step",
        "A follow-up request starts with clear history rather than repeated guesses."
      ]
    ],
    "faq": [
      [
        "Is every fault repairable?",
        "No. Condition, parts availability and the assessed fault affect feasibility. Discuss alternatives before approving costly work."
      ],
      [
        "Are prices and timing fixed?",
        "No. Confirm charges, availability and expected timing for the model and agreed scope after assessment."
      ]
    ]
  }
];
export const workflowBySlug = (slug: string) => WORKFLOW_STAGES.find(stage => stage.slug === slug);
