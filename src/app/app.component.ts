import { Component, OnInit } from '@angular/core';
import { ItemsApi } from './item.api';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo';

  filter : 'all'|'active'|'done' = 'all';

  private allItems: Item[] = [];

  /*
  allItems = [
    { id: 1, description: 'eat', done: true },
    { id: 2, description: 'sleep', done: false },
    { id: 3, description: 'play', done: false },
    { id: 4, description: 'laugh', done: false },
  ];
  */

  constructor(private item: ItemsApi){}

  ngOnInit(): void {
      this.item.getAllItems().subscribe(res => this.allItems = res);
  }

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  addItem(description: string) {
    this.allItems.unshift({
      id: 5,
      description,
      done: false
    });
  }

  remove(item: any) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  } 
  
  //create new item
  addNewItem(description: string){
    this.item.addNewItem(description)
     .subscribe(res => res);
  }
  
}
