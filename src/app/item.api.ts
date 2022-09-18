
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({providedIn:'root'})
export class ItemsApi {

    private itemsUrl: string;

    constructor(private http: HttpClient){
        this.itemsUrl = "" //add backend path/url
    }

    getAllItems(){
        return this.http.get<Item[]>(`${this.itemsUrl}/all`);
    }

    addNewItem(description: any){ 
        //console.log(item, item.get("description"))
        return this.http.post<Item>(`${this.itemsUrl}/add/${description}`, null);
    }

    updateItem(item: any){
        return this.http.put<Item>(`${this.itemsUrl}/update/${item.get('id')}`, item);
    }

    deleteItem(id: Number){
        return this.http.delete<Item>(`${this.itemsUrl}/delete/${id}`);
    }
}
