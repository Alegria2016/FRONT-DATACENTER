// recargas.component.ts
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Operador, RecargaDataRequest } from '../../core/models/recargas.model';
import { RecargaService } from '../../core/service/recarga.service';

@Component({
  selector: 'app-recargas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recargas.component.html',
  styleUrl: './recargas.component.css'
})
export class RecargasComponent implements OnInit {
  operadores: Operador[] = [];
  recargaForm: FormGroup;
  cargando: boolean = false;
  
  @Output() recargaCreada = new EventEmitter<void>();

  constructor(
    private recargaService: RecargaService,
    private fb: FormBuilder
  ) {
    this.recargaForm = this.fb.group({
      operadorId: ['', Validators.required],
      numeroTelefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      valor: ['', [Validators.required, Validators.min(1000)]],
      usuarioId: [1]
    });
  }

  ngOnInit(): void {
    this.cargarOperadores();
  }

  cargarOperadores(): void {
    this.recargaService.getOperadores().subscribe({
      next: (data) => {
        this.operadores = data;
        console.log('Operadores cargados:', this.operadores);
      },
      error: (error) => console.error('Error cargando operadores:', error)
    });
  }

  realizarRecarga(): void {
    if (this.recargaForm.valid) {
      this.cargando = true;
      const recargaData: RecargaDataRequest = this.recargaForm.value;
      
      this.recargaService.recargas(recargaData).subscribe({
        next: () => {
          this.mostrarNotificacion('success', '¡Recarga exitosa!', 'Tu recarga se ha procesado correctamente.');
          this.limpiarFormulario();
          this.recargaCreada.emit();
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.mostrarNotificacion('error', 'Error en la recarga', 'No se pudo procesar la recarga. Intenta nuevamente.');
          this.cargando = false;
        }
      });
    } else {
      this.mostrarNotificacion('error', 'Formulario incompleto', 'Por favor completa todos los campos correctamente.');
      this.marcarCamposInvalidos();
    }
  }

  seleccionarOperador(operadorId: number): void {
    this.recargaForm.patchValue({ operadorId });
  }

  // Métodos para aplicar clases CSS según el operador
  getOperadorClass(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('claro')) return 'bg-blue-50';
    if (nombreLower.includes('movistar')) return 'bg-green-50';
    if (nombreLower.includes('tigo')) return 'bg-yellow-50';
    if (nombreLower.includes('wom')) return 'bg-purple-50';
    return 'bg-gray-50';
  }

  getOperadorBgClass(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('claro')) return 'bg-blue-100';
    if (nombreLower.includes('movistar')) return 'bg-green-100';
    if (nombreLower.includes('tigo')) return 'bg-yellow-100';
    if (nombreLower.includes('wom')) return 'bg-purple-100';
    return 'bg-gray-100';
  }

  getOperadorTextClass(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('claro')) return 'text-blue-600';
    if (nombreLower.includes('movistar')) return 'text-green-600';
    if (nombreLower.includes('tigo')) return 'text-yellow-600';
    if (nombreLower.includes('wom')) return 'text-purple-600';
    return 'text-gray-600';
  }

  getOperadorTitleClass(nombre: string): string {
    const nombreLower = nombre.toLowerCase();
    if (nombreLower.includes('claro')) return 'text-blue-700';
    if (nombreLower.includes('movistar')) return 'text-green-700';
    if (nombreLower.includes('tigo')) return 'text-yellow-700';
    if (nombreLower.includes('wom')) return 'text-purple-700';
    return 'text-gray-700';
  }

  private limpiarFormulario(): void {
    this.recargaForm.reset({
      operadorId: '',
      numeroTelefono: '',
      valor: '',
      usuarioId: 1
    });
  }

  private marcarCamposInvalidos(): void {
    Object.keys(this.recargaForm.controls).forEach(key => {
      const control = this.recargaForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  private mostrarNotificacion(type: string, title: string, message: string): void {
    // Implementar lógica de notificación según tu aplicación
    console.log(`${type}: ${title} - ${message}`);
    // En una aplicación real, usarías un servicio de notificaciones
  }
}