export type BrandRepairAdvice = { service: string; slug: string; decision: { title: string; body: string }; handover: { title: string; body: string } };

// Individually curated approval and handover advice; not manufacturer-wide fault claims.
export const BRAND_REPAIR_ADVICE: BrandRepairAdvice[] = [
  {
    "service": "Mobile Repair",
    "slug": "apple",
    "decision": {
      "title": "What should I confirm before approving iPhone screen work?",
      "body": "Ask whether the quoted scope includes checking proximity sensing, cameras and Face ID-related behaviour where fitted, and what cannot be tested with the proposed part. Agree how any display warning or feature limitation will be documented before work starts."
    },
    "handover": {
      "title": "What should I verify on my iPhone at collection?",
      "body": "Check touch across the screen, brightness response, call audio and the functions agreed for testing before signing off. Keep your passcode private and review account access yourself."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "samsung",
    "decision": {
      "title": "What should I clarify before a Samsung foldable repair?",
      "body": "Ask whether the inner and cover displays, hinge area and frame are included in the inspection rather than treating a crease or line as an isolated panel issue. Confirm safe handling limits and the specific checks planned for each screen."
    },
    "handover": {
      "title": "What should I check after Samsung screen work?",
      "body": "Test both displays and touch across their usable areas, then confirm hinge movement only through the normal range advised at handover. Ask the technician to record any feature that could not be checked."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "xiaomi",
    "decision": {
      "title": "How can I approve Xiaomi charging work with a clear scope?",
      "body": "Ask whether the assessment distinguishes debris or connector wear from cable, adapter, battery or board symptoms before a port is replaced. Confirm the exact model-compatible part and which charging behaviour will be tested afterward."
    },
    "handover": {
      "title": "What charging checks matter at collection?",
      "body": "Connect an appropriate cable and confirm that charging starts without needing an unusual angle, then check the port is not loose. Ask what was tested if intermittent behaviour was not reproducible."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "vivo",
    "decision": {
      "title": "What should I ask before approving vivo camera repair?",
      "body": "Clarify whether the proposed scope addresses the lens cover, focus mechanism or camera module, since a blurred image can have different causes. Agree which camera and modes will be checked without sharing private photos."
    },
    "handover": {
      "title": "How do I check a vivo camera handover?",
      "body": "Open the affected front or rear camera and test focus at near and distant subjects in the modes discussed. Inspect the exterior lens area and confirm any untested mode is noted."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "oppo",
    "decision": {
      "title": "What evidence should support OPPO battery versus port work?",
      "body": "Ask the technician to explain whether the symptom follows the connector, accessory or battery behaviour before choosing a replacement. Approve only the identified scope and confirm how charging stability will be assessed."
    },
    "handover": {
      "title": "What should I test after OPPO charging repair?",
      "body": "Use your usual known-good cable and verify the connection remains stable with the phone resting normally. Confirm charging indication and any agreed battery or startup check."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "realme",
    "decision": {
      "title": "What should I confirm before authorizing realme power repair?",
      "body": "Ask what observations distinguish battery wear from an app-related or board-level shutdown, and whether the diagnostic process could alter stored data. Agree the intended scope before approving any reset or part change."
    },
    "handover": {
      "title": "What belongs in a realme power handover?",
      "body": "Check startup, charging and the condition associated with the reported shutdown without deliberately recreating a risky fault. Request a record of the part or software work performed and any remaining symptom."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "oneplus",
    "decision": {
      "title": "What display specification should I approve for OnePlus?",
      "body": "Ask whether the replacement matches the exact model and which refresh, brightness, fingerprint or other fitted display functions are supported. Have any compatibility limitation stated before authorizing installation."
    },
    "handover": {
      "title": "What should I test after OnePlus display work?",
      "body": "Check touch at screen edges, brightness adjustment and any agreed biometric function, then look for unusual lines or flicker. Confirm the technician records functions that depend on part specification."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "motorola",
    "decision": {
      "title": "How should I scope a Motorola audio repair?",
      "body": "Ask whether the reported issue was checked in calls, recordings and media separately so a microphone is not confused with a speaker fault. Agree which audio paths will be inspected and tested."
    },
    "handover": {
      "title": "How do I verify Motorola audio handover?",
      "body": "Make a brief test call and recording, then listen to playback at a moderate level to check the relevant paths. Avoid recording private conversations and ask for any untested audio route to be noted."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "google",
    "decision": {
      "title": "What should I approve before Pixel software or board work?",
      "body": "Explain your backup status and ask whether the proposed step can erase data or require account reactivation before authorizing it. Request a staged scope so diagnosis does not silently become a reset or replacement."
    },
    "handover": {
      "title": "What should I confirm when collecting a Pixel?",
      "body": "Check the agreed startup and hardware functions, then review your own account and backup status privately. Ask whether any reset, software change or data-access limitation occurred."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "poco",
    "decision": {
      "title": "Should I approve a POCO reset for a boot-loop fault?",
      "body": "Ask what evidence supports a software reset rather than a hardware diagnosis, and whether the reset would erase local files. Make data preservation an explicit constraint before agreeing to any step."
    },
    "handover": {
      "title": "What should I verify after POCO startup repair?",
      "body": "Confirm the device reaches the expected start screen and that the buttons, charging and agreed functions respond. Check your own files and accounts privately; do not assume inaccessible data was recovered."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "iqoo",
    "decision": {
      "title": "What findings should justify iQOO heat-related repair?",
      "body": "Describe the workload and ask whether checks will consider cooling, battery and power behaviour rather than treating warmth alone as a failed part. Do not approve stress testing that risks a damaged or swollen handset."
    },
    "handover": {
      "title": "What should I check after iQOO power work?",
      "body": "Ask which safe operating and charging checks were completed and whether any thermal warning remains. Use the phone normally at first and stop if swelling, unusual heat or a warning appears."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "nothing",
    "decision": {
      "title": "What should I clarify before approving Nothing Phone repair?",
      "body": "Ask whether the proposed work affects the reported fault alone or also the fitted Glyph lighting, buttons or connectivity assemblies. Confirm which distinctive functions can be checked with the replacement specification."
    },
    "handover": {
      "title": "What should be included in a Nothing Phone handover?",
      "body": "Test the reported function plus the relevant Glyph controls, alerts and connectivity agreed for the job. Request a clear note of any feature that could not be validated."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "tecno",
    "decision": {
      "title": "What should I ask before Tecno part replacement?",
      "body": "Ask the assessment to separate touch failure from image failure and charging symptoms instead of assuming one damaged assembly explains all. Confirm the exact variant and the functions included in the approved scope."
    },
    "handover": {
      "title": "How should I check a Tecno repair at collection?",
      "body": "Test touch across the affected area, charging connection and the original reported symptom. Compare the completed work against the agreed scope and ask about any unresolved behaviour."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "infinix",
    "decision": {
      "title": "What should I confirm before Infinix software repair?",
      "body": "If files matter, ask whether the proposed software procedure may reset storage and whether diagnosis can proceed without authorizing erasure. Approve a reset only after its consequences and alternatives are explained."
    },
    "handover": {
      "title": "What should I review after Infinix repair?",
      "body": "Check startup and the functions included in the work, then inspect your own files and account access privately. Ask whether any reset or storage change was made and retain the work record."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "huawei",
    "decision": {
      "title": "What should I ask before Huawei repair approval?",
      "body": "Confirm whether the fault is tied to a specific component or software function and whether account or regional services affect post-repair checks. Keep credentials private and agree which hardware functions can be verified."
    },
    "handover": {
      "title": "What should I verify after Huawei repair?",
      "body": "Test the repaired function and the related connectivity or camera controls agreed in advance. Sign in yourself if needed, and ask that any account-dependent test not performed is recorded."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "asus",
    "decision": {
      "title": "How do I approve ASUS phone board work carefully?",
      "body": "Ask which measured or observed finding points to board repair and what components or data-handling steps the scope includes. Confirm that no reset or additional replacement is authorized without your approval."
    },
    "handover": {
      "title": "What records should accompany ASUS phone handover?",
      "body": "Check startup, charging and the originally reported function, then request the completed-work and any limitations in writing. Review account access yourself rather than sharing credentials."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "lg",
    "decision": {
      "title": "What should I weigh before approving an older LG phone repair?",
      "body": "Ask whether the proposed part is matched to the precise model and whether another worn component could limit the repair outcome. Compare the documented fault and scope before authorizing work, without assuming a brand listing establishes compatibility."
    },
    "handover": {
      "title": "What should I check after LG phone repair?",
      "body": "Test the repaired function alongside charging and the controls most relevant to the original complaint. Have any aged or untested feature recorded so expectations remain clear."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "hp",
    "decision": {
      "title": "What should I authorize after an HP blink-pattern assessment?",
      "body": "Ask which observed blink sequence was interpreted for the exact product number and whether it supports a component-level repair or further testing. Approve the next step separately if it could affect stored data."
    },
    "handover": {
      "title": "What should be checked after HP startup repair?",
      "body": "Confirm startup, display, keyboard and charging behaviour, including the original light or beep symptom if safely reproducible. Request the diagnostic finding and replaced component in the service record."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "dell",
    "decision": {
      "title": "How do I distinguish a Dell battery repair from adapter trouble?",
      "body": "Ask whether charging behaviour was compared with the correct adapter and whether any firmware or port warning changes the diagnosis. Agree the test and replacement scope before approving battery work."
    },
    "handover": {
      "title": "What should I verify after Dell charging repair?",
      "body": "Check charging indication with the identified adapter and confirm the battery is recognized by the operating system. Ask whether battery runtime itself was assessed or only charging response."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "lenovo",
    "decision": {
      "title": "What should be included in Lenovo hinge approval?",
      "body": "Ask whether inspection covers hinge mounts, lid casing, display cable and alignment rather than tightening a hinge alone. Confirm whether the screen assembly must be opened and what cosmetic limitations are expected."
    },
    "handover": {
      "title": "What should I inspect after Lenovo hinge work?",
      "body": "Open and close the lid gently through its normal travel and check that the display remains stable without casing separation. Confirm the hinge, enclosure and screen functions were included in the handover checks."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "apple",
    "decision": {
      "title": "What should I approve before MacBook display or board work?",
      "body": "Discuss backup status and ask whether the proposed procedure can affect storage or require macOS reinstallation. Confirm which display, camera and external-display checks match the actual scope."
    },
    "handover": {
      "title": "What should I check after MacBook repair?",
      "body": "Test the internal display, keyboard, trackpad and any agreed external-display connection before collection. Ask whether software or storage was changed and review your account privately."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "asus",
    "decision": {
      "title": "What evidence should support ASUS laptop cooling work?",
      "body": "Ask whether fan operation, airflow obstruction and temperature behaviour were assessed under suitable conditions rather than relying only on loudness. Agree any cleaning or component replacement separately and avoid repeated heavy-load testing."
    },
    "handover": {
      "title": "What should I verify after ASUS cooling work?",
      "body": "Check fan noise and the original workload-related symptom during ordinary use, not an improvised stress test. Ask what temperature or shutdown checks were actually completed and note any remaining concern."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "acer",
    "decision": {
      "title": "Should Acer hinge repair include the laptop casing?",
      "body": "Ask whether cracked mounting points or lid damage are included, since a hinge-only change may not address a separated enclosure. Confirm the proposed repair method and expected cosmetic finish before approval."
    },
    "handover": {
      "title": "What should I inspect after Acer hinge work?",
      "body": "Check the casing seams and screen alignment, then move the lid gently and verify the display remains stable. Ask whether both hinge movement and enclosure attachment were inspected."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "msi",
    "decision": {
      "title": "What should I clarify before MSI gaming-laptop repair?",
      "body": "Ask whether the freeze or shutdown was distinguished from graphics, cooling, memory and power symptoms, and what evidence supports the proposed part. Set a safe testing scope and do not authorize repeated maximum-load runs by default."
    },
    "handover": {
      "title": "What should I check after MSI performance repair?",
      "body": "Confirm normal startup, display, fan operation and the reported task at a reasonable level before collection. Request a description of the load test performed and any symptoms that were not reproduced."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "samsung",
    "decision": {
      "title": "What display features must Samsung laptop approval specify?",
      "body": "Ask whether the exact model replacement supports touch, pen input and convertible operation where fitted, rather than approving by panel size alone. Have any feature incompatibility written into the proposed scope."
    },
    "handover": {
      "title": "What should I test after Samsung screen repair?",
      "body": "Check image, touch response and pen or hinge functions if they are part of the device and approved test. Confirm that any untested display feature is recorded before accepting the handover."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "microsoft",
    "decision": {
      "title": "What should I ask before authorizing Surface internal repair?",
      "body": "Ask how the exact Surface generation affects access and repair options, and whether the proposed work risks data or enclosure damage. Approve only the explained scope and confirm any limits on future serviceability."
    },
    "handover": {
      "title": "What should I verify after Surface repair?",
      "body": "Check the reported power or startup issue plus keyboard, touch and charging functions included in the agreed work. Ask for any enclosure or feature limitation to be noted in the handover record."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "lg",
    "decision": {
      "title": "What should I do before approving LG laptop battery work?",
      "body": "If the case or trackpad is raised, stop pressing it and ask whether the battery condition and enclosure are part of the assessment. Confirm safe handling and the exact battery specification before authorizing replacement."
    },
    "handover": {
      "title": "What should I inspect after LG battery repair?",
      "body": "Check that the casing sits normally and the laptop recognizes charging, without pressing a previously swollen area. Ask for the battery identification and any capacity or runtime test details."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "xiaomi",
    "decision": {
      "title": "What should I confirm for an imported Xiaomi laptop part?",
      "body": "Ask whether the exact model and regional variant match the proposed component, connector and firmware requirements. Do not approve based on a similar family name or appearance alone."
    },
    "handover": {
      "title": "What should I check after Xiaomi laptop work?",
      "body": "Test the repaired function and any region-dependent keyboard, wireless or power feature included in scope. Keep the completed part specification with the work record."
    }
  },
  {
    "service": "Laptop Repair",
    "slug": "honor",
    "decision": {
      "title": "What should I ask before HONOR laptop boot repair?",
      "body": "Clarify whether startup diagnosis involves the storage drive and whether any repair step could overwrite files. Set an explicit limit on reinstalling or resetting the system until data priorities are addressed."
    },
    "handover": {
      "title": "What should I verify after HONOR laptop repair?",
      "body": "Check startup, keyboard, trackpad and the reported fault, then confirm whether the operating system or storage contents changed. Review files and account access yourself before relying on the device."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "hikvision",
    "decision": {
      "title": "What should I approve for a missing Hikvision channel?",
      "body": "Ask whether the proposed work checks camera power, cabling and recorder input before replacing the camera. Confirm whether playback and other channels will be preserved and tested."
    },
    "handover": {
      "title": "What should I verify after Hikvision channel repair?",
      "body": "Check live view and a short playback sample for the affected channel, then confirm its timestamp and recording status. Ask which other channels were verified without sharing passwords or footage."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "dahua",
    "decision": {
      "title": "What should I authorize when Dahua playback is missing?",
      "body": "Ask for the storage warning and affected time range to be documented before any drive initialization or replacement is considered. Agree how existing footage will be protected and what recording test follows."
    },
    "handover": {
      "title": "What should I check after Dahua storage work?",
      "body": "Verify live view, playback across a newly recorded interval and the recorder's displayed storage status. Ask whether older footage remains accessible and have any gap clearly recorded."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "cp-plus",
    "decision": {
      "title": "What should be checked before CP Plus camera replacement?",
      "body": "When several channels fail together, ask whether shared power, switch or cable routes were tested before approving multiple camera replacements. Agree a channel-by-channel diagnosis so the scope follows the common symptom."
    },
    "handover": {
      "title": "What should I verify after CP Plus repair?",
      "body": "Check each affected channel in live view and confirm the recorder continues to show unaffected cameras. Ask whether the shared connection or individual devices were repaired."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "godrej",
    "decision": {
      "title": "What should I approve for a Godrej camera that blurs at night?",
      "body": "Ask whether the assessment distinguishes focus or lens contamination from illumination, reflective surfaces and moisture around the enclosure. Confirm the technician will check the day-to-night transition before replacing a module."
    },
    "handover": {
      "title": "What should I check after Godrej camera work?",
      "body": "Review the picture in daylight and the available night mode after the repair, noting whether the original haze remains. Confirm the lens area and enclosure were inspected without climbing or opening equipment yourself."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "honeywell",
    "decision": {
      "title": "Who should approve Honeywell CCTV configuration changes?",
      "body": "Have the authorized building or IT contact confirm the affected workstation, recorder and approved access window before changes are made. Separate a client-display issue from a camera or recording fault in the work scope."
    },
    "handover": {
      "title": "What should the Honeywell system handover include?",
      "body": "Ask the authorized contact to verify the relevant view at the recorder and intended workstation, plus recording if included. Request a written list of settings changed without exposing access credentials."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "axis",
    "decision": {
      "title": "What should I confirm before Axis camera network work?",
      "body": "Ask whether power delivery, network reachability and recording-software compatibility were checked before replacing a camera or changing firmware. Agree who controls network changes and what configuration will be documented."
    },
    "handover": {
      "title": "What should I verify after Axis repair?",
      "body": "Confirm the camera appears in the intended management system and that recording or alerts included in scope operate. Have the installer document network or firmware changes for the site administrator."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "tp-link",
    "decision": {
      "title": "What should I approve after a TP-Link camera router change?",
      "body": "Ask whether the model’s connection setup and recording destination were checked before treating an offline status as hardware failure. Confirm whether reconfiguration could remove existing local settings or recordings."
    },
    "handover": {
      "title": "What should I check after TP-Link reconnection?",
      "body": "Verify local live view and remote viewing separately, then check recording on the intended destination. Confirm the camera remains associated with the correct network without sharing the password at handover."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "ezviz",
    "decision": {
      "title": "What should I clarify before EZVIZ storage or account changes?",
      "body": "Identify whether playback uses a memory card, recorder or account service and ask how a proposed change could affect existing clips. Approve formatting or reset only after the data consequence is explained."
    },
    "handover": {
      "title": "What should I check after EZVIZ service?",
      "body": "Test live view, a fresh playback interval and the correct recording method in the app. Confirm whether earlier clips remain available and keep verification codes private."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "trueview",
    "decision": {
      "title": "What should support a Trueview camera replacement decision?",
      "body": "Ask whether power stability and the actual connection type were checked during the reported dropout period. Confirm a camera is not being replaced solely because a remote app labels it offline."
    },
    "handover": {
      "title": "What should I verify after Trueview connection repair?",
      "body": "Check the camera at the local connection and through its intended remote view, then confirm a recording interval if applicable. Ask what connection and power checks were completed."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "secureye",
    "decision": {
      "title": "What should I approve for a Secureye channel that flickers?",
      "body": "Ask whether the cable route, connectors and shared power were inspected in relation to the nearby building work before the camera is replaced. Ensure the assessment can be done without unsafe access by the customer."
    },
    "handover": {
      "title": "What should I check after Secureye repair?",
      "body": "Observe the affected image for stable live view and confirm the recorder captures it over a new interval. Request the repair location and any cable or power changes in writing."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "prama",
    "decision": {
      "title": "What should I ask before Prama recorder storage or reset work?",
      "body": "Ask whether the restart pattern and power supply were assessed before initializing storage or resetting configuration. Make preservation of existing footage an explicit approval condition."
    },
    "handover": {
      "title": "What should I verify after Prama recorder repair?",
      "body": "Confirm stable recorder operation, all expected channels and a fresh playback sample without erasing existing recordings. Ask whether any settings or storage contents were changed."
    }
  },
  {
    "service": "CCTV Installation & Repair",
    "slug": "hi-focus",
    "decision": {
      "title": "What should I confirm before Hi-Focus camera or recorder replacement?",
      "body": "Ask whether the proposed device matches the existing recorder’s signal format, channel capacity and power arrangement before approving a swap. Have compatibility and any required configuration change stated in the scope."
    },
    "handover": {
      "title": "What should I check after Hi-Focus installation or repair?",
      "body": "Verify the affected live image, recorder channel assignment and a playback sample if recording is included. Request confirmation of the fitted model and any compatibility settings changed."
    }
  },
  {
    "service": "Mobile Repair",
    "slug": "ai-plus",
    "decision": {
      "title": "How do I approve an Ai+ display repair when the variant is uncertain?",
      "body": "Ask for the handset model to be established from accessible device information or purchase documents before a screen is specified. Confirm how touch, image and any fitted fingerprint function will be checked with the proposed part."
    },
    "handover": {
      "title": "What should be recorded when collecting an Ai+ phone?",
      "body": "Compare the fitted display specification with the approved estimate and check touch across the usable screen. Ask which charging and startup checks were included and keep any untested function in the work record."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "bosch",
    "decision": {
      "title": "Does an E:18 message justify replacing the Bosch drain pump?",
      "body": "Ask whether the drain path was checked for restrictions and what findings support a pump replacement for the full E-Nr. A drainage-related message does not by itself establish which component failed."
    },
    "handover": {
      "title": "What should a Bosch drainage repair handover cover?",
      "body": "Ask whether water discharge and the relevant spin stage were checked and whether the original message returned. Keep the E-Nr, fitted part details and any agreed follow-up observation together."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "godrej",
    "decision": {
      "title": "Should a Godrej twin-tub spin fault involve work on both tubs?",
      "body": "Ask which tub and drive path the diagnosis concerns and whether the functioning wash tub needs any work. Have lid-safety, drainage and mechanical findings explained before a motor or timer is approved."
    },
    "handover": {
      "title": "How do I review a Godrej twin-tub repair?",
      "body": "Discuss wash and spin operation separately, including any function not included in the work. Do not bypass a lid switch or reach inside a moving tub to check the result."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "haier",
    "decision": {
      "title": "Does a Haier drying complaint require washer repairs too?",
      "body": "Ask whether the estimate separates drying-related checks from fill, wash, drain and spin work. A completed wash with damp clothes after drying needs a different scope from retained water before spinning."
    },
    "handover": {
      "title": "What should be checked after Haier washer-dryer work?",
      "body": "Confirm which wash and drying settings were used for the agreed checks and what load conditions were appropriate. Ask about any remaining drying limitation instead of accepting a successful wash as evidence of a resolved drying fault."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "ifb",
    "decision": {
      "title": "Should an IFB locked-door fault mean a new door lock?",
      "body": "Ask whether retained water, programme state and the locking mechanism were assessed together. Confirm what evidence supports lock replacement rather than authorizing it solely because the handle will not release."
    },
    "handover": {
      "title": "What should I review after IFB door or cycle repair?",
      "body": "Confirm the relevant drain and programme checks and safe door release at the end of the agreed test. Ask which conditions could delay release on your model and use its manual rather than forcing the handle."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "lg",
    "decision": {
      "title": "What should support an LG drive or motor repair proposal?",
      "body": "Ask whether drainage, load behaviour and drum movement were checked before drive-related parts were specified. An appliance feature badge or a spin interruption is not evidence that the motor needs replacing."
    },
    "handover": {
      "title": "What matters after an LG spin repair?",
      "body": "Ask which load and programme were used to review the reported interruption and whether drainage completed. Keep any intermittent behaviour and the agreed observation during normal laundry use in the job notes."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "panasonic",
    "decision": {
      "title": "How should I compare repair options for an older Panasonic washer?",
      "body": "Ask whether the required component can be matched to the full model and what earlier repairs change about the proposal. Compare the complete estimate and unresolved wear rather than deciding from appliance age alone."
    },
    "handover": {
      "title": "What should an older Panasonic washer handover include?",
      "body": "Keep the model, replaced-part specification and any function left outside the repair scope. Ask which filling or cycle checks were completed and how to report the original interruption returning."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "samsung",
    "decision": {
      "title": "Should a Samsung display message determine the replacement part?",
      "body": "Ask how the full model code and observed programme stage were used to interpret the message. Confirm the diagnostic findings before approving a valve, pump, sensor or control component."
    },
    "handover": {
      "title": "What should I check after Samsung message-related repair?",
      "body": "Ask whether the stage that produced the message was reviewed and whether the appliance and any connected app now report different information. Retain the original display photo with the completed-work record."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "siemens",
    "decision": {
      "title": "How is a Siemens replacement matched to my washer?",
      "body": "Ask how the complete E-Nr suffix and available production details match the proposed part specification. Do not approve a component based only on a similar control panel or the Siemens name."
    },
    "handover": {
      "title": "What should I retain after Siemens parts work?",
      "body": "Keep the full appliance identity with the approved and fitted part descriptions. Confirm whether the relevant wash, drain, spin or drying function was checked and whether any further observation is needed."
    }
  },
  {
    "service": "Washing Machine Repair",
    "slug": "whirlpool",
    "decision": {
      "title": "Should one failed Whirlpool tub require a full drive replacement?",
      "body": "Ask which wash or spin assembly was assessed and how its fault relates to the proposed work. A functioning wash tub and a stopped spin tub should be described separately before timer or motor replacement is approved."
    },
    "handover": {
      "title": "How should I review a Whirlpool spin-tub repair?",
      "body": "Ask about the spin function, drainage and lid-safety checks included in the job. Confirm whether washing was also reviewed and keep hands clear of moving components during any demonstration."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "daikin",
    "decision": {
      "title": "What should support Daikin cooling-system work?",
      "body": "Ask how airflow, operating mode and the equipment configuration were assessed before refrigerant or compressor work was proposed. For a multi-unit system, confirm which indoor and outdoor components are included rather than assuming the scope of a room AC."
    },
    "handover": {
      "title": "What should a Daikin cooling handover explain?",
      "body": "Record the mode and settings used for the agreed cooling checks and which units were reviewed. Ask what further observation is appropriate if the complaint is intermittent or affects only some rooms."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "blue-star",
    "decision": {
      "title": "Should a post-service Blue Star leak require a replacement part?",
      "body": "Ask whether drainage, installation condition and the recent work were reviewed together. Agree which finding supports cleaning, adjustment or a component change instead of approving a part solely because dripping followed a service."
    },
    "handover": {
      "title": "What should I review after Blue Star leak work?",
      "body": "Ask where the leak was traced and what running conditions were used for the drainage check. Keep the earlier service details and any observation period with the new work record."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "bpl",
    "decision": {
      "title": "What should be confirmed before an older BPL AC part is ordered?",
      "body": "Ask how the appliance label and installation type match the proposed component. If identification remains uncertain, have compatibility confirmed before approving a part based on capacity or appearance."
    },
    "handover": {
      "title": "What belongs in a BPL AC handover record?",
      "body": "Keep the full identified model and fitted part specification with the completed checks. Ask which remote, airflow and cooling functions were actually reviewed rather than accepting startup alone."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "godrej",
    "decision": {
      "title": "How should a recurring Godrej AC shutdown be assessed?",
      "body": "Ask whether the timing, mode, warning and power history were considered before a sensor or board replacement was proposed. Confirm which safe checks distinguish an operating interruption from a control or cooling fault."
    },
    "handover": {
      "title": "How do I review Godrej shutdown repair?",
      "body": "Ask how long the unit was observed under the agreed settings and whether the original warning returned. Keep any limitation in reproducing an intermittent shutdown in the completed-work record."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "haier",
    "decision": {
      "title": "Should a Haier app alert lead to internal AC repair?",
      "body": "Ask whether the unit itself shows the reported symptom and how it responds to its usual controls. Confirm whether the proposed scope concerns connection settings, appliance operation or both before approving parts."
    },
    "handover": {
      "title": "What should be checked after Haier control work?",
      "body": "Review the unit response and any connected-control behaviour separately where fitted. Keep account access private and ask which alerts or features could not be checked."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "ifb",
    "decision": {
      "title": "How should I approve work for an IFB AC fault that returned?",
      "body": "Ask how the earlier diagnosis, replaced parts and current symptoms relate to the new proposal. Confirm whether the estimate addresses the original complaint or a newly identified issue, without presuming either visit establishes the cause."
    },
    "handover": {
      "title": "What should I keep after repeat IFB AC work?",
      "body": "Retain both work records and a description of what changed between visits. Ask which affected airflow, control or cooling function was reviewed and how the same symptom should be reported again."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "lg",
    "decision": {
      "title": "Does an LG inverter badge establish a compressor fault?",
      "body": "No. Ask what model-specific checks distinguish the cooling complaint from a control, airflow or other fault before a compressor or board is proposed."
    },
    "handover": {
      "title": "What should follow LG warning-related repair?",
      "body": "Compare the complete unit warning with the reported cooling behaviour under the agreed settings. Identify app messages separately and ask whether the original operating symptom was reproduced during checks."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "lloyd",
    "decision": {
      "title": "What should a Lloyd repair estimate say about outdoor access?",
      "body": "Ask whether safe access equipment, building permissions and any separate arrangements are included. Keep the access scope distinct from the diagnosis so an unreachable outdoor position is not treated as a customer task."
    },
    "handover": {
      "title": "What should Lloyd access-related handover include?",
      "body": "Ask which indoor and outdoor checks were completed and which were restricted by the site. Keep any access limitation and further work requirement in the record before accepting the scope as complete."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "panasonic",
    "decision": {
      "title": "Should a Panasonic indicator sequence trigger a reset?",
      "body": "Ask how the indicator was interpreted for the exact model and whether a reset is appropriate for the observed fault. Do not approve repeated resets as a substitute for explaining a recurring operating problem."
    },
    "handover": {
      "title": "What should I record after Panasonic control repair?",
      "body": "Keep the original indicator sequence and the settings used for the relevant check. Ask whether connected controls and the usual remote were reviewed separately where applicable."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "samsung",
    "decision": {
      "title": "What should Samsung connected-control repair cover?",
      "body": "Ask whether the unit warning, app notification and actual cooling behaviour were checked independently. Confirm any account or connection change before it is combined with an internal appliance repair."
    },
    "handover": {
      "title": "What should I review after Samsung AC control work?",
      "body": "Check the response to the usual remote and any connected control included in the agreed scope. Ask whether the original unit message returned and retain a record of settings changed."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "voltas",
    "decision": {
      "title": "Should a Voltas cooling change after relocation mean a refill?",
      "body": "Ask which installation and operating findings support any proposed refrigerant work. Confirm the appliance specification and whether the diagnosis addresses a new installation issue rather than assuming every cooling complaint needs a refill."
    },
    "handover": {
      "title": "What should I review after relocated Voltas AC work?",
      "body": "Ask which access, airflow, drainage and cooling checks relate to the move and reported fault. Keep installation observations and any further arrangement separate from routine service advice."
    }
  },
  {
    "service": "AC Service & Repair",
    "slug": "whirlpool",
    "decision": {
      "title": "How should I compare repair options for an older Whirlpool AC?",
      "body": "Ask whether the diagnosis, compatible parts and any existing wear make the proposed work practical. Compare the complete repair scope with replacement arrangements rather than using age or reduced cooling alone to decide."
    },
    "handover": {
      "title": "What should older Whirlpool AC handover record?",
      "body": "Keep the part identification and which cooling, airflow or noise checks were completed. Ask about unresolved wear and how to observe the original gradual performance change during normal use."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "bosch",
    "decision": {
      "title": "Does one warm Bosch compartment justify sealed-system work?",
      "body": "Ask whether compartment settings, airflow and the observed cooling pattern were assessed before compressor or refrigerant work was proposed. Confirm the complete E-Nr against any replacement specification."
    },
    "handover": {
      "title": "What should Bosch compartment repair handover explain?",
      "body": "Record which compartment was checked, its settings and the agreed cooling observation guidance. Keep any alarm and the original compartment difference with the completed-work notes."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "godrej",
    "decision": {
      "title": "What should support a Godrej compressor proposal?",
      "body": "Ask which findings connect the fresh-food and freezer symptoms to sealed-system work. A running sound and a warm cabinet should be considered alongside the actual model and compartment observations, not treated as a complete diagnosis."
    },
    "handover": {
      "title": "What should I review after Godrej cooling work?",
      "body": "Ask which compartments and controls were reviewed and how their performance should be observed after handover. Keep any remaining frost, water or door concern separate from the cooling repair result."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "haier",
    "decision": {
      "title": "Should a warm Haier compartment first be treated as a fault?",
      "body": "Ask how the intended use and selected mode of that compartment were checked for the exact model. A configurable section should be assessed against its chosen function before parts are proposed."
    },
    "handover": {
      "title": "What should I confirm after Haier compartment work?",
      "body": "Record the selected mode and which sections were checked, especially where modes are configurable. Ask how to observe the intended performance without repeatedly changing settings."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "ifb",
    "decision": {
      "title": "What should support an IFB frost or water repair?",
      "body": "Ask how the location, recurrence and any earlier defrosting relate to the proposed work. Have findings explained before approving a defrost, sensor or drainage component merely because ice or water returned."
    },
    "handover": {
      "title": "What should I record after IFB frost work?",
      "body": "Keep the original buildup location and ask which related checks were completed. Agree what recurrence to watch for without scraping ice or removing panels yourself."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "lg",
    "decision": {
      "title": "Does an LG diagnostic notification justify compressor replacement?",
      "body": "Ask how the notification was considered alongside the actual compartment temperatures and operating symptoms. A feature badge or app message alone should not determine the proposed replacement."
    },
    "handover": {
      "title": "What should an LG cooling handover cover?",
      "body": "Ask which compartment and control checks were completed and identify any app message separately. Keep ice-maker or dispenser limitations distinct if those features were outside the agreed scope."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "panasonic",
    "decision": {
      "title": "How do I approve an older Panasonic refrigerator part?",
      "body": "Ask whether the component matches the full model and how earlier repairs affect the current proposal. A similar cabinet capacity or the appliance age does not establish either compatibility or repair feasibility."
    },
    "handover": {
      "title": "What should I keep after Panasonic fridge repair?",
      "body": "Retain the model, fitted component details and any earlier repair history relevant to the job. Ask which compartment checks were completed and what unresolved wear remains."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "samsung",
    "decision": {
      "title": "Should Samsung display and dispenser faults share one repair scope?",
      "body": "Ask whether the full display message, compartment settings and fitted ice or water functions were assessed separately. Approve the specific identified work rather than assuming one control part will resolve every complaint."
    },
    "handover": {
      "title": "What should Samsung feature repair handover include?",
      "body": "Review the affected cooling zone and any ice-maker or dispenser checks included in the job. Have an untested feature or remaining warning recorded instead of treating general cooling as proof that it works."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "whirlpool",
    "decision": {
      "title": "Does a new Whirlpool sound justify a compressor change?",
      "body": "Ask how the timing of the sound, door operation and compartment performance support the diagnosis. A recording is useful context but should not be treated as proof of a failed compressor."
    },
    "handover": {
      "title": "What should I review after Whirlpool noise work?",
      "body": "Ask which operating condition was checked and whether the original sound was reproduced. Keep any cooling observation and remaining intermittent noise in the work record."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "onida",
    "decision": {
      "title": "What if an Onida fridge part is proposed before the model is known?",
      "body": "Ask for the appliance identity to be established from an accessible rating label before compatibility is confirmed. Missing paperwork should not be replaced by a guess based on cabinet colour or the front logo."
    },
    "handover": {
      "title": "What should an Onida handover record identify?",
      "body": "Keep the established model and fitted part specification, especially when the original documents were missing. Ask which cooling, water or door complaint was checked and what remains outside the work."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "lloyd",
    "decision": {
      "title": "How should a Lloyd cooling fault after moving be assessed?",
      "body": "Ask how the move, compartment settings and door condition were considered before parts were proposed. Use the exact model installation guidance rather than approving work from a universal restart rule."
    },
    "handover": {
      "title": "What should I retain after Lloyd post-move repair?",
      "body": "Keep the move timeline and any installation observations with the relevant cooling checks. Ask whether a door or control complaint was also reviewed or needs a separate scope."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "voltas",
    "decision": {
      "title": "How do I confirm parts for a fridge labelled Voltas Beko?",
      "body": "Ask how the complete brand wording and model code match the proposed component. A Voltas enquiry label should not replace the appliance identity needed for compatibility and existing-cover questions."
    },
    "handover": {
      "title": "What should a Voltas refrigerator work record include?",
      "body": "Retain the full appliance identity, including Beko where shown, with the fitted part description. Ask which compartment modes and affected cooling functions were reviewed."
    }
  },
  {
    "service": "Refrigerator Repair",
    "slug": "croma",
    "decision": {
      "title": "Should a Croma purchase invoice determine my refrigerator repair brand?",
      "body": "Use the manufacturer printed on the appliance label, which may differ from the retailer on the invoice. Ask how any store protection plan and the actual equipment model affect the independent repair decision before approval."
    },
    "handover": {
      "title": "What should I keep after Croma-branded fridge repair?",
      "body": "Retain the appliance model, approved work and any separate protection-plan documents. Ask which cooling compartment and reported functions were checked; buying a fridge at Croma does not establish its manufacturer."
    }
  }
];
