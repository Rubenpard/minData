import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {
  currentSlide = 0;

  slides = [
    {
      image: 'assets/slide1.jpg',
      altText: 'Ruta por Australia',
      title: 'Ruta por Australia',
      description: 'Si te va la aventura, no te lo puedes perder'
    },
    {
      image: 'assets/slide2.jpg',
      altText: 'Aventura en Asia',
      title: 'Aventura en Asia',
      description: 'Descubre lo desconocido'
    },
    {
      image: 'assets/slide3.jpg',
      altText: 'Escapada a África',
      title: 'Escapada a África',
      description: 'Un viaje inolvidable'
    }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
