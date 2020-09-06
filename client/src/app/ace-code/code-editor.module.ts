import { NgModule } from '@angular/core';
import { AceComponent } from './component/ace.component';
import { CommonModule } from '@angular/common'; 
import { ReactiveFormsModule,FormsModule } from '@angular/forms';

@NgModule({
    imports:[CommonModule,FormsModule,ReactiveFormsModule],
    declarations: [AceComponent],
    exports: [AceComponent]
}) export class CodeEditorModule { }