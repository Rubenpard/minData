import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltrosService {
  private filtersState = {
    destinos: [],
    aventura: [],
    alojamiento: [],
    priceRange: { min: -Infinity, max: Infinity }
  };

  private filtersSubject = new BehaviorSubject<any>(this.filtersState);

  public filters$: Observable<any> = this.filtersSubject.asObservable();

  setFilters(updatedFilters: any): void {
    // Asignación de filtros actualizados
    this.filtersState = {
      ...this.filtersState,
      ...updatedFilters
    };
    this.filtersSubject.next(this.filtersState);
  }

  // Resetea los filtros
  resetFilters(): void {
    this.filtersState = {
      destinos: [],
      aventura: [],
      alojamiento: [],
      priceRange: { min: -Infinity, max: Infinity }
    };
    this.filtersSubject.next(this.filtersState);
  }

  // Obtener estado filtros
  getCurrentFilters(): any {
    return this.filtersState;
  }
}
