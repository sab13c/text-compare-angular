import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  OnInit
} from '@angular/core';
import { DiffEditorModel } from 'ngx-monaco-editor';

@Component({
  selector: 'widget-compare-editor',
  styleUrls: ['./compare-editor.component.css'],
  templateUrl: './compare-editor.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CompareEditorComponent implements OnInit {
  text1 = '';
  text2 = '';
  isCompared = false;
  navi: monaco.editor.IDiffNavigator;
  diffEditor: monaco.editor.IStandaloneDiffEditor;
  containerDisplay = "none"

  @Output()
  selectedLang = 'plaintext';
  @Output()
  selectedTheme = 'vs';

  @Input()
  languages = [
    'bat',
    'c',
    'coffeescript',
    'cpp',
    'csharp',
    'csp',
    'css',
    'dockerfile',
    'fsharp',
    'go',
    'handlebars',
    'html',
    'ini',
    'java',
    'javascript',
    'json',
    'less',
    'lua',
    'markdown',
    'msdax',
    'mysql',
    'objective-c',
    'pgsql',
    'php',
    'plaintext',
    'postiats',
    'powershell',
    'pug',
    'python',
    'r',
    'razor',
    'redis',
    'redshift',
    'ruby',
    'rust',
    'sb',
    'scss',
    'sol',
    'sql',
    'st',
    'swift',
    'typescript',
    'vb',
    'xml',
    'yaml'
  ];

  @Input()
  themes = [
    {
      value: 'vs',
      name: 'Visual Studio'
    },
    {
      value: 'vs-dark',
      name: 'Visual Studio Dark'
    },
    {
      value: 'hc-black',
      name: 'High Contrast Dark'
    }
  ];

  // input
  inputOptions = {
    theme: 'vs',
    language: 'plaintext',
    quickSuggestions: false,
    minimap: {
      enabled: false
    },
    scrollbar: {
      // Subtle shadows to the left & top. Defaults to true.
      useShadows: false,
      // Render vertical arrows. Defaults to false.
      verticalHasArrows: false,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: false,
      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: 'hidden',
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: 'hidden'
    },
  };
  // compare, output
  diffOptions = {
    quickSuggestions: false,
    theme: 'vs',
    language: 'plaintext',
    readOnly: false,
    renderSideBySide: true
  };
  // originalModel: DiffEditorModel = {
  //   code: '',
  //   language: 'plaintext'
  // };

  // modifiedModel: DiffEditorModel = {
  //   code: '',
  //   language: 'plaintext'
  // };

  originalModel: monaco.editor.ITextModel;

  modifiedModel: monaco.editor.ITextModel;




  public ngOnInit() { }

  onChangeLanguage(language) {
    this.inputOptions = Object.assign({}, this.inputOptions, {
      language: language
    });
    // this.originalModel = Object.assign({}, this.originalModel, {
    //   language: language
    // });
    // this.modifiedModel = Object.assign({}, this.modifiedModel, {
    //   language: language
    // });

    monaco.editor.setModelLanguage(this.originalModel, language);
    monaco.editor.setModelLanguage(this.modifiedModel, language);

    // this.diffEditor.set
  }
  onChangeTheme(theme) {
    this.inputOptions = Object.assign({}, this.inputOptions, { theme: theme });
    this.diffOptions = Object.assign({}, this.diffOptions, { theme: theme });
  }

  onChangeInline(checked) {
    this.diffOptions = Object.assign({}, this.diffOptions, {
      renderSideBySide: !checked
    });
  }

  onCompare() {
    if (this.diffEditor) {
      this.diffEditor.dispose()
    }


    this.originalModel = monaco.editor.createModel(
      this.text1,
      this.selectedLang
    );
    this.modifiedModel = monaco.editor.createModel(
      this.text2,
      this.selectedLang
    );


    this.diffEditor = monaco.editor.createDiffEditor(document.getElementById('container'));
    this.diffEditor.setModel({
      original: this.originalModel,
      modified: this.modifiedModel
    });

    this.diffEditor.layout({
      width: document.getElementById('container-parent').clientWidth,
      height: 700
    })
    this.navi = monaco.editor.createDiffNavigator(this.diffEditor, {
      followsCaret: true, // resets the navigator state when the user selects something in the editor
      ignoreCharChanges: true // jump from line to line
    });

    // this.originalModel = Object.assign({}, this.originalModel, {
    //   code: this.text1
    // });
    // this.modifiedModel = Object.assign({}, this.originalModel, {
    //   code: this.text2
    // });

    this.isCompared = true;
    this.containerDisplay = ""
    window.scrollTo(0, 0); // scroll the window to top
  }
  onClear() {
    this.text1 = '';
    this.text2 = '';
    this.isCompared = false;
    this.containerDisplay = "none"
    window.scrollTo(0, 0); // scroll the window to top
  }


  onNextDiff() {

    this.navi.next()

    // window.setInterval(function () {
    //   navi.next();
    // }, 2000);

    window.scrollTo(0, 0); // scroll the window to top
  }

  onPreviousDiff() {
    this.navi.previous()
    window.scrollTo(0, 0); // scroll the window to top
  }

}
