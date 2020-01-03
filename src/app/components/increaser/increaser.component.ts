import { Component, OnInit, Input, Output , EventEmitter, ViewChild, ElementRef} from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styleUrls: ['./increaser.component.css']
})
export class IncreaserComponent implements OnInit {

  // Parametros de entrada
  @Input() leyend = 'Leyenda';
  @Input() percent = 50;

  // Parametro de salida
  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('txtPercent') txtPercent: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  changeValue(value: number) {
    if (this.percent >= 100) {
      this.percent = 100;
      return;
    }
    if (this.percent <= 0) {
      this.percent = 0;
      return;
    }
    this.percent = this.percent + value;

    this.valueChange.emit( this.percent );
  }


  onChange(newValue: number) {
    //const elemHtml: any = document.getElementsByName('percent')[0];
    if (newValue >= 100) {
      this.percent = 100;
    }else if ( newValue <= 0) {
      this.percent = 0;
    }else {
      this.percent = newValue;
    }

    this.txtPercent.nativeElement.value = this.percent;

    this.valueChange.emit( this.percent );
  }
}
