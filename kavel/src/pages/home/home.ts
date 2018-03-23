import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Rx';

import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  isTest:boolean = true;
  selected:string = "Monday";
  gDay: string = "Monday";
  day: string = "Monday";
  time: string = "Breakfast";
  dish: string ="";
  price: string = "";
  items:Observable<any[]>;
  BreakfastFood:Observable<any[]>;
  LunchFood:Observable<any[]>;
  DinnerFood:Observable<any[]>;
  constructor(public navCtrl: NavController, public fdb : AngularFireDatabase) {
    this.giff(this.gDay);
  }
  btnClicked(){
    this.fdb.list("cuisines/"+this.day+"/"+this.time).push({Time:this.time, Dish:this.dish, Day:this.day,Price:this.price});
    this.dish="";
    this.price="";
  }
  receiveData(){
    this.items = this.fdb.list("cuisines").snapshotChanges().map(changes=>{
      return changes.map(c=>({ key: c.payload.key, ...c.payload.val()
      }));
    });
  }
  delete(item){
    this.fdb.list("cuisines/"+item.Day+"/"+item.Time).remove(item.key);
  }
  giff(gDay){
    this.selected=gDay;
    this.BreakfastFood = this.fdb.list("cuisines/"+gDay+"/Breakfast").snapshotChanges().map(changes=>{
      return changes.map(c=>({ key: c.payload.key, ...c.payload.val()
      }));
    });
    this.LunchFood = this.fdb.list("cuisines/"+gDay+"/Lunch").snapshotChanges().map(changes=>{
      return changes.map(c=>({ key: c.payload.key, ...c.payload.val()
      }));
    });
    this.DinnerFood = this.fdb.list("cuisines/"+gDay+"/Dinner").snapshotChanges().map(changes=>{
      return changes.map(c=>({ key: c.payload.key, ...c.payload.val()
      }));
    });
  }
}
