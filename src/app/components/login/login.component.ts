import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
 
  value3!: string;

  responseMsg :string ='';

  color ={ red:false , green : false}

  constructor(private fb: FormBuilder, private http:HttpClient, private router:Router) {
    this.loginForm = this.fb.group({
       
      UserName: ['', Validators.required],
      Password: ['', Validators.required],
       
    });
 
    
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      
      // Implement your login logic here
      this.http.post("https://localhost:44355/api/login",this.loginForm.value).subscribe((response:any)=>{
        if(response.Result){
          debugger;
          localStorage.setItem("Token",response.Token);
          
          this.responseMsg = response.Message;
          alert(response.Message);
          this.color = {red:false , green:true}
          setTimeout(() => {
            this.router.navigateByUrl('main');
          }, (3000));
          
          
        }
        

        else{
          debugger;
          alert(response.Message);
          this.responseMsg = response.Message;
          this.color = {red:true ,green:false};
        }
      })
     
      
    }
  }

  

  ngOnInit(): void {
  }

}
