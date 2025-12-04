import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FiltrosService } from '../../services/filtros.service';
import { IconosService } from '../../services/iconos.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  sanitizedIcons: { [key: string]: SafeHtml } = {};
  isVisible: boolean = true; // Por defecto visible en pantallas grandes

  filters = {
    destinos: {
      opened: false,
      options: []
    },
    aventura: {
      opened: true,
      options: [
        { label: 'Quads', value: 'quads', selected: false },
        { label: 'Parapente', value: 'parapente', selected: false },
        { label: 'Rafting', value: 'rafting', selected: false },
        { label: 'Explora', value: 'explora', selected: false },
        { label: 'Buceo', value: 'buceo', selected: false },
        { label: 'Paracaídas', value: 'paracaidas', selected: false },
        { label: 'Snowboard', value: 'snowboard', selected: false },
        { label: 'Surf', value: 'surf', selected: false }
      ]
    },
    alojamiento: {
      opened: false,
      options: [] // Opciones de alojamiento
    },
    precio: {
      opened: true,
      min: '',
      max: ''
    }
  };

  constructor(private iconsService: IconosService, private sanitizer: DomSanitizer
  ) { }

  aventuras = [
    { name: 'Quads', text: 'Aventuras en quads', selected: false },
    { name: 'Parapente', text: 'Aventuras en parapente', selected: false },
    { name: 'Rafting',text: 'Aventuras de rafting', selected: false },
    { name: 'Explora',text: 'Explora terrenos variados', selected: false },
    { name: 'Buceo',text: 'Bucea en Murcia', selected: false },
    { name: 'Paracaídas',text: 'Para las caidas', selected: false },
    { name: 'Snowboard',text: 'Tabla Nieve', selected: false },
    { name: 'Surf',text:'Surfea', selected: false }
  ];

  tooltips = [
    { name: 'Quads', text: 'Explora terrenos variados en vehículos todo terreno.' },
    { name: 'Parapente', text: 'Vuela y disfruta de vistas panorámicas desde el aire.' },
    { name: 'Rafting', text: 'Navega por rápidos emocionantes en ríos caudalosos.' },
  ];

  @Output() filtersChanged = new EventEmitter<string[]>();

  updateFilters() {
    const selectedFilters = this.aventuras
      .filter(item => item.selected)
      .map(item => item.name);
    this.filtersChanged.emit(selectedFilters);
  }

  toggleSection(section: keyof typeof this.filters) {
    this.filters[section].opened = !this.filters[section].opened;
  }


  ngOnInit(): void {
    const iconNames: Array<keyof IconosService['icons']> =
      ['logo', 'aventura', 'destinos', 'alojamiento', 'precio', 'filter'];

    iconNames.forEach((iconName: keyof IconosService['icons']) => {
      const icon = this.iconsService.getIcon(iconName);
      if (icon) {
        this.sanitizedIcons[iconName] = this.sanitizer.bypassSecurityTrustHtml(icon);
      }
    });

    if (this.isBrowser()) {
      this.checkScreenSize();
      window.addEventListener('resize', this.onResize.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser()) {
      window.removeEventListener('resize', this.onResize.bind(this));
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined';
  }

  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    if (this.isBrowser()) {
      this.isVisible = window.innerWidth >= 992;
    }
  }

  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }
}
