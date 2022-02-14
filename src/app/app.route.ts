import { RouterModule, Routes } from '@angular/router';

// components
import { HomeComponent } from './home/home.component';
import { CompareEditorComponent } from './compare-editor/compare-editor.component';
import { AboutComponent } from './about/about.component';

export const appRoutes: Routes = [
  { path: '', component: CompareEditorComponent },
  { path: 'home', component: HomeComponent },
  { path: 'textcompare', component: CompareEditorComponent },
  { path: 'about', component: AboutComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
