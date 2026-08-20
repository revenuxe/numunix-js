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

type SpecificElectricalServiceInput = Pick<
  ElectricalService,
  "slug" | "name" | "shortName" | "seoTitle" | "description" | "hero" | "intro" | "included" | "signs" | "faqs"
>;

function specificElectricalService(input: SpecificElectricalServiceInput): ElectricalService {
  return {
    ...input,
    process: [
      {
        title: "Share the job details",
        body: "Tell us what you need, where it is located and any symptoms or product details you have noticed.",
      },
      {
        title: "Check the point safely",
        body: "The electrician assesses the relevant fitting, connection or circuit before recommending work.",
      },
      {
        title: "Complete the right next step",
        body: "You receive a clear explanation of the work, testing and any follow-up that is appropriate.",
      },
    ],
  };
}

Object.assign(ELECTRICAL_SERVICES, {
  "repair-maintenance": specificElectricalService({
    slug: "repair-maintenance",
    name: "Electrical Repair & Maintenance",
    shortName: "electrical repair and maintenance",
    seoTitle: "Electrical Repair & Maintenance in Bangalore | Numunix",
    description:
      "Electrical repair and maintenance in Bangalore for wiring, MCBs, sockets, switchboards, lights and recurring power faults.",
    hero: "Electrical Repair & Maintenance in Bangalore",
    intro: [
      "Electrical problems that keep returning need more than a quick reset or replacement. Tripping MCBs, flickering lights, dead sockets and unreliable circuits should be assessed at the source so the repair is suitable for the installation.",
      "Numunix helps homeowners, offices and shops arrange practical electrical repair and maintenance visits. The electrician checks the reported fault, explains the recommended work and helps you decide the appropriate next step before repair begins.",
    ],
    included: [
      "Electrical fault and recurring-issue assessment",
      "Wiring, circuit, socket and switchboard repair planning",
      "MCB and distribution-board checks",
      "Maintenance advice for older electrical installations",
    ],
    signs: [
      "Power trips or faults keep coming back",
      "Sockets, switches or lights work intermittently",
      "A room or circuit has lost power",
      "You need an electrician to inspect an older installation",
    ],
    faqs: [
      {
        question: "What does electrical maintenance include?",
        answer:
          "It can include assessing circuits, sockets, switches, lighting, MCBs and visible wiring concerns, then recommending the repair or preventive work that suits the condition found.",
      },
      {
        question: "Should I keep resetting a tripping MCB?",
        answer:
          "No. Repeated tripping can indicate overload, a faulty appliance, wiring damage or another electrical fault. Arrange an inspection instead.",
      },
    ],
  }),
  "emergency-electrician-consultation": specificElectricalService({
    slug: "emergency-electrician-consultation",
    name: "Emergency Electrician Consultation",
    shortName: "emergency electrician help",
    seoTitle: "Emergency Electrician Consultation in Bangalore | Numunix",
    description: "Emergency electrician consultation in Bangalore for urgent power, tripping, socket, wiring and electrical safety concerns.",
    hero: "Emergency Electrician Consultation in Bangalore",
    intro: ["Electrical warning signs need a calm, safety-first response. If there are sparks, smoke, a burning smell or exposed live wiring, keep clear and switch off power only when it is safe.", "Numunix helps you arrange the appropriate electrician visit for urgent power and wiring concerns. Describe what happened, which area is affected and whether the circuit can be safely isolated."],
    included: ["Urgent electrical symptom assessment", "Advice on safe isolation before the visit", "Power, socket and wiring fault review", "Clear next-step recommendation"],
    signs: ["Burning smell, sparks or a hot socket", "A circuit trips repeatedly", "Sudden loss of power in part of the property", "Visible damaged or exposed wiring"],
    faqs: [{ question: "What should I do before an emergency electrician arrives?", answer: "Keep people away from the affected point and switch off the relevant supply only if it is safe. Do not touch exposed wiring or continue using a hot or sparking socket." }, { question: "Is repeated MCB tripping an emergency?", answer: "It can indicate an electrical fault. Avoid repeatedly resetting it and arrange an inspection, especially if there is heat, smell or visible damage." }],
  }),
  "wiring-circuit-repairs": specificElectricalService({
    slug: "wiring-circuit-repairs", name: "Wiring & Circuit Repairs Consultation", shortName: "wiring and circuit repair", seoTitle: "Wiring & Circuit Repair in Bangalore | Numunix", description: "Wiring and circuit repair consultation in Bangalore for power loss, faulty points, loose connections and recurring electrical faults.", hero: "Wiring & Circuit Repairs in Bangalore",
    intro: ["Faulty wiring can make a room unreliable and unsafe. A circuit that loses power, flickers or works intermittently needs diagnosis at the relevant point rather than a temporary workaround.", "Our electrician assesses the reported symptoms, accessible connections and circuit behaviour before explaining the appropriate repair."],
    included: ["Circuit and point fault assessment", "Loose connection and wiring repair planning", "Power-loss and intermittent-fault checks", "Safety guidance for damaged wiring"], signs: ["Lights or sockets work intermittently", "One room or circuit has no power", "Flickering or buzzing at a point", "A repair keeps failing or returning"], faqs: [{ question: "Can wiring be repaired without rewiring the entire home?", answer: "Often the affected point or circuit can be assessed and repaired directly. The electrician will explain if a wider upgrade is needed." }, { question: "Should I use a faulty socket until it is repaired?", answer: "No. Stop using a socket that is loose, hot, sparking or intermittent until it has been inspected." }],
  }),
  "mcb-fuse-box-service": specificElectricalService({
    slug: "mcb-fuse-box-service", name: "MCB & Fuse Box Repair/Installation Consultation", shortName: "MCB and fuse box service", seoTitle: "MCB & Fuse Box Repair in Bangalore | Numunix", description: "MCB and fuse box repair or installation consultation in Bangalore for tripping breakers, damaged boards and circuit protection concerns.", hero: "MCB & Fuse Box Service in Bangalore",
    intro: ["An MCB is designed to interrupt power when it detects an unsafe condition. Repeated trips should be investigated instead of reset again and again.", "Numunix arranges MCB and fuse-box checks for homes, offices and shops, including repair, replacement and installation planning."],
    included: ["Repeated MCB trip assessment", "Fuse box and distribution-board checks", "MCB replacement or installation planning", "Load and circuit protection guidance"], signs: ["An MCB will not stay on", "A fuse box looks damaged or overheated", "A circuit trips when an appliance runs", "You need a new or upgraded distribution board"], faqs: [{ question: "Why will my MCB not stay on?", answer: "A short circuit, overload, earth leakage or appliance fault may be involved. It needs testing before the breaker is reset." }, { question: "Can I replace an MCB myself?", answer: "Electrical protection devices should be selected and installed by a qualified electrician after the circuit has been assessed." }],
  }),
  "inverter-installation": specificElectricalService({
    slug: "inverter-installation", name: "Inverter Installation", shortName: "inverter installation", seoTitle: "Inverter Installation in Bangalore | Numunix", description: "Inverter installation in Bangalore with setup, connection, load and backup-power guidance for homes and offices.", hero: "Inverter Installation in Bangalore",
    intro: ["A well-planned inverter installation considers the intended backup load, battery arrangement, ventilation and safe electrical connection.", "Share your inverter and battery details, the appliances you want to support and the available installation space so the visit can be planned properly."],
    included: ["Inverter and battery setup assessment", "Safe connection and placement review", "Backup-load planning", "Basic operation and testing guidance"], signs: ["You are installing a new inverter", "You need backup for selected appliances", "An existing setup is being relocated", "You are unsure about battery or load requirements"], faqs: [{ question: "Can an inverter run every appliance at home?", answer: "That depends on its rating, battery setup and appliance load. The intended backup circuits should be discussed before installation." }, { question: "Where should an inverter be installed?", answer: "It needs a suitable, ventilated location with safe access and an appropriate electrical connection." }],
  }),
  "inverter-uninstallation": specificElectricalService({
    slug: "inverter-uninstallation", name: "Inverter Uninstallation", shortName: "inverter uninstallation", seoTitle: "Inverter Uninstallation in Bangalore | Numunix", description: "Inverter uninstallation in Bangalore for safe removal, relocation and disconnection of inverter and UPS systems.", hero: "Inverter Uninstallation in Bangalore",
    intro: ["Removing an inverter means disconnecting backup power, batteries and connected circuits safely. It is particularly important not to leave loose conductors or an incomplete backup circuit behind.", "Numunix helps arrange an electrician visit for planned inverter or UPS removal and relocation."],
    included: ["Safe inverter and battery disconnection", "Relocation and removal planning", "Connected-point review", "Advice on storage or reinstallation"], signs: ["You are moving home or office", "An old inverter is no longer needed", "The unit must be relocated", "You are replacing the backup system"], faqs: [{ question: "Can I disconnect an inverter myself?", answer: "Because the system involves batteries and mains connections, professional disconnection is the safer option." }, { question: "Can a removed inverter be installed elsewhere?", answer: "Usually, subject to its condition and the electrical requirements at the new location." }],
  }),
  "inverter-check-up": specificElectricalService({
    slug: "inverter-check-up", name: "Inverter Check Up", shortName: "inverter check-up", seoTitle: "Inverter Check Up in Bangalore | Numunix", description: "Inverter check-up in Bangalore for poor backup, charging issues, alarms, battery concerns and unreliable UPS performance.", hero: "Inverter Check Up in Bangalore",
    intro: ["Poor backup time, alarm sounds or charging concerns can come from battery condition, load, cabling or the inverter itself. A check-up helps identify the most likely cause.", "Let us know the model, battery age and what happens during a power cut to give the electrician a useful starting point."],
    included: ["Charging and backup symptom review", "Basic battery and connection checks", "Load and alarm assessment", "Maintenance and repair recommendation"], signs: ["Backup time has reduced", "The inverter is not charging", "The UPS alarms or shuts down", "You have not serviced the system recently"], faqs: [{ question: "Why has my inverter backup time dropped?", answer: "Battery health, load, charging performance and age all affect backup time. A check-up can identify the relevant factor." }, { question: "How often should an inverter be checked?", answer: "The suitable interval depends on use and battery type; arrange a check when backup changes or warning signs appear." }],
  }),
  "water-motor-installation-repair": specificElectricalService({
    slug: "water-motor-installation-repair", name: "Water Motor Installation & Repair Consultation", shortName: "water motor installation or repair", seoTitle: "Water Motor Installation & Repair in Bangalore | Numunix", description: "Water motor installation and repair consultation in Bangalore for pumps that do not start, trip power, lose pressure or need safe connection work.", hero: "Water Motor Installation & Repair in Bangalore",
    intro: ["A motor that will not start, trips the power or runs without pressure needs a careful check of the pump setup and electrical connection.", "Tell us whether the concern is installation, no water, a power trip or unusual noise, and avoid touching connections in a wet area."],
    included: ["Pump connection and power symptom assessment", "Water motor installation planning", "Starter and control-point review", "Safe next-step guidance"], signs: ["The pump will not start", "The MCB trips when it runs", "Water pressure has dropped", "The motor is noisy or runs continuously"], faqs: [{ question: "Why does a water motor trip the MCB?", answer: "The motor, control equipment, wiring or moisture may be involved. It should be inspected rather than repeatedly reset." }, { question: "Do you help install new water motors?", answer: "Yes. The electrician can assess the electrical requirements and proposed setup before installation." }],
  }),
  "socket-switchboard-service": specificElectricalService({
    slug: "socket-switchboard-service", name: "Socket & Switchboard Repair/Installation Consultation", shortName: "socket and switchboard service", seoTitle: "Socket & Switchboard Repair in Bangalore | Numunix", description: "Socket and switchboard repair or installation consultation in Bangalore for loose, damaged, non-working or upgraded electrical points.", hero: "Socket & Switchboard Service in Bangalore",
    intro: ["A loose, warm or unreliable socket should not be ignored. The fitting, connection and circuit need to be assessed before repair or replacement.", "We arrange support for individual sockets, switches and switchboards, whether you are fixing a fault or updating a room."],
    included: ["Socket and switch fault assessment", "Switchboard repair or replacement planning", "New point installation assessment", "Safe-use guidance"], signs: ["A socket is loose, warm or not working", "A switch sparks or works intermittently", "You need additional electrical points", "An old switchboard needs replacement"], faqs: [{ question: "Is a loose socket dangerous?", answer: "It can be. Stop using it and arrange an inspection, especially if it is hot, discoloured or sparking." }, { question: "Can a new socket be installed in any location?", answer: "The electrician will check the available wiring, circuit capacity and the location before advising." }],
  }),
  "fan-installation-repair": specificElectricalService({
    slug: "fan-installation-repair", name: "Fan Installation & Repair Consultation", shortName: "fan installation or repair", seoTitle: "Fan Installation & Repair in Bangalore | Numunix", description: "Fan installation and repair consultation in Bangalore for ceiling fans, exhaust fans, regulators, noise, wobble and non-working units.", hero: "Fan Installation & Repair in Bangalore",
    intro: ["A ceiling fan should be securely mounted, correctly connected and stable in use. Noise, wobble, slow speed or a fan that will not start can point to a fitting, regulator or electrical issue.", "Numunix helps arrange the right electrician visit for fan installation, replacement and fault checks."],
    included: ["Ceiling and exhaust fan installation", "Fan, regulator and point checks", "Wobble and noise assessment", "Replacement and mounting guidance"], signs: ["A fan will not start or runs slowly", "The fan wobbles or makes unusual noise", "You are replacing a ceiling fan", "A regulator is not working properly"], faqs: [{ question: "Can you replace an old ceiling fan?", answer: "Yes. The electrician checks the existing mounting and connection before replacement." }, { question: "Why is my fan wobbling?", answer: "Blade balance, mounting, fasteners or the fan assembly may be responsible and should be checked safely." }],
  }),
  "light-installation-repair": specificElectricalService({
    slug: "light-installation-repair", name: "Light Installation & Repair Consultation", shortName: "light installation or repair", seoTitle: "Light Installation & Repair in Bangalore | Numunix", description: "Light installation and repair consultation in Bangalore for ceiling lights, fixtures, LED fittings, dimming, flickering and non-working points.", hero: "Light Installation & Repair in Bangalore",
    intro: ["A new light fitting needs the right mounting and connection, while flickering or failed lights can have causes beyond the bulb itself.", "Describe the fixture, location and symptom so the electrician can assess whether the issue is the light, switch, driver or electrical point."],
    included: ["Light fitting and fixture installation", "Flickering and non-working light checks", "LED driver and point assessment", "Mounting and replacement guidance"], signs: ["A light flickers or will not turn on", "You are installing a new fixture", "A dimmer or switch is unreliable", "A ceiling light needs replacement"], faqs: [{ question: "Why does an LED light flicker?", answer: "The lamp, driver, dimmer, switch or connection may be involved. An inspection can identify the cause." }, { question: "Can heavy light fixtures be installed?", answer: "The mounting point and fixture requirements should be checked first so the installation is secure." }],
  }),
  "appliance-wiring-installation": specificElectricalService({
    slug: "appliance-wiring-installation", name: "Appliance Wiring & Installation Consultation", shortName: "appliance wiring and installation", seoTitle: "Appliance Wiring & Installation in Bangalore | Numunix", description: "Appliance wiring and installation consultation in Bangalore for suitable power points, safe connections and electrical load assessment.", hero: "Appliance Wiring & Installation in Bangalore",
    intro: ["Large and fixed appliances need a suitable electrical point, safe connection and sufficient circuit capacity. Connecting them casually can lead to tripping, heat or damage.", "Numunix helps arrange assessment and installation support for appliance wiring at homes, offices and shops."],
    included: ["Appliance point and load assessment", "Dedicated circuit and connection planning", "Safe wiring installation support", "Testing and operating guidance"], signs: ["A new appliance needs a power point", "An appliance trips the circuit", "You are renovating a kitchen or office", "The existing socket does not suit the appliance"], faqs: [{ question: "Does every appliance need a dedicated socket?", answer: "It depends on the appliance load and existing circuit. The electrician can advise on the appropriate setup." }, { question: "Can an appliance be connected to an extension board?", answer: "High-load or fixed appliances often need a proper rated point rather than an extension board. Have the setup assessed first." }],
  }),
});

export function getElectricalService(slug: string): ElectricalService | undefined {
  return ELECTRICAL_SERVICES[slug];
}

export function getElectricalServiceSlugs(): string[] {
  return Object.keys(ELECTRICAL_SERVICES);
}
