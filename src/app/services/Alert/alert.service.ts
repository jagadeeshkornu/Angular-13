import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertPopupComponent } from 'src/app/components/alert-popup/alert-popup.component';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alert:MatDialog) { }

  
}
