import { HttpClient } from '@angular/common/http';
import { TransformVisitor } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable, of, from } from 'rxjs';
import { Arrays } from '../model/Arrays';
import { Inverter } from '../model/Inverter';
import { stringFields } from '../model/stringFields';
import { BindingDataService } from '../services/binding-data.service';
import { GlobalConstants } from '../services/GlobalConstants';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { NumberModule } from '../model/numberModule';
import { componant } from '../model/componant';
import { ItemComponant } from '../model/ItemComponant';
export interface config {
  create;
  index;
  value;
  stringIndex;
  branch;
}

@Component({
  selector: 'app-arrays',
  templateUrl: './arrays.component.html',
  styleUrls: ['./arrays.component.css']
})

export class ArraysComponent extends GlobalConstants implements OnInit {
  listInverter: Inverter[] = []
  listString: stringFields[] = []
  arraysString: stringFields[][] = []
  arrays: Arrays = new Arrays();

  modules = ["10", "20 ", "30", "40", "50", "60", "70", "80", "90", "100"]
  branch = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

  inverterModel = ["10", "20 ", "30", "40", "50", "60", "70", "80", "90", "100"]
  strings = ["12", "20 ", "30", "40", "50"]
  i = -1;
  inverters = ["inv 207", " inv 20 ", " inv 30", "inv 40", "inv 50", "inv 60", "inv 70", "inv 80", "inv 90", "inv 100"]
  searchTerm$ = new Subject<config>();

  constructor(private binding: BindingDataService) {
    super();
    this.waitBeforeAddString(this.searchTerm$)
      .subscribe(results => {
      });
    this.searchTerm$.next();
  }
  ngOnInit(): void {
    GlobalConstants.listComponant = [];
    this.arrays.inverter = this.listInverter;

    this.binding.getForm(12).subscribe(data => {
      if (data) {
        this.arrays = data;
        console.log(data)
      }


    });


  }
  /*
  * Check if the value has changed then wait 200ms to add a new string
  
  * This method was created to add sting after 200 milliseconds after entering
  a value in the String field because events (change and key up, keyPressed ...) 
  cannot take action to wait for the user to enter the values
  
  */
  waitBeforeAddString(terms: Observable<config>) {
    console.log(terms)
    return terms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(
        term => this.addString(term)
      )
    );
  }

  //add and Update the initial inverter   
  initList(create, valueSelected?, index?) {

    if (this.arrays.deviceRef == "3" || this.arrays.deviceRef == "4") {

      if (create && valueSelected != undefined && valueSelected != -1) {
        //update the value and create the next inverter
        this.arrays.inverter.push(new Inverter());

        this.arrays.inverter[index].name = valueSelected;
      } else if (create && valueSelected != -1) {
        //create the first inverter
        var inv = new Inverter();
        inv.stringFields[0] = new stringFields(0);
        this.arrays.inverter.push(inv);
      } else if (valueSelected == -1) {
        //When the inverter menu contains a null value, all string of fields will be removed
        this.cleanInverter(index)
      }
    } else {
      this.arrays.numberModule.push(new NumberModule());
    }
  }
  //add and Update the strings fields 
  addString(term: config): Observable<string> {

    if (term && term.create != undefined) {
      var stringField = this.arrays.inverter[term.index].stringFields;

      if (term.create) {
        //Add an empty field  
        if (term.stringIndex != undefined)
          stringField[term.stringIndex].value = term.value;

        stringField.push(new stringFields(""))
      }
      else {
        //Update the value of the string field

        if (term.value != undefined && term.value.length != 0) {

          stringField[term.stringIndex].value = term.value;

        }
        else {
          //When the field is cleaned it is removed

          var deleteCount = (stringField.length - 1) - term.stringIndex;

          this.arrays.inverter[term.index].stringFields.splice(term.stringIndex, deleteCount);
        }
      }
    }
    return new Observable();
  }
  cleanInverter(index) {
    this.arrays.inverter.splice(index);

  }

  /*
  Module number part 
  */


  addModule(item: config) {
    console.log(item);
    this.arrays.numberModule[item.index].number = item.value;

    if (item && item.create) {

      this.arrays.numberModule.push(new NumberModule());
    }

  }

  setBranchValueByIndex(barnch, index) {
    this.arrays.numberModule[index].branch = barnch;
  }
  //Save the array entity and remove the last empty string  save() 
  save() {
    if ((this.arrays.deviceRef == '3' || this.arrays.deviceRef == '4') && this.arrays.inverter[this.arrays.inverter.length - 1].name == "")

      this.arrays.inverter.length = this.arrays.inverter.length - 1;

    this.arrays.inverter.forEach((value, key) => {
      this.arrays.inverter[key].stringFields.pop();
    });


    this.binding.save(this.arrays).subscribe(data => { });
  }
  AddComponant(type) {
    GlobalConstants.listComponant.find(key => { key.TypeSegment == "deviceType" })
    if (type == "ac")
      GlobalConstants.listComponant.push(ItemComponant.jbox);
    else if (type == "sy")

      GlobalConstants.listComponant.push(ItemComponant.pmeter);

    console.log(GlobalConstants.listComponant);
  }
}
