# Repair category product images

AI-generated illustrative cutouts created with the built-in Image Generation tool. Final transparent WebP files live in `public/images/repair-categories/` with the `-straight.webp` suffix. The shared resolver maps service slugs to assets.

`scripts/prepare-repair-card-images.mjs` trims transparent padding, bounds assets to 512px, encodes WebP at quality 84 and alpha quality 100, and verifies transparency. Original PNGs remain in the image-generation Library.

## Prompt set

Shared brief: perfectly straight-on orthographic product elevation; centered, level camera, zero yaw or roll, no tilt, no three-quarter angle. Vertical and horizontal edges remain level. No visible side panels unless specified. Photorealistic studio product with realistic proportions, bright neutral silver/white/charcoal materials, whole product centered with transparent margins, soft frontal light and actual alpha transparency. No floor, room, platform, cast shadow, text, logos, watermark, people or unrelated props. Recognizable at 80px tall.

| File stem | Product-specific brief |
| --- | --- |
| mobile-repair-straight | One silver smartphone upright portrait, front display luminous pale-blue to navy gradient without UI. |
| laptop-repair-straight | One silver laptop open, display facing camera exactly square on, keyboard base visible symmetrically below, luminous pale-blue to navy gradient screen without UI. |
| cctv-service-straight | White outdoor security camera, lens pointing directly at camera, circular dark lens and white housing, small mounting stem visible below. |
| tv-audio-repair-straight | Thin dark television standing on two symmetrical feet with a matching soundbar directly below, plain navy display. |
| tablet-repair-straight | One silver tablet upright portrait with generous tablet width, thin black bezels and luminous pale-blue to navy gradient display without UI. |
| data-recovery-straight | One computer hard disk drive with cover removed, flat face with silver platter and read arm facing directly at camera, upright rectangular silhouette, no perspective. |
| console-repair-straight | One charcoal game console upright with matching controller centered directly in front, front faces directly at camera. |
| desktop-repair-straight | Desktop computer set, monitor centered with blank navy screen, tower standing beside it and keyboard centered below. All front faces parallel to camera. |
| washing-machine-repair-straight | One white front-loading washing machine, large round dark glass door centered below realistic unlabeled controls. Only flat front face visible. |
| ac-repair-straight | One white split air-conditioner indoor unit, long horizontal rectangle, vent and louvers symmetrically visible below, only front visible. |
| refrigerator-repair-straight | One brushed-silver domestic refrigerator, closed doors and lower freezer drawer, symmetrical front, only front visible. |
| microwave-repair-straight | One silver microwave oven, dark rectangular glass door on left, controls on right. Only flat front visible, no top or side. |
| water-purifier-service-straight | One white and navy domestic RO water purifier, front-facing tank and small tap centered below, only front visible. |
| inverter-ups-repair-straight | One dark household inverter placed level on top of a light-gray battery, clean front control panel, both front faces directly at camera. |
| fan-light-repair-straight | One three-blade ceiling fan with central light, viewed straight from directly underneath, symmetrical balanced blades in image plane, no perspective. |
| electrical-service-straight | One white electrical distribution box with a neat horizontal row of circuit breakers visible on its flat front. No open projecting door, no exposed wires. Only front face visible. |

