export type RepairExplainer = {
  title: string;
  question: string;
  paragraphs: string[];
  takeaway: string;
};

// Shared technical guidance is explicitly service-level, not a claim about brand-wide failure rates.
const SERVICE_EXPLAINERS: Record<string, RepairExplainer[]> = {
  "Mobile Repair": [
    {
      title: "Display assembly or a wider repair?",
      question: "A cracked screen, a black image and failed touch are different observations.",
      paragraphs: [
        "The display surface, image panel, touch response and surrounding frame need to be considered together. A phone that rings with a black screen presents a different starting point from one that shows an image but ignores touch. Describe the functions that still respond without repeatedly pressing damaged glass.",
        "Ask whether the estimate covers the display assembly alone or also identified frame, connector or other damage. The proposed part should be matched to the exact handset variant. Brightness, biometric functions and part-related messages may need separate discussion depending on the model and replacement specification.",
      ],
      takeaway: "Approve a defined part specification and the relevant function checks, not simply a price for a screen.",
    },
    {
      title: "Battery replacement or charging repair?",
      question: "A low percentage does not tell you which charging component has failed.",
      paragraphs: [
        "Short runtime, a loose connection and a phone that never indicates charging should be reported separately. Cable and adapter condition, connector damage, battery behaviour and internal power faults can lead to different repair scopes. Tell the assessor whether the issue occurs at a particular connection or during ordinary use.",
        "An assessment should explain the observations supporting a battery, connector or internal repair before replacement is agreed. Visible swelling, unusual heat or liquid exposure changes the safety priority: stop charging or using the device and do not open, press or puncture it to collect more evidence.",
      ],
      takeaway: "Ask what the proposed work addresses: connection stability, charging response, runtime or another identified fault.",
    },
    {
      title: "Phone repair and data recovery",
      question: "Restoring operation and retrieving inaccessible files are separate requests.",
      paragraphs: [
        "A repair enquiry should say whether accessible files are backed up and whether keeping local data is a priority. A reset, storage change or board replacement can have different consequences from a screen repair. Diagnosis is not blanket permission to erase the phone or change account access.",
        "Request an explanation of data-impacting steps before approval and record any agreed limits. Do not include passwords, OTPs or recovery codes in a form or message. At collection, review your own files and accounts privately; startup alone does not establish that all data remains available.",
      ],
      takeaway: "Make data preservation an explicit condition before software or internal work is authorized.",
    },
  ],
  "Laptop Repair": [
    {
      title: "Blank display or a startup fault?",
      question: "Power indicators, an image and a completed startup answer different questions.",
      paragraphs: [
        "A laptop with a power light and a blank built-in screen needs a different assessment from one that shows no response or stops at a startup message. Report lights, fan behaviour and visible messages separately. If a dock or external screen is normally connected, include it in the history without assuming it establishes the cause.",
        "Ask whether the proposed scope concerns the screen assembly, power path, storage or another identified component. A replacement should follow model-specific findings, not a diagnosis inferred solely from a blank screen. Discuss files and backup status before any operating-system or storage work is proposed.",
      ],
      takeaway: "Keep power response, display response and startup progress separate in your enquiry.",
    },
    {
      title: "Charging, battery and adapter scope",
      question: "Running on an adapter is not the same as charging the battery.",
      paragraphs: [
        "Identify the adapter used, any charging warning and whether the laptop works on battery power, adapter power or both. A dock, cable, connector or battery condition may change the assessment. The full model and appropriate power specification matter before accessories or internal parts are approved.",
        "Ask whether the post-repair check covers charging indication only or also the reported runtime complaint. A battery that is recognized by the operating system is not by itself proof of useful runtime. A raised case or trackpad may need safety assessment; do not press it down or continue charging a swollen device.",
      ],
      takeaway: "Have the estimate distinguish the charging fault from any separate battery-runtime concern.",
    },
    {
      title: "Hinges, cooling and connected damage",
      question: "Visible damage or noise may involve more than the obvious component.",
      paragraphs: [
        "A lifting hinge can affect mounting points, the enclosure and the display cable. Report where the casing separates rather than repeatedly opening a damaged lid. Ask whether the repair includes the supporting structure and what cosmetic or functional limits will remain.",
        "For fan noise or shutdowns, describe the normal task underway and any warning. Cooling assessment can involve airflow and fan operation, but noise alone does not identify the remedy. Do not run repeated demanding tasks to reproduce overheating; agree suitable checks and any cleaning or replacement scope first.",
      ],
      takeaway: "Request a scope that addresses the identified structural or cooling problem, not only the visible symptom.",
    },
  ],
  "CCTV Installation & Repair": [
    {
      title: "Local image or remote-view trouble?",
      question: "A camera visible on the recorder can still be unavailable in an app.",
      paragraphs: [
        "Report local monitor viewing, recorded playback and remote access separately. If only remote viewing fails, the camera may still be producing and recording images. Describe the app notification and any recent router or connection change without exposing device QR labels or credentials.",
        "Ask which part of the viewing path the proposed work addresses. Connection settings, authorized account access and the recorder or camera configuration may need different checks. Resetting a device is not a harmless first step when existing settings or recordings matter.",
      ],
      takeaway: "State where the picture is missing and whether local recording continues.",
    },
    {
      title: "Live video does not establish recording",
      question: "A working live image and usable stored footage are separate functions.",
      paragraphs: [
        "If playback is missing, note the affected channels, date range and any storage warning already visible. Schedules, timestamps, recording settings and storage condition may need assessment. A playback gap alone is not proof that a storage drive has failed.",
        "Discuss important footage before formatting, replacing storage or resetting the recorder. Confirm whether the agreed work concerns future recording, retrieving existing footage or both. After work, ask which new recording and playback checks were performed and which limitations remain.",
      ],
      takeaway: "Preserve the recording priority in the scope before changes that may overwrite or remove footage.",
    },
    {
      title: "One camera or a shared outage?",
      question: "Several blank channels may share a connection or power problem.",
      paragraphs: [
        "Identify which cameras failed together, whether other channels work and whether the recorder stays running. Mention any shared cable route, network switch or supply if known. Describe high camera positions and restricted cable routes without climbing or opening electrical covers.",
        "For replacement equipment, confirm the camera and recorder models, connection type and compatible recording features. A brand match alone does not establish compatibility in a mixed installation. Agree site access and any interruption with the authorized system contact before work begins.",
      ],
      takeaway: "Approve replacement only after the affected signal, power or recording path is explained.",
    },
  ],
  "AC Service & Repair": [
    {
      title: "Servicing, cooling repair or refrigerant work?",
      question: "Reduced cooling does not automatically call for a gas refill.",
      paragraphs: [
        "Describe airflow, selected mode, temperature setting and whether cooling changed suddenly or gradually. Cleaning accessible areas, investigating a control fault and sealed cooling-system work are different scopes. A routine service should not be presented as proof that every cooling complaint will be resolved.",
        "Ask what findings support any refrigerant or compressor work, and whether the proposal addresses an identified leak or another diagnosed problem. Agree the full work and relevant checks first. Do not open pipework, electrical covers or the outdoor unit yourself.",
      ],
      takeaway: "Request the diagnosis behind the proposed cooling work rather than booking a refill from the symptom alone.",
    },
    {
      title: "Indoor water and installation access",
      question: "The leak location and recent work help define the visit.",
      paragraphs: [
        "Note where dripping begins, how long the unit has been running and whether the problem followed installation, relocation or servicing. Drainage, installation conditions and operating behaviour can require different checks. Stop use if water reaches electrical connections.",
        "For a split AC, describe outdoor-unit access from a safe position. Confirm building restrictions, any access equipment and what the assessment charge includes before a visit is agreed. Do not climb, lean out or move covers simply to provide a photograph.",
      ],
      takeaway: "Keep the leak assessment and safe-access arrangements explicit in the booking.",
    },
    {
      title: "Control messages and recurring shutdowns",
      question: "A shortened error description can lose important model context.",
      paragraphs: [
        "Record the complete unit warning and identify separate app or remote notifications. State the mode, how long the AC ran and whether airflow changed before it stopped. The full indoor-unit model and system type are needed before interpreting documentation or discussing parts.",
        "Avoid repeatedly restarting a unit that returns to the same fault. Ask which observations support a sensor, control or power-related proposal and how the affected function will be reviewed. If an intermittent fault cannot be reproduced, have that limitation recorded.",
      ],
      takeaway: "Keep appliance behaviour alongside the message; a warning is not a replacement-parts order.",
    },
  ],
  "Refrigerator Repair": [
    {
      title: "Which compartment stopped cooling?",
      question: "A warm fresh-food section and a warm freezer can require different checks.",
      paragraphs: [
        "Describe each compartment separately, including the intended mode where configurable sections are fitted. Record settings, alarms and whether the change followed a move, power interruption or earlier work. Running sounds alone do not identify a failed compressor.",
        "Ask whether the proposal addresses airflow, controls, door condition or an identified cooling-system fault. Compressor or refrigerant work should be explained through findings rather than assumed from a warm cabinet. Confirm suitable cooling observation guidance for the actual model after work.",
      ],
      takeaway: "Report the affected compartment and settings before discussing cooling-system replacement.",
    },
    {
      title: "Recurring ice, water or door trouble",
      question: "The location and timing of a buildup are more useful than its size alone.",
      paragraphs: [
        "Note where ice or water first appears and how quickly it returns after any earlier intervention. Describe whether doors close normally and include the history of defrosting or prior repair. A visible buildup does not by itself identify a sensor, drain or defrost component.",
        "Do not scrape ice with sharp tools, remove internal panels or reach behind a connected fridge to locate a leak. Ask which checks support the proposed work and what recurrence to watch for afterward. Water near electrical connections or a burning smell requires stopping use safely.",
      ],
      takeaway: "Keep the buildup location and previous work in the diagnosis, not just a request for a new part.",
    },
    {
      title: "Repair scope for fitted features",
      question: "General cooling does not establish that a dispenser or ice maker works.",
      paragraphs: [
        "Where fitted, identify ice-making, water dispensing, connected controls and compartment modes separately from the main cooling complaint. Features vary by model; the full appliance identity and the affected function matter more than a badge on the front.",
        "Ask whether those functions are included in the estimate and the completed checks. Mention cabinet fitting and access restrictions before arranging assessment. Keep any untested feature or remaining limitation in the work record rather than treating startup as a complete repair result.",
      ],
      takeaway: "Agree which fitted features are within the job and which need a separate assessment.",
    },
  ],
  "Washing Machine Repair": [
    {
      title: "Drainage or a failed spin stage?",
      question: "Clothes left wet do not automatically mean a failed motor.",
      paragraphs: [
        "State whether water remains in the drum, whether it drained before spinning and whether the drum moved during washing. A drain restriction, load behaviour and a drive-related fault can present different observations. On a twin-tub machine, describe wash and spin operation independently.",
        "Ask what findings support pump, motor or another replacement for the exact model. A complete display message can help establish context but should not become a parts order. Do not force a locked door or reach into a moving tub to investigate.",
      ],
      takeaway: "Keep retained water and wet clothes after drainage separate in the enquiry.",
    },
    {
      title: "Leaks, noise and installation history",
      question: "When the symptom appears helps establish the assessment scope.",
      paragraphs: [
        "For a leak, note whether water first appears during filling, washing or draining and where it is visible. For movement or noise, distinguish slow drum rotation from higher-speed spinning. Mention recent installation, moving, detergent changes and earlier work without treating the timing as proof of a cause.",
        "The assessment may need to consider the appliance condition and accessible installation before internal work is proposed. Do not pull out a heavy washer alone or remove plumbing for a booking. Stop use if water is near electrics or there is a burning smell or electrical trip.",
      ],
      takeaway: "Give the programme stage and installation history before selecting a seal, bearing or other part.",
    },
    {
      title: "Door, programme and drying scope",
      question: "A successful wash does not establish that every fitted function works.",
      paragraphs: [
        "Describe the selected programme, stage of interruption and full display message. A door that stays locked needs the water and programme state considered alongside the locking mechanism. For a washer-dryer, say whether the complaint concerns washing, retained water before spinning or damp clothes after drying.",
        "Ask which wash, drain, spin and fitted drying checks are included in the estimate and handover. Follow the exact model's guidance for normal door release and user care; do not force the handle or apply a reset procedure from a different appliance.",
      ],
      takeaway: "Approve the relevant programme or fitted-function scope instead of assuming a general cycle check covers it all.",
    },
  ],
};

const IPHONE_EXPLAINERS: RepairExplainer[] = [
  {
    title: "iPhone display specification and feature checks",
    question: "A screen quotation should describe more than the visible glass.",
    paragraphs: [
      "Share the iPhone generation and distinguish cracked glass, a black image, lines and unresponsive touch. Mention whether front-camera, call-audio and biometric functions responded before the damage. These observations help frame the assessment without assuming all affected functions belong to the same replacement assembly.",
      "Ask which display specification is proposed and which brightness, touch, sensing and biometric checks apply to your model. Discuss any part-related message or feature limitation before installation. Do not assume a third-party repair has the same parts, procedures or terms as Apple-authorized service.",
    ],
    takeaway: "Keep the approved display specification and any agreed functionality limitations with the repair record.",
  },
  {
    title: "iPhone charging and battery assessment",
    question: "Charging connection, startup and useful battery runtime are separate concerns.",
    paragraphs: [
      "Identify the iPhone model, connection type and accessory used. Explain whether a charging indicator appears, the connection needs an unusual angle, or the phone starts but loses charge during ordinary use. An accessory, connector, battery or internal power issue may require different checks.",
      "Ask what evidence supports the proposed repair and whether the agreed review includes charging response, the reported runtime change or both. Visible swelling, unusual heat or liquid exposure is a reason to stop use and charging, not to keep testing. Never insert metal tools into the connection.",
    ],
    takeaway: "Do not approve a battery or charging-port replacement from the displayed percentage alone.",
  },
  {
    title: "iPhone backup, account access and repair approval",
    question: "Apple Account access and local data need their own approval boundaries.",
    paragraphs: [
      "Back up accessible data where possible and state clearly if the backup is incomplete. Ask whether any proposed reset, software restoration or board-related work can affect stored files or require account reactivation. Phone repair is not a guarantee that inaccessible data can be recovered.",
      "Keep your passcode, Apple Account password, recovery information and verification codes out of booking forms and WhatsApp messages. Discuss supervised testing where access is needed. Check Apple or your protection provider's current terms before choosing independent work on a covered device.",
    ],
    takeaway: "Authorize data-impacting steps separately and review your own files and account access privately at collection.",
  },
];

export function brandRepairExplainers(service: string, slug: string): RepairExplainer[] {
  const cards = service === "Mobile Repair" && slug === "apple" ? IPHONE_EXPLAINERS : SERVICE_EXPLAINERS[service];
  if (!cards) throw new Error(`Missing repair explainers for ${service}`);
  return cards;
}