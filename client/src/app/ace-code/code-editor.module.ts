import { NgModule } from '@angular/core';
import { AceComponent } from './component/ace.component';

@NgModule({
    declarations: [AceComponent],
    exports: [AceComponent]
}) export class CodeEditorModule { }