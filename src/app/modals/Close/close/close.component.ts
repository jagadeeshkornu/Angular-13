import { Component, OnInit } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.css']
})
export class CloseComponent implements OnInit {

  constructor(private activeModal: NgbActiveModal,) { }

  ngOnInit(): void {
  }


  dismiss() {  
    this.activeModal.dismiss();
  }

  confirm() {
    this.activeModal.close("confirm");
  }

}
