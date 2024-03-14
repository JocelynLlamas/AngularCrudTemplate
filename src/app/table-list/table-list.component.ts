import { Component, OnInit } from '@angular/core';
import { CrudServiceService } from '../services/crudService/crud-service.service';
import { MatDialog } from '@angular/material/dialog';
import { response } from 'express';
import { error } from 'console';
import { ModalComponent } from 'app/modal/modal.component';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
})
export class TableListComponent implements OnInit {

  data: any[] = [];
  rowEdited: number = -1;
  item: any = {};
  originalItem: any = {};

  constructor(private crudService: CrudServiceService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.crudService.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  editRow(index: number, superHeroe: any): void {
    this.rowEdited = index;
    this.item = superHeroe;
    this.originalItem = { ...superHeroe };
  }

  saveChanges(): void {
    this.crudService.editData(this.item).subscribe(
      response => {
        console.log('Superhéroe editado correctamente:', response);
        // Realizar acciones adicionales según sea necesario, como actualizar la lista de superhéroes
        this.ngOnInit();
        this.rowEdited = -1; // Terminar la edición
        this.item = {}; // Limpiar el objeto de edición
      },
      error => {
        console.error('Error al editar el superhéroe:', error);
      }
    );
  }

  cancelEdition(): void {
    this.rowEdited = -1; // Cancelar la edición
    this.item = { ...this.originalItem };
    // Limpiar el objeto de edición original
    this.originalItem = {};
  }

  deleteRow(id: number):void{
    this.crudService.removeData(id).subscribe(
      response => {
        this.ngOnInit();
        console.log('Superhéroe eliminado correctamente:', response);
      },
      error => {
        console.error('Error al eliminar el superhéroe:', error);
      }
    );
  }

  openDialog():void{
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px', // Ancho del modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
      console.log('El modal se ha cerrado', result);
    });
  }
}
