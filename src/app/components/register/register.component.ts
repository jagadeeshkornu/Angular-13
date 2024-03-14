import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
 
  color ={red:false, green:false}

  responseMsg :string ='';

  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router) {
    this.registerForm = this.fb.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
 
  }
  ngOnInit(): void {
    
  }
  onSubmit() {
    if (this.registerForm.valid) {
      // Implement your login logic here
      console.log('Login:', this.registerForm.value);
      const result = this.registerForm.value;
      this.http.post("https://localhost:44355/api/register/register-user",result).subscribe((response:any)=>{
        if (response.Result){
          this.color = {red:false,green:true};
          this.responseMsg = response.Message;
          console.log("Register Successfully");
           
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 2000);
          
        }

        else{
          console.log("User already existed");
          this.responseMsg = response.Message;
          this.color = {red:true,green:false};
          
        }
      })
    }

    
  }


}
