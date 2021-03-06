import { Component, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';

import * as ace from 'ace-builds';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-beautify';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EditorHandlerService } from 'src/app/services/editor-handler.service';
import { first } from 'rxjs/operators';


const INIT_CONTENT = '';
const THEME = 'ace/theme/github';
const LANG = 'ace/mode/python';

@Component({
    selector: 'app-ace',
    templateUrl: './ace.component.html',
    styleUrls: ['./ace.component.css']
}) export class AceComponent implements AfterViewInit {

    saveForm: FormGroup;
    submitted = false;
    loading = false;
    showErrorMessage = false;
    returnUrl: string;
    error = '';

    private codeEditor: ace.Ace.Editor;
    private editorBeautify; // beautify extension
    @ViewChild('codeEditor') private codeEditorElmRef: ElementRef;
    @Input() content: string;

    constructor(private editorhandler: EditorHandlerService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,) { }

    ngOnInit(): void {
        this.saveForm = this.formBuilder.group({
            filename: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/editor';
    }

    get f() { return this.saveForm.controls; }

    ngAfterViewInit() {
        ace.require('ace/ext/language_tools');
        const element = this.codeEditorElmRef.nativeElement;
        const editorOptions = this.getEditorOptions();
        this.codeEditor = this.createCodeEditor(element, editorOptions);
        this.setContent(this.content || INIT_CONTENT);
        // hold reference to beautify extension
        this.editorBeautify = ace.require('ace/ext/beautify');
    }


    onSave() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.saveForm.invalid) {
            return;
        }
        this.loading = true;

        this.editorhandler.saveCode(this.content, this.f.filename.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.showErrorMessage = true;
                    this.loading = false;
                });
    }


    private createCodeEditor(element: Element, options: any): ace.Ace.Editor {
        const editor = ace.edit(element, options);
        editor.setTheme(THEME);
        editor.getSession().setMode(LANG);
        editor.setShowFoldWidgets(true);
        return editor;
    }

    // missing propery on EditorOptions 'enableBasicAutocompletion' so this is a wolkaround still using ts
    private getEditorOptions(): Partial<ace.Ace.EditorOptions> & { enableBasicAutocompletion?: boolean; } {
        const basicEditorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 14,
            maxLines: Infinity,
        };
        const extraEditorOptions = { enableBasicAutocompletion: true };
        return Object.assign(basicEditorOptions, extraEditorOptions);
    }

    /**
     * @returns - the current editor's content.
     */
    public getContent() {
        if (this.codeEditor) {
            const code = this.codeEditor.getValue();
            return code;
        }
    }

    /**
     * @param content - set as the editor's content.
     */
    public setContent(content: string): void {
        if (this.codeEditor) {
            this.codeEditor.setValue(content);
        }
    }
    public consoleCode() {
        console.log(this.getContent());
    }

    /**
     * @description
     *  beautify the editor content, rely on Ace Beautify extension.
     */
    public beautifyContent() {
        if (this.codeEditor && this.editorBeautify) {
            const session = this.codeEditor.getSession();
            this.editorBeautify.beautify(session);
        }
    }

    public clearCode() {
        this.codeEditor.setValue("")
    }

    /**
     * @event OnContentChange - a proxy event to Ace 'change' event - adding additional data.
     * @param callback - recive the corrent content and 'change' event's original parameter.
     */
    public OnContentChange(callback: (content: string, delta: ace.Ace.Delta) => void): void {
        this.codeEditor.on('change', (delta) => {
            const content = this.codeEditor.getValue();
            callback(content, delta);
        });
    }
}