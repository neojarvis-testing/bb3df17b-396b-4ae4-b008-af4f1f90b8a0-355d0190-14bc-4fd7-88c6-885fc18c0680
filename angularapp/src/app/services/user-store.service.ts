import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  authUser: { userId: string };
  constructor() {
    
this.authUser = {
    userId: localStorage.getItem('userId') || '' 
};
  
   }
}
