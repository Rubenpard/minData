import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {

   @Input() id!: number;
   @Input() activeId!: number | null;
   @Output() toggle = new EventEmitter<number>();

  total: string | undefined;

  @Input() imagen: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() dias: string = '';
  @Input() price: string = '';
  @Input() precioAim: string = '';
  @Input() impuesto: string = '';
  @Input() lorem: string = '';
  @Input() categorias: string[] =[];

  Price() {
      this.toggle.emit(this.id);
  }
  get isOpen(): boolean {
    return this.activeId === this.id;
  }
}
