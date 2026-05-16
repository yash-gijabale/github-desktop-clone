import { Component } from "@angular/core";
import { CheckboxModule } from "primeng/checkbox";
import { TooltipModule } from 'primeng/tooltip';

@Component({
    selector: 'changes-file-card',
    styles: `.direction-rtl {
    direction: rtl;
}
.custom-width-tooltip .p-tooltip-text {
    white-space: nowrap;
    max-width: unset;
}
`,
    template: `
        <div class="border-b w-full border-black flex justify-between px-2 py-2 space-x-1
        hover:bg-[#303845] duration-75 ease-in-out
        "

        >
            <div class="flex items-center min-w-0 text-sm"
                    >
                <p-checkbox inputId="ingredient2" name="file" value="hello" />
                <label for="ingredient2" 
                showDelay="1000"
        pTooltip="src\\main\\java\\com\\cqra\\qa\\repository\\NcBeanSaRepository.java" tooltipPosition="bottom"
         tooltipStyleClass="custom-width-tooltip"
            class="overflow-hidden whitespace-nowrap text-ellipsis min-w-0 block direction-rtl text-left">
                src\\main\\java\\com\\cqra\\qa\\repository\\NcBeanSaRepository.java
            </label>
            </div>
            <div class="text-xl text-amber-400">
                <i class="fa-regular fa-circle-dot"  
                    showDelay="500"
                pTooltip="Modifed" tooltipPosition="bottom"></i>
            </div>
        </div>
    `,

    imports: [CheckboxModule, TooltipModule]
})
export class ChangedFileCardComponent {

}