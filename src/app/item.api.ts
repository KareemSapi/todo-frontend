
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({providedIn:'root'})
export class ItemsApi {

    private itemsUrl: string;

    constructor(private http: HttpClient){
        this.itemsUrl = "http://localhost:8080/to-do"
    }

    getAllItems(){
        return this.http.get<Item[]>(`${this.itemsUrl}/all`);
    }

    addNewItem(description: string){
        return this.http.post<Item>(`${this.itemsUrl}/add`, description);
    }
}