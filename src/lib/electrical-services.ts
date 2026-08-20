export type ElectricalService = {
  slug: string;
  name: string;
  shortName: string;
  seoTitle: string;
  description: string;
  hero: string;
  intro: string[];
  included: string[];
  signs: string[];
  process: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
};

export const ELECTRICAL_SERVICES: Record<string, ElectricalService> = {
  "electrician-consultation": {
    slug: "electrician-consultation",
    name: "Electrician Consultation",
    shortName: "electrician consultation",
    seoTitle: "Electrician Consultation in Bangalore | Numunix",
    description:
      "Book an electrician consultation in Bangalore for a clear assessment of home, office, socket, wiring and power issues before work begins.",
    hero: "Electrician Consultation in Bangalore",
    intro: [
      "When something electrical is not working, it is tempting to replace a switch, reset an MCB or call the first person available. A proper electrician consultation starts by understanding what changed, what is affected and whether there is an immediate safety concern.",
      "Numunix helps homeowners, tenants, shops and offices in Bangalore arrange a practical electrical assessment. Describe the issue, share a photo when it is safe to do so, and our team will help you book the right kind of visit. The electrician checks the affected point, explains the likely cause and discusses the sensible repair or installation path before work starts.",
      "This is especially useful for recurring tripping, old wiring, unexplained power loss, renovation planning or a job where you want a second opinion. Clear information up front means fewer surprises later.",
    ],
    included: [
      "General electrical fault assessment",
      "Home and office visit planning",
      "Safety-first advice for urgent symptoms",
      "Clear explanation of recommended work",
    ],
    signs: [
      "You are unsure which electrical service you need",
      "A problem keeps returning after a quick fix",
      "You are planning a renovation or new appliance",
      "You need an electrician to inspect an older installation",
    ],
    process: [
      {
        title: "Tell us what changed",
        body: "Share the room, appliance or circuit affected, along with any warning signs you noticed.",
      },
      {
        title: "Arrange the right visit",
        body: "We help you choose a suitable appointment based on the work and your location.",
      },
      {
        title: "Understand the recommendation",
        body: "The electrician explains the condition, options and next step in plain language.",
      },
    ],
    faqs: [
      {
        question: "What should I tell the electrician before a visit?",
        answer:
          "Mention the affected room or appliance, when the problem began and whether an MCB trips, lights flicker or a socket feels warm. Photos are helpful only when it is safe to take them.",
      },
      {
        question: "Can you help with a small electrical issue?",
        answer:
          "Yes. A faulty switch, loose socket, fan issue or single light point can be assessed alongside larger home and office electrical work.",
      },
    ],
  },
  "electrical-repairs": {
    slug: "electrical-repairs",
    name: "Electrical Repair & MCB Service",
    shortName: "electrical repair",
    seoTitle: "Electrical Repair & MCB Service in Bangalore | Numunix",
    description:
      "Electrical repair in Bangalore for tripping MCBs, faulty switches, sockets, wiring and circuit issues at homes, offices and shops.",
    hero: "Electrical Repair & MCB Service in Bangalore",
    intro: [
      "A tripping MCB, dead socket or flickering light is more than an inconvenience. It may point to an overloaded circuit, a loose connection, a worn fitting, moisture or a fault in an appliance. The right fix depends on finding the cause rather than repeatedly resetting the power.",
      "Our electrical repair service in Bangalore covers common switchboard, socket, light point, wiring and MCB concerns for homes, offices and shops. The electrician begins with a safety check, isolates the affected area where needed and explains the repair that makes sense for the condition of the installation.",
      "If you notice a burning smell, sparks, heat at a socket or visible damaged wiring, switch off the supply to that point if you can do so safely and keep people away. Do not keep using the circuit until it has been inspected.",
    ],
    included: [
      "MCB and fuse-box fault checks",
      "Socket, switch and light-point repair",
      "Wiring and circuit troubleshooting",
      "Practical advice on overload and appliance-related faults",
    ],
    signs: [
      "The MCB trips repeatedly",
      "A socket, switch or light works intermittently",
      "You notice flickering, buzzing or heat",
      "A room or appliance circuit has lost power",
    ],
    process: [
      {
        title: "Make the area safe",
        body: "We begin with the symptoms and the relevant isolation steps before examining the affected point.",
      },
      {
        title: "Test the likely cause",
        body: "The electrician checks the circuit, fittings and connected load rather than assuming one part is at fault.",
      },
      {
        title: "Repair with clarity",
        body: "You receive a clear explanation of the recommended repair and any part needed.",
      },
    ],
    faqs: [
      {
        question: "Why does my MCB keep tripping?",
        answer:
          "Repeated tripping can be caused by overload, a short circuit, earth leakage, a faulty appliance or an issue within the wiring. An inspection is the safest way to identify the cause.",
      },
      {
        question: "Is a warm socket dangerous?",
        answer:
          "It can be. Stop using it and arrange an inspection, especially if there is discolouration, a burning smell, sparking or a loose plug.",
      },
    ],
  },
  "electrical-installation": {
    slug: "electrical-installation",
    name: "Electrical Installation",
    shortName: "electrical installation",
    seoTitle: "Fan, Light, Socket & Electrical Installation in Bangalore | Numunix",
    description:
      "Electrical installation in Bangalore for fans, lights, sockets, switchboards and appliance wiring at homes, offices and shops.",
    hero: "Fan, Light & Electrical Installation in Bangalore",
    intro: [
      "Good electrical installation is about more than getting a new fan or light to turn on. The fitting, mounting point, wiring condition and circuit capacity all need to suit the job. That matters whether you are replacing one fixture, setting up a new appliance or completing a room renovation.",
      "Numunix arranges electrician support in Bangalore for fan installation, light fitting, socket and switchboard work, appliance wiring and related electrical installation needs. Explain what you are installing and where, and we will help you plan the visit with the right context.",
      "For larger work, it helps to have product details, a rough layout and any existing electrical concerns ready. This gives the electrician a clearer starting point and helps avoid a rushed decision on site.",
    ],
    included: [
      "Ceiling fan installation and replacement",
      "Light fitting and fixture installation",
      "Socket and switchboard installation",
      "Appliance wiring and connection assessment",
    ],
    signs: [
      "You are replacing a fan, light or switchboard",
      "A new appliance needs a suitable electrical point",
      "You are updating a room, shop or office",
      "Existing points do not match the new setup",
    ],
    process: [
      {
        title: "Share the installation details",
        body: "Tell us the product, location and whether an existing point is already available.",
      },
      {
        title: "Check suitability",
        body: "The electrician checks mounting, wiring and circuit requirements before proceeding.",
      },
      {
        title: "Install and test",
        body: "The completed point or fixture is tested and basic use guidance is shared.",
      },
    ],
    faqs: [
      {
        question: "Can you install a ceiling fan where there was no fan before?",
        answer:
          "The electrician can assess the mounting point and electrical provision first, then advise on the required work.",
      },
      {
        question: "Should I buy the light or fan before booking?",
        answer:
          "You can, but share the product details while booking. For an unusual fitting or heavy fixture, checking compatibility first is helpful.",
      },
    ],
  },
  "inverter-ups-service": {
    slug: "inverter-ups-service",
    name: "Inverter & UPS Service",
    shortName: "inverter or UPS service",
    seoTitle: "Inverter & UPS Service in Bangalore | Installation, Check-up & Support | Numunix",
    description:
      "Inverter and UPS service in Bangalore for installation, check-ups, backup-power troubleshooting and safe disconnection support.",
    hero: "Inverter & UPS Service in Bangalore",
    intro: [
      "A backup-power system should be dependable when you need it, not a source of uncertainty during a power cut. If an inverter will not charge, gives poor backup, makes an unusual sound or has been unused for a long time, an inspection can help identify the next sensible step.",
      "Numunix helps arrange inverter and UPS service in Bangalore for installation, check-ups, troubleshooting and uninstallation needs. The visit begins with the setup, load expectations and symptoms you have noticed, then moves to the appropriate inspection and recommendation.",
      "For safety, avoid opening batteries, bypassing connections or adding loads beyond the system's intended capacity. If you can, note the model, battery age and what happens during a power cut before booking.",
    ],
    included: [
      "Inverter and UPS installation support",
      "Backup-power check-up and symptom assessment",
      "Basic connection and load review",
      "Inverter or UPS uninstallation planning",
    ],
    signs: [
      "The inverter is not charging",
      "Backup time has dropped noticeably",
      "The UPS alarms or shuts down unexpectedly",
      "You need to install, relocate or remove a unit",
    ],
    process: [
      {
        title: "Review the setup",
        body: "We start with the unit model, battery details, connected load and symptoms.",
      },
      {
        title: "Inspect safely",
        body: "The electrician checks the relevant connections and condition before suggesting a next step.",
      },
      {
        title: "Plan reliable backup",
        body: "You get clear advice on the repair, installation or maintenance needed.",
      },
    ],
    faqs: [
      {
        question: "Why is my inverter backup time low?",
        answer:
          "Battery condition, connected load, charging performance and age can all affect backup time. A check-up helps identify which factor matters most.",
      },
      {
        question: "Can an inverter support all appliances?",
        answer:
          "Not necessarily. The safe load depends on the inverter rating, battery setup and appliance demand. Discuss the intended load before connecting additional equipment.",
      },
    ],
  },
  "water-motor-service": {
    slug: "water-motor-service",
    name: "Water Motor Service",
    shortName: "water motor service",
    seoTitle: "Water Motor Installation & Repair in Bangalore | Numunix",
    description:
      "Water motor installation and repair support in Bangalore for homes, apartments and shops with pump, power and control concerns.",
    hero: "Water Motor Installation & Repair in Bangalore",
    intro: [
      "A water motor problem can quickly affect an entire home or building routine. A pump that will not start, trips the power, runs without building pressure or makes an unfamiliar noise needs a careful check of both the motor setup and the electrical connection.",
      "Numunix arranges water motor installation and repair support in Bangalore. Tell us whether the issue is no water, no power, frequent tripping, an installation requirement or a noisy pump. This helps us understand the type of visit you need before an electrician arrives.",
      "Do not operate a motor with exposed wiring, a burning smell or repeated tripping. If the motor is in a wet area, avoid touching electrical connections and arrange a professional inspection.",
    ],
    included: [
      "Water motor installation assessment",
      "Pump power and connection troubleshooting",
      "Motor repair visit planning",
      "Guidance for safe operation and next steps",
    ],
    signs: [
      "The water motor will not start",
      "The power trips when the pump runs",
      "Water pressure has dropped",
      "The motor sounds unusually loud or runs continuously",
    ],
    process: [
      {
        title: "Describe the water and power symptoms",
        body: "Tell us what happens when the motor is switched on and whether there are power or pressure changes.",
      },
      {
        title: "Check the electrical side",
        body: "The visit considers the motor connection, control point and relevant power symptoms.",
      },
      {
        title: "Choose the right next step",
        body: "The electrician explains whether repair, installation work or further pump assessment is appropriate.",
      },
    ],
    faqs: [
      {
        question: "Why does my water motor trip the MCB?",
        answer:
          "A tripping MCB may be related to the motor, wiring, starter/control arrangement, moisture or another electrical fault. It should be inspected rather than repeatedly reset.",
      },
      {
        question: "Do you install water motors?",
        answer:
          "Yes, we can arrange an assessment for water motor installation and explain the electrical requirements for the proposed setup.",
      },
    ],
  },
};

export function getElectricalService(slug: string): ElectricalService | undefined {
  return ELECTRICAL_SERVICES[slug];
}

export function getElectricalServiceSlugs(): string[] {
  return Object.keys(ELECTRICAL_SERVICES);
}
