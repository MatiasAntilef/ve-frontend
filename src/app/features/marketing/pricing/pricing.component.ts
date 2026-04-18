import { Component, inject, signal } from '@angular/core';
import { Pais, TestService } from '@core/test/test.service';

@Component({
  selector: 'app-pricing',
  imports: [],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.css',
})
export class PricingComponent {
  constructor() {
    this.cargarPais();
  }
  private testService = inject(TestService);
  paises = signal<Pais[]>([]);
  cargando = signal<boolean>(true);
  error = signal<string | null>(null);

  cargarPais() {
    this.testService.obtenerPaises().subscribe({
      next: (data) => {
        this.paises.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al cargar países', err);
        this.error.set('No se pudieron cargar los países');
        this.cargando.set(false);
      },
    });
  }
}
