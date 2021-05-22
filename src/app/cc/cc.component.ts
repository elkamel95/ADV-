import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../services/GlobalConstants';

@Component({
  selector: 'app-cc',
  templateUrl: './cc.component.html',
  styleUrls: ['./cc.component.css']
})
export class CcComponent extends GlobalConstants implements OnInit {

  constructor( ) {
    super();
  }

  ngOnInit(): void {
    console.log(GlobalConstants.listComponant);
 
  }
get listComponant ()
{return GlobalConstants.listComponant}
}
