// Enquiry examples describe possible symptoms, not completed jobs or promised support.
export const CCTV_EDITORIAL: Record<
  string,
  { model: string; focus: string; example: string; support: string }
> = {
  hikvision: {
    model:
      "Share the Hikvision recorder model, affected camera models and channel numbers. Say whether the installation uses a recorder, individual network cameras or both. Include the app name only if remote viewing is part of the complaint; keep device QR codes and credentials private.",
    focus:
      "Separate a missing local camera image from an app-only offline message. Note whether playback for the same channel is still available and whether other channels work. This helps establish whether camera power, the signal path, recording or remote connectivity needs assessment.",
    example:
      "My Hikvision recorder shows seven cameras, but one channel says no video. The app shows the same missing channel. I can share the recorder model and the time the problem began without sending footage or passwords.",
    support: "https://www.hikvision.com/en/support/",
  },
  dahua: {
    model:
      "Include the Dahua recorder and camera model numbers, the number of affected channels and any other brands in the installation. Describe whether the system uses network cabling or another connection, if known. Mention recent power, router or cable changes.",
    focus:
      "If live images work but playback is missing, describe the date range, affected channels and any storage warning already visible. A recording gap does not by itself establish that a drive has failed. Discuss important footage before formatting, resetting or replacing storage.",
    example:
      "My Dahua system shows live video, but I cannot find yesterday's recordings on two channels. I need to preserve any existing footage and can share the recorder model and visible storage message.",
    support: "https://support.dahuasecurity.com/en",
  },
  "cp-plus": {
    model:
      "Send the complete CP Plus recorder model and camera count, plus the models of any affected cameras. Identify whether the fault occurs on the local monitor, in recorded playback or only in the viewing app. Include changes made since the last time the system worked.",
    focus:
      "For several cameras dropping together, note whether they share a power supply, cable route or network switch. Explain whether the recorder itself remains running. Shared symptoms can have a common cause, so replacing each camera should follow checks rather than an assumption.",
    example:
      "Four channels on my CP Plus system went blank together, but the remaining cameras still work. I can describe which channels are affected and whether the recorder displays any warning.",
    support: "https://cpplusworld.com/troubleshooting",
  },
  godrej: {
    model:
      "Share the exact Godrej camera or recorder model and describe how it connects to the rest of the installation. Mention other device brands, the viewing method and whether the issue affects one device or the whole system. Confirm model-specific assessment and parts options before arranging work.",
    focus:
      "For an unclear or intermittent picture, separate image quality from loss of connection. Describe whether the issue changes between day and night or began after rain, cleaning or building work. Do not climb to a camera or open its enclosure to collect booking details.",
    example:
      "My Godrej camera gives a clear daytime picture, but the image becomes hazy at night. Other cameras look normal. I can share the model and describe the camera location without moving it.",
    support: "https://www.godrejenterprises.com/",
  },
  honeywell: {
    model:
      "Identify the Honeywell camera and recorder models and any management software involved. For an office or shared building, nominate the person authorized to coordinate access and changes. A mixed installation should list the recorder and camera brands separately.",
    focus:
      "Describe whether the problem is visible at the local recorder, in the management software or on one workstation only. Include when it began and any approved network changes. Coordinate assessment with the responsible system or IT contact before altering a managed installation.",
    example:
      "Our Honeywell camera is visible at the recorder but missing from one workstation. The building manager can coordinate access and provide the model and recent change history. We need assessment before configuration changes.",
    support: "https://buildings.honeywell.com/in/en/support/supportcenter",
  },
  axis: {
    model:
      "Include the Axis camera model and the recorder or video-management software used with it. Mention how the camera is powered, if known, and whether other devices on the same connection remain available. Keep network addresses and access details out of public screenshots.",
    focus:
      "A camera that becomes unreachable needs context about the local network, power source and recording destination. Describe the symptoms already observed without changing network settings or installing firmware simply to test. Confirm compatibility with the existing system before replacement is proposed.",
    example:
      "One Axis camera no longer appears in our recording software, while the rest remain available. Our IT contact can coordinate network access. I can share the camera model and the last known working time.",
    support: "https://www.axis.com/support",
  },
  "tp-link": {
    model:
      "Provide the full TP-Link camera model, hardware version if accessible and any recorder model. State whether it is a Tapo, VIGI or another product rather than assuming one app or accessory fits every camera. Explain whether it uses Wi-Fi, a wired connection or another setup.",
    focus:
      "For an offline camera, distinguish loss of local connection from remote-viewing trouble after a router change. Say whether other cameras still work and whether recording remains available. The correct setup and compatibility depend on the actual model and hardware version.",
    example:
      "My TP-Link camera went offline after the router was replaced. I can provide the camera model and app name. I want to check the connection before considering hardware replacement.",
    support: "https://www.tp-link.com/in/support/",
  },
  ezviz: {
    model:
      "Share the EZVIZ camera model, power arrangement and recording method if known. Mention whether the issue concerns live view, local storage, an existing cloud service or notifications. Do not send the device verification code, account password or QR label in an enquiry.",
    focus:
      "A working live image and missing recordings are different faults. Describe the affected time range, recording method and any message in the app. Confirm which storage or account service is involved before changing settings; a repair request is not approval to erase recordings.",
    example:
      "My EZVIZ camera still shows live video, but playback is missing for a specific day. I can share the model and the recording method. I need existing footage preserved before any reset or storage change.",
    support: "https://support.ezviz.com/",
  },
  trueview: {
    model:
      "Include the complete Trueview model and whether the camera uses Wi-Fi, wired networking, mobile connectivity or another arrangement. Describe its power source and recording destination, plus any recorder in the installation. Model details help separate connection issues from device faults.",
    focus:
      "For a camera that connects intermittently, describe the timing, power indications and whether the fault follows a power or network change. If a mobile-data connection is involved, mention that setup without sending SIM or account credentials. Do not assume every offline message means failed hardware.",
    example:
      "My Trueview camera disconnects several times a day. I can share the model, power arrangement and connection type. I would like the connection and device assessed before replacing anything.",
    support: "https://trueview.co.in/",
  },
  secureye: {
    model:
      "Share the Secureye recorder and affected camera models, channel numbers and approximate installation age. Mention whether the fault began after weather exposure, electrical work or a cable change. List other brands involved so compatibility can be assessed rather than assumed.",
    focus:
      "For a channel that flickers or drops out, record when it happens and whether nearby channels are affected. Describe visible damage from ground level only. Cable, connection, power and camera problems can appear similar, and the proposed repair should follow the findings.",
    example:
      "One Secureye channel flickers, but the rest remain stable. The issue began after nearby building work. I can provide the recorder model and affected channel without handling the cabling.",
    support: "https://www.secureye.com/",
  },
  prama: {
    model:
      "Provide the full Prama recorder and camera models, affected channel count and any viewing software involved. Mention whether live viewing, playback or remote access stopped first. Include relevant installation or maintenance records if you have them.",
    focus:
      "A recorder that restarts or displays storage warnings needs the exact message and operating sequence. Note whether all channels disappear together and whether a recent power event preceded the fault. Preserve important footage before any storage initialization or system reset is discussed.",
    example:
      "My Prama recorder restarts intermittently and all camera images disappear together. I can share the model and warning shown. Existing footage matters, so I need the risks explained before storage or reset work.",
    support: "https://www.pramaindia.in/contact-us/",
  },
  "hi-focus": {
    model:
      "Include the Hi-Focus recorder model, camera models and the channel or function affected. Describe any network switch, power supply or other brand in the signal path if known. Avoid assuming devices are interchangeable because their connectors look similar.",
    focus:
      "If a replacement camera is not appearing, describe the original and replacement models along with the recorder. Image format, power and connection compatibility need confirmation for the exact equipment. An absent picture alone does not establish that the new camera is faulty.",
    example:
      "A replacement Hi-Focus camera does not show on our existing recorder, while the other cameras work. I can share both model numbers and would like compatibility checked before buying more equipment.",
    support: "https://hifocuscctv.com/",
  },
};
