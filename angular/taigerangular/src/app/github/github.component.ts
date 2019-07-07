import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';  
import {ApplicationService} from '../Services/application.services';
import { from } from 'rxjs';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css'] 
})
export class GithubComponent implements OnInit {  
  constructor(private http: HttpClient, private fb: FormBuilder,private applicationService:ApplicationService) { }
  readMeContents: any[] = [];
  readMeFileContents: string;
  userReadMeFile: string;
  repoList: any[] = []; 
  gitHubUserForm: FormGroup;  
  showDetails: boolean;  
  readMeFileFound: boolean;  
  showAnimation: boolean; 
  selectedAuthor: string;
  repoName: string;
  repocount : any[] = []; 
  showNoRepositoryFound: boolean;
  showNoRepositoryFoundMessage: boolean;
  private baseApiRepos: string;
 

  ngOnInit() { 
    this.gitHubUserForm = this.fb.group({
      repoUser: 'mojombo',       
      showAnimation:false
    });

  }


  PopulateUserRepositories() {
    if (this.gitHubUserForm.value.repoUser == '' || this.gitHubUserForm.value.repoUser == undefined) {
      alert('Please give a valid  User');
      return;
    }
    this.showAnimation = true;      
    this.GetRepositories();
    this.showAnimation = false;
  }

  GetRepositories() {
    this.baseApiRepos = this.applicationService._baseApiUsersRepository +  this.gitHubUserForm.value.repoUser + '/repos';    
    this.showNoRepositoryFound=false;
    this.showNoRepositoryFoundMessage=false;
    this.applicationService.getUserRepository(this.baseApiRepos).subscribe(result => {
      this.repoList = result;  
      if (result.length<=0)
      {
        this.showNoRepositoryFound=false;
        this.showNoRepositoryFoundMessage=true;
      } 
      else
      {
        this.showNoRepositoryFound=true;
        this.showNoRepositoryFoundMessage=false;
      }
       
    }, error =>{
      console.error(error);
      this.showAnimation = false;
      this.repoList=[];
      this.repoName="";
      this.showNoRepositoryFound=false;
      this.showNoRepositoryFoundMessage=true;
    }    );
  }

   public GetReadMeFileDetails(readmeUrl: string,repoNamePara: string) {
    this.repoName=repoNamePara;
    this.showAnimation = true;
    this.readMeFileFound=false; 
    readmeUrl = readmeUrl.substring(0, (readmeUrl.length - 7)); //this is remove /{+path} from url as we are customizing to get the data for read me file. 
    console.log('string' + readmeUrl);
    this.http.get<any[]>(readmeUrl).subscribe(result => {
      result.forEach(x => {
        this.userReadMeFile = x.name.toLowerCase();         
        if (x.name.length >= 6) {
          if (this.userReadMeFile.substr(0, 6) == 'readme') {
            this.readMeFileFound=true;     
            this.GetReadMeFileContents(x.download_url)
          }
        }
      });
      this.showAnimation = false;
    }, (error: any) => {       
      this.showAnimation = false;
      if (error.status === 200) {
        this.readMeFileContents = JSON.stringify(error.error.text);       
      } else if (error.status === 400) {
        this.readMeFileContents = "";
      }
    }
    );
    ;
  }
 
  public GetReadMeFileContents(readmeUrl: string) {
    this.http.get<any[]>(readmeUrl).subscribe(result => {
      result.forEach(x => {       
        this.readMeFileContents = x.replace("/\n/g","<br />");    
       window.scrollTo(0,document.body.scrollHeight);       
      });
    }, (error: any) => {
      window.scrollTo(0,document.body.scrollHeight);
      this.showAnimation = false;
      if (error.status === 200) {
        this.readMeFileContents =JSON.stringify(error.error.text.replace("\n","<br />")); 
    
        window.scrollTo(0,document.body.scrollHeight);
      } else if (error.status === 400) {
        this.readMeFileContents = "";
        window.scrollTo(0,document.body.scrollHeight);
      }
    }
    );    
  }
}
 

