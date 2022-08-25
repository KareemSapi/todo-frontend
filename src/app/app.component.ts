import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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

  itemsForm!: FormGroup;

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

      this.itemsForm = new FormGroup({
        description: new FormControl("", {validators: [Validators.required]})
      });
  }

  get description(){return this.itemsForm.get('description')}

  get items() {
    if (this.filter === 'all') {
      return this.allItems;
    }
    return this.allItems.filter((item) => this.filter === 'done' ? item.done : !item.done);
  }

  /*
  addItem(description: string) {
    this.allItems.unshift({
      id: 5,
      description,
      done: false
    });
  }
  */

  remove(item: any) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  } 
  
  //create new item
  addNewItem(){

    if(this.itemsForm.invalid){
      return;
    }

    const postData = new FormData();
    postData.append("description", this.itemsForm.value.description);

    const data  = JSON.stringify({
      description: this.itemsForm.value.description
    });

    this.item.addNewItem(this.itemsForm.value.description)
     .subscribe(res => {
      if(!res){
        setTimeout(() => {
          return "Something went wrong! Try again later."
        }, 3000);
      }else{
        this.itemsForm.reset();
      }
     });
  }
  
}
