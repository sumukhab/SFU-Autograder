import { Component, OnInit, ViewChild  } from '@angular/core';
import {AceComponent} from '../../ace-code/component/ace.component'
@Component({
  selector: 'app-editorpage',
  templateUrl: './editorpage.component.html',
  styleUrls: ['./editorpage.component.css']
})
export class EditorpageComponent implements OnInit {
  @ViewChild(AceComponent) codeEditor: AceComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
