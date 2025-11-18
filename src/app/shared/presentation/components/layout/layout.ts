import {Component} from '@angular/core';
import {MatToolbar, MatToolbarRow} from '@angular/material/toolbar';
import {TranslatePipe} from '@ngx-translate/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {FooterContent} from '../footer-content/footer-content';

@Component({
  selector: 'app-layout',
  imports: [
    MatToolbar,
    MatToolbarRow,
    TranslatePipe,
    RouterLink,
    RouterLinkActive,
    MatButton,
    LanguageSwitcher,
    RouterOutlet,
    FooterContent
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  options = [
    { link: '/home',  label: 'option.home'},
    { link: '/about', label: 'option.about'},
    { link: '/learning/categories', label: 'option.categories'},
    { link: '/learning/courses', label: 'option.courses'}
  ]
}
