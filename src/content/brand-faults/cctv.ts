import type { BrandSymptomCopy } from "./types";

export const CCTV_SYMPTOMS: BrandSymptomCopy = {
  hikvision: [
    [
      "One channel shows no video locally and remotely",
      "Identify the Hikvision recorder and missing channel, plus whether other channels work. The same gap in both views helps describe the signal-path complaint without choosing a camera replacement.",
    ],
    [
      "Live view works but one period is missing",
      "For your Hikvision system, specify the channel and affected dates. Tell the assessor about important footage before any storage initialization or recording change is proposed.",
    ],
    [
      "The app reports offline but the monitor works",
      "Name the Hikvision viewing app and recent router changes. Keep credentials, device QR codes and verification details private when describing the remote-only fault.",
    ],
    [
      "One camera becomes unclear after dark",
      "Describe the Hikvision channel's day and night results separately. Note glare or visible obstruction from ground level without climbing to inspect the installed camera.",
    ],
    [
      "Every channel drops during a recorder restart",
      "Record the Hikvision restart timing and any visible warning. Explain whether recording interruptions accompany the loss of live images before power or storage work is agreed.",
    ],
    [
      "A replaced camera no longer appears",
      "List the Hikvision recorder model and replacement camera model separately. Include the connection type if known so compatibility can be checked rather than inferred from matching connectors.",
    ],
  ],
  dahua: [
    [
      "Several images disappear after a system change",
      "For the Dahua installation, identify affected channels and any recent cable, power or network work. Include other camera brands so the enquiry describes the full connection path.",
    ],
    [
      "Yesterday's recordings cannot be found",
      "Send the Dahua recorder model, missing date range and visible storage warning. Preserve existing footage priorities before anyone formats, resets or replaces storage.",
    ],
    [
      "Remote access changes after router work",
      "Explain whether Dahua local viewing and playback still work and which users lose access. Account and network changes should be distinguished from camera failure.",
    ],
    [
      "A picture becomes intermittent or hazy",
      "Identify the Dahua channel and whether the change follows darkness, rain or cleaning. Describe enclosure condition from a safe position rather than opening the camera.",
    ],
    [
      "The recorder restarts while cameras remain powered",
      "Note Dahua uptime, warning messages and whether the cameras appear to lose power too. A rebooting recorder does not by itself establish a failed recording drive.",
    ],
    [
      "Mixed cameras behave differently on one recorder",
      "List the Dahua recorder and each affected camera model. Explain which functions worked before the change so the assessment can address compatibility and configuration separately.",
    ],
  ],
  "cp-plus": [
    [
      "A group of cameras goes blank together",
      "Identify the CP Plus channels and any shared supply, cable route or switch already known. Shared symptoms should be assessed before replacing each camera individually.",
    ],
    [
      "Recording stops on only part of the system",
      "For the CP Plus recorder, distinguish affected playback channels from working live images. Include the missing period and important-footage requirements without attempting a drive reset.",
    ],
    [
      "Remote viewing fails while the local monitor stays clear",
      "Name the CP Plus viewing method and recent internet or app changes. Explain whether one user or all users are affected, keeping account details out of the enquiry.",
    ],
    [
      "One channel loses clarity at night",
      "Compare that CP Plus channel with others at the same time. Describe glare, visible weather effects or changed positioning safely, without assuming a replacement lens or camera.",
    ],
    [
      "Cameras and recorder stop at different times",
      "Record whether the CP Plus recorder remains running when the affected camera group drops. The sequence helps scope a shared-power complaint separately from a recorder shutdown.",
    ],
    [
      "An installation change affects channel compatibility",
      "Send the CP Plus recorder model, camera count and newly fitted camera details. Confirm the required signal and power compatibility before another installation change is approved.",
    ],
  ],
  godrej: [
    [
      "An image disappears intermittently",
      "Identify the Godrej camera or recorder model and whether the gap affects one device or the whole installation. Include other brands where the system is mixed.",
    ],
    [
      "Playback differs from the live picture",
      "For your Godrej setup, explain which viewing method shows the gap and the affected time range. Recording assessment and any separate footage recovery need explicit agreement.",
    ],
    [
      "One viewing method stops working",
      "Describe whether Godrej footage remains available locally while an app or workstation fails. Confirm the installation's actual viewing arrangement before a network change is proposed.",
    ],
    [
      "A clear daytime view becomes hazy at night",
      "Mention the Godrej camera location, visible glare and when the haze begins. Do not climb to clean, move or open the enclosure for the booking.",
    ],
    [
      "The system loses power after building work",
      "Keep the Godrej device models with the work timeline and affected equipment list. Leave installed power connections untouched and coordinate access with the responsible site contact.",
    ],
    [
      "A camera replacement changes the available functions",
      "List the Godrej device and connected recorder models. Clarify what worked before replacement so the assessor can check the actual combination instead of assuming universal compatibility.",
    ],
  ],
  honeywell: [
    [
      "A camera is missing from one workstation",
      "Explain whether the Honeywell image remains visible at the recorder or another station. Nominate the authorized IT or building contact before management-software changes are discussed.",
    ],
    [
      "Recording is missing from a managed system",
      "Identify the Honeywell recorder or software involved and the affected channels and period. Coordinate preservation requirements with the system owner before modifying storage or retention settings.",
    ],
    [
      "Viewing fails after an approved network change",
      "Include the Honeywell system models and change timeline without sharing network secrets. Distinguish one workstation's access from a loss of images across the installation.",
    ],
    [
      "Image quality differs between viewing stations",
      "Describe the Honeywell camera's local and workstation views separately. A difference between screens needs assessment of the viewing path before a camera replacement is selected.",
    ],
    [
      "A recorder interruption affects a shared building",
      "State the Honeywell restart interval and which monitoring functions are interrupted. Agree access and downtime with the responsible contact before power or recorder work begins.",
    ],
    [
      "Mixed equipment needs a compatibility review",
      "List Honeywell cameras, recorder and management software alongside other brands. Confirm assessment scope with the authorized system contact rather than assuming every integration can be retained.",
    ],
  ],
  axis: [
    [
      "A network camera disappears from the usual view",
      "Share the Axis model and whether other cameras remain available. Identify the known viewing or recording system without supplying passwords, addresses containing secrets or account tokens.",
    ],
    [
      "Live images exist but the recording path is unclear",
      "For your Axis installation, identify where recording is expected to be stored. Confirm whether the enquiry concerns the camera, recorder or management system before storage work is agreed.",
    ],
    [
      "Camera access changes after network work",
      "Describe the Axis access failure and the authorized network change. Coordinate with the system owner; do not reset the camera solely to make it discoverable again.",
    ],
    [
      "Day and night images differ unexpectedly",
      "Note the Axis model and conditions when the image changes. Describe visible obstruction or reflections safely, leaving mounted equipment and its settings untouched for assessment.",
    ],
    [
      "Several cameras stop on the same connection route",
      "Explain any shared Axis network or power path already documented. Let the authorized contact confirm topology rather than disconnecting installed cabling to test it.",
    ],
    [
      "A camera and recording platform no longer work together",
      "List the Axis model and recording platform separately with the recent change. Ask what compatibility checks are possible before replacement hardware or configuration work is authorized.",
    ],
  ],
  "tp-link": [
    [
      "A camera image is missing from its normal app",
      "Provide the exact TP-Link camera model and app name shown on your device. Identify the product rather than assuming all cameras under the brand use the same viewing arrangement.",
    ],
    [
      "Expected recordings are absent",
      "For your TP-Link camera, state the recording method actually in use and the missing period. Do not remove, initialize or overwrite storage when existing footage matters.",
    ],
    [
      "Remote viewing changes after Wi-Fi or router work",
      "Describe TP-Link local and remote behaviour after the change. Keep Wi-Fi passwords and device verification details private and follow the owner's authorized recovery process.",
    ],
    [
      "The image becomes unclear in one lighting condition",
      "Explain whether the TP-Link view changes only at night or behind reflective surfaces. Include placement information without climbing or moving a fixed camera to demonstrate it.",
    ],
    [
      "The camera repeatedly disconnects or restarts",
      "Note the TP-Link model, visible indicators and connection timeline. Distinguish a lost app connection from an observed device restart before power parts are selected.",
    ],
    [
      "A recorder or accessory does not recognize the camera",
      "List the TP-Link camera and connected equipment models. Confirm the actual supported arrangement rather than assuming every camera can join any recorder or app.",
    ],
  ],
  ezviz: [
    [
      "One camera is offline while others remain visible",
      "Identify the EZVIZ model and whether the issue appears for every authorized viewer. Include recent power or router changes without sharing the camera's verification details.",
    ],
    [
      "A recording period is missing in the app",
      "Describe the EZVIZ recording method and dates affected. A missing clip does not establish failed storage; discuss existing footage before resets or initialization.",
    ],
    [
      "A new phone cannot access the existing camera",
      "Keep EZVIZ account ownership and device-transfer questions separate from hardware repair. The authorized owner should follow the appropriate support process without sending passwords or verification codes.",
    ],
    [
      "Night images differ from the daytime view",
      "For the EZVIZ camera, describe reflections, obstruction and any location change. Keep installed equipment in place while assessment establishes the relevant image-quality checks.",
    ],
    [
      "Indicators change before the connection drops",
      "Record the EZVIZ indicator sequence and whether the camera visibly restarts. Include the power setup already documented rather than repeatedly disconnecting it for testing.",
    ],
    [
      "A changed setup affects viewing and recording differently",
      "Explain the EZVIZ installation before and after the change and list connected equipment. Confirm which features and recording arrangements the assessment covers.",
    ],
  ],
  trueview: [
    [
      "A model-specific camera loses its live view",
      "Send the Trueview camera model and viewing method, not only the front logo. Describe whether one device or the whole installation is missing from view.",
    ],
    [
      "Playback cannot be found where expected",
      "Identify the Trueview recording arrangement from your own setup and the affected period. Discuss important footage before changing storage or assuming the camera records by itself.",
    ],
    [
      "Viewing fails after a connection change",
      "For your Trueview setup, mention the app, network change and any local view that still works. Keep account credentials and device labels containing access information private.",
    ],
    [
      "The picture changes with placement or lighting",
      "Describe the Trueview view before and after the change and any visible obstruction. Do not climb or open the camera to inspect image components.",
    ],
    [
      "The device becomes unavailable at intervals",
      "Note the Trueview operating interval and any indicator change already observed. A connection drop and a full restart should be reported separately to scope the checks.",
    ],
    [
      "Additional equipment is not recognized",
      "List the Trueview model and the recorder, accessory or viewing platform involved. Model compatibility must be confirmed before assuming the new arrangement can support every previous function.",
    ],
  ],
  secureye: [
    [
      "A channel disappears from a mixed installation",
      "Identify the Secureye camera and recorder models separately and list other brands involved. Explain where the image is missing so assessment follows the actual signal path.",
    ],
    [
      "The recorder shows live view without expected footage",
      "Give the Secureye recording dates, channels and complete storage warning. Ask about preservation before formatting or replacing a drive that may contain important recordings.",
    ],
    [
      "Remote access fails for one authorized viewer",
      "Describe the Secureye local view and whether other users retain access. Keep owner verification separate from repair assessment and avoid sending QR labels or credentials.",
    ],
    [
      "An installed camera has a degraded view",
      "For the Secureye channel, describe changes after rain, darkness or site work. Provide location details safely without reaching the enclosure or installed power connections.",
    ],
    [
      "A recorder reset interrupts several channels",
      "Note the Secureye restart timeline and whether camera indicators change too. Shared symptoms need checks before individual cameras, power equipment or storage are replaced.",
    ],
    [
      "A replacement works differently from the original",
      "Keep the Secureye old and new device specifications with the recorder model. Describe the missing function so compatibility and installation issues can be reviewed separately.",
    ],
  ],
  prama: [
    [
      "A local channel is missing after earlier work",
      "Share the Prama recorder model, affected camera models and the work timeline. Describe the local monitor and remote view separately before another camera is proposed.",
    ],
    [
      "Recordings stop after a configuration change",
      "For the Prama installation, note the affected period and channels and any known change. Preserve footage priorities before recording settings, storage or the recorder are reset.",
    ],
    [
      "Remote viewing no longer follows the local image",
      "Identify the Prama viewing method and whether local playback remains available. Explain router or account changes through the authorized owner without including access credentials.",
    ],
    [
      "Image quality changes on one part of the site",
      "Describe the Prama camera position and whether neighbouring channels show the same conditions. Note darkness or weather effects from a safe vantage point.",
    ],
    [
      "The recorder repeatedly returns to startup",
      "Record the Prama message and running interval before restarting. Ask about recording interruption and the checks required before power or internal recorder work is approved.",
    ],
    [
      "Camera and recorder details are incomplete",
      "Collect accessible Prama equipment labels and earlier installation paperwork. Accurate model identification matters before ordering a camera or assuming compatibility with the remaining system.",
    ],
  ],
  "hi-focus": [
    [
      "A camera connection becomes intermittent",
      "Include the Hi-Focus recorder model, affected channel and recent cable work. State whether the same interruption appears locally and remotely so the signal path can be assessed.",
    ],
    [
      "Live view continues through a playback gap",
      "Specify the Hi-Focus channels and missing time range. Keep important recordings out of the enquiry itself and discuss preservation before storage intervention.",
    ],
    [
      "The viewing app loses access after a site change",
      "Describe the Hi-Focus local view, app name and known network changes. Coordinate with the owner rather than sharing verification codes or attempting an unapproved reset.",
    ],
    [
      "A camera view changes after building work",
      "Note the Hi-Focus position, obstruction and lighting changes already visible safely. An image-quality complaint should be assessed before the camera is moved or replaced.",
    ],
    [
      "Power interruptions affect a camera group",
      "Identify the Hi-Focus channels and any shared power route already known. Explain whether the recorder also restarts and leave electrical connection tests to the assessment.",
    ],
    [
      "An older installation needs a compatible addition",
      "Send the Hi-Focus recorder and existing camera models, plus the proposed addition if known. Confirm the required recording and viewing functions before committing to new equipment.",
    ],
  ],
};
