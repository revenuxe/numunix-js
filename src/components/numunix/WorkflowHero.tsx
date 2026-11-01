import type { WorkflowStage } from "@/content/workflow";
import { PageHero } from "./PageShell";
export function WorkflowHero({stage,index}:{stage:WorkflowStage;index:number}) {
 return <PageHero label={`${String(index+1).padStart(2,"0")} / ${stage.phase}`} title={stage.title} accent={stage.accent} body={stage.intro} primary={{label:"REQUEST ASSESSMENT",href:"/contact"}} secondary={{label:"STAGE DETAILS",href:"#deliverables"}} />;
}
