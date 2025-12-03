import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconosService } from '../../services/iconos.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-nav.component.html',
  styleUrl: './header-nav.component.scss'
})
export class HeaderNavComponent {

  sanitizedIcons: { [key: string]: SafeHtml } = {};

  constructor(private sanitizer: DomSanitizer, private iconsService: IconosService) { }

  ngOnInit(): void {
    const iconNames: Array<keyof IconosService['icons']> = ['logo', 'aventura', 'destinos', 'alojamiento'];

    iconNames.forEach((iconName: keyof IconosService['icons']) => {
      const icon = this.iconsService.getIcon(iconName);
      if (icon) {
        this.sanitizedIcons[iconName] = this.sanitizer.bypassSecurityTrustHtml(icon);
      }
    });
  }
  selected: string = '';

  selectNavItem(item: string): void {
    this.selected = item;
  }

  select: string = '';
  isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

// Cerrar el menú al seleccionar un ítem
  selectNav(item: string) {
    this.selected = item;
    this.isMenuOpen = false;
  }

}
