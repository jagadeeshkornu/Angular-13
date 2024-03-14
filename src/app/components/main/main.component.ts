import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedOption: string = 'purchaser';

  constructor(private router:Router) { }

  ngOnInit(): void {
     
  }

  onSelect(option: string): void {
    this.selectedOption = option;
  }

  logOut() {
    this.onSelect('');
    const userConfirmed = confirm("Do you want to Logout?");
  
    if (userConfirmed) {
      // User clicked OK, proceed with logout
      localStorage.removeItem('Token');
      this.router.navigateByUrl('/login');
    } else {
      // User clicked Cancel, do nothing or provide feedback
      console.log("Logout canceled by the user.");
    }
  }



  

  

}
