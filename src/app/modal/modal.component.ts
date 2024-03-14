import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CrudServiceService } from 'app/services/crudService/crud-service.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  heroName: string;
  heroFirstName: string;
  heroLastName: string;
  heroPlace: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private crudService: CrudServiceService) { }

  ngOnInit(): void {
    console.log('NAME 1: ', this.heroName);
  }

  addHero(): void {

    const newHero = {
      name: this.heroName,
      firstName: this.heroFirstName,
      lastName: this.heroLastName,
      place: this.heroPlace
    };

    console.log('NAME 2:', this.heroName);
    this.crudService.addData(newHero).subscribe(
      response => {
        console.log('Superhéroe añadido correctamente:', response);
        this.closeDialog();
      },
      error => {
        console.error('Error al agregar el superhéroe:', error);
      }
    );
  }

  // Función para cerrar el modal
  closeDialog(): void {
    this.dialogRef.close();
  }

}
