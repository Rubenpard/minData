import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BannerComponent } from '../components/banner/banner.component';
import { Title, Meta } from '@angular/platform-browser';
import { FiltersComponent } from '../components/filters/filters.component';
import { HeaderNavComponent } from '../components/header-nav/header-nav.component';
import { ResultsComponent } from '../components/results/results.component';
import { FooterComponent } from '../components/footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BannerComponent, FiltersComponent, HeaderNavComponent, ResultsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent {
  results = [
    { imagen: 'assets/resultImage1.jpg', title: 'Aventura en Quads', description: 'Explora en quads', price: 480, dias: 2, precioAim: 0, impuesto: 10, lorem: 'Texto adicional', categorias: ['Buceo'], destino: 'Bangkok', alojamiento: 'Hotel' },
    { imagen: 'assets/resultImage2.jpg', title: 'Rafting extremo', description: 'Rafting en el río', price: 500, dias: 1, precioAim: 0, impuesto: 20, lorem: 'Texto adicional', categorias: ['Quads','Explora'] , destino: 'Murcia', alojamiento: 'Apartamento' },
    { imagen: 'assets/resultImage3.jpg', title: 'Rafting extremo', description: 'Rafting en el río', price: 450, dias: 1, precioAim: 0, impuesto: 5, lorem: 'Texto adicional', categorias: ['Rafting'], destino: 'Africa', alojamiento: 'Camping' },
    { imagen: 'assets/resultImage1.jpg', title: 'Rafting extremo', description: 'Rafting en el río', price: 450, dias: 1, precioAim: 0, impuesto: 10, lorem: 'Texto adicional', categorias: ['Buceo'], destino: 'Asturias', alojamiento: 'Hotel' },
    { imagen: 'assets/resultImage2.jpg', title: 'Rafting extremo', description: 'Rafting en el río', price: 450, dias: 1, precioAim: 0, impuesto: 10, lorem: 'Texto adicional', categorias: ['Buceo'], destino: 'Bangkok', alojamiento: 'Camping' },
    { imagen: 'assets/resultImage3.jpg', title: 'Rafting extremo', description: 'Rafting en el río', price: 1050, dias: 10, precioAim: 0, impuesto: 10, lorem: 'Texto adicional', categorias: ['Quads','Explora','Paracaídas'], destino: 'Murcia', alojamiento: 'Apartamento' },

  ];

  filteredResults = this.results;

  applyFilters(selectedFilters: string[]) {
  this.filteredResults = this.results.filter(result => {

    if (selectedFilters.length === 0) return true;

    return selectedFilters.some(filter => {
      const [type, value] = filter.split(':');

      if (type === 'aventura') {
        return result.categorias.includes(value);
      }
      if (type === 'destino') {
        return result.destino === value;
      }
      if (type === 'alojamiento') {
        return result.alojamiento === value;
      }

      return false;
    });

  });
}


  activeDropdown: number | null = null;

onToggle(id: number) {
  this.activeDropdown = this.activeDropdown === id ? null : id;
}

  constructor(private title: Title, private meta: Meta) {
     this.title.setTitle('Prueba Ruben Martinez');
     this.meta.updateTag({
      name: 'description',
      content: 'Esta es la página de inicio del proyecto.'
    });

    this.meta.updateTag({
      property: 'og:title',
      content: 'Página de inicio'
    });
   }

  ngOnInit(): void {
    this.updatePrecioAim();
  }

  updatePrecioAim(): void {
    this.results.forEach(result => {
      result.precioAim = result.price + result.impuesto;
    });
  }
}



