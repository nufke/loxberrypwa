import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TextView } from '../text/text.view';
import { LoxBerry } from '../../providers/loxberry';
import { Control, Subcontrol, Category, Room } from '../../interfaces/datamodel'
import iro from "@jaames/iro";

@Component({
  selector: 'app-color-picker-view',
  templateUrl: 'color-picker.view.html',
  styleUrls: ['./color-picker.view.scss'],
})
export class ColorPickerView
  extends TextView
  implements OnInit {

  public ColorPicker: any;
  public colorcode: string = "";

  constructor(public LoxBerryService: LoxBerry) {
    super();
  }

  ngOnInit() {
    let ref = this;
    var ColorPicker = iro.ColorPicker("#picker",
    { width: 300, color: "#fff"})

    ColorPicker.on('color:change', function(color)
    {
       ref.colorcode = color.hexString;
    })
  }

}
