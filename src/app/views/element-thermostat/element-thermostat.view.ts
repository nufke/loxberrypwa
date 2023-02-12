import { Component, OnInit, Input, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ControlService } from '../../services/control.service';
import { TextVM } from '../../interfaces/view.model';

interface propTypes {
  /* Height of the thermostat (ex: 50% or 400px) */
  height: string;
  /* Width of the thermostat (ex: 50% or 400px) */
  width: string;
  /* Total number of ticks that will be rendered on the thermostat wheel */
  numTicks: number;
  /* Lowest temperature able to be displayed on the thermostat */
  minValue: number;
  /* Highest temperature able to be displayed on the thermostat */
  maxValue: number;
  /* Indicates whether or not the thermostat is in "away mode" */
  away: boolean;
  /* Indicates whether or not the thermostat is in "energy savings mode" */
  leaf: boolean;
  /* Actual temperature detected by the thermostat */
  ambientTemperature: number;
  /* Desired temperature that the thermostat attempts to reach */
  targetTemperature: number;
  /* Current state of operations within the thermostat */
  hvacMode: string;  /* 'off', 'heating', 'cooling' */
};

@Component({
  selector: 'element-thermostat-view',
  templateUrl: 'element-thermostat.view.html',
  styleUrls: ['./element-thermostat.view.scss'],
})
export class ElementThermostatView
  implements OnInit {

  @ViewChild('svg_group', { static: true }) svgGroup: ElementRef;
  @ViewChild('toucharea', { static: true }) touchArea: ElementRef;

  @Input() text_vm: TextVM;

  // TODO define ViewModel
  styles;
  ambientPosition;
  leafDef;
  radius;
  diameter;
  translate;
  tickArray;
  dial;

  ambientTemperatureStr;
  targetTemperatureStr;
  targetTemperatureDotStr;

  tickPoints;
  tickPointsAmbient;
  tickPointsTarget;
  min;
  max;
  rangeValue;
  theta;
  tickDegrees;
  offsetDegrees;
  ticksOuterRadius;
  ticksInnerRadius;

  ambientTemperature2; // TODO dummy
  targetTemperature2; // TODO dummy

  props: propTypes = {
    height: '350px',
    width: '350px',
    numTicks: 150,
    minValue: 10, //TODO C/F settings (C10, F50)
    maxValue: 30, //TODO C/F settings (C30, F86)
    away: false,
    leaf: true,
    ambientTemperature: 16.5,
    targetTemperature: 21.5,
    hvacMode: 'heating'
  };

  constructor(
    public translateService: TranslateService,
    public controlService: ControlService,
    public renderer: Renderer2
  ) {

    this.diameter = 350;
    this.radius = this.diameter / 2;
    this.rangeValue = this.props.maxValue - this.props.minValue;

    this.ticksOuterRadius = this.diameter / 30;
    this.ticksInnerRadius = this.diameter / 8;

    this.tickDegrees = 300;
    this.offsetDegrees = 180 - (360 - this.tickDegrees) / 2;
    this.theta = this.tickDegrees / this.props.numTicks;

    // Renders the degree ticks around the outside of the thermostat.
    this.tickPoints = [
      [this.radius - 1, this.ticksOuterRadius],
      [this.radius + 1, this.ticksOuterRadius],
      [this.radius + 1, this.ticksInnerRadius],
      [this.radius - 1, this.ticksInnerRadius],
    ];

    this.tickPointsTarget = [
      [this.radius - 2.5, this.ticksOuterRadius],
      [this.radius + 2.5, this.ticksOuterRadius],
      [this.radius + 2.5, this.ticksInnerRadius + 20],
      [this.radius - 2.5, this.ticksInnerRadius + 20],
    ];

    this.tickPointsAmbient = [
      [this.radius - 2.5, this.ticksOuterRadius],
      [this.radius + 2.5, this.ticksOuterRadius],
      [this.radius + 2.5, this.ticksInnerRadius],
      [this.radius - 2.5, this.ticksInnerRadius],
    ];

    // The styles change based on state.
    this.styles = this.getStyles();
  }

  ngOnInit() {
    this.init();
    this.render();
    this.touchArea.nativeElement.addEventListener('mouseup', this.dragEnd.bind(this));
    this.touchArea.nativeElement.addEventListener('mouseleave', this.dragEnd.bind(this));
    this.touchArea.nativeElement.addEventListener('touchend', this.dragEnd.bind(this));
    this.touchArea.nativeElement.addEventListener('mousemove', this.dragMove.bind(this));
    this.touchArea.nativeElement.addEventListener('touchmove', this.dragMove.bind(this));
  }

  getViewBox() {
    return '0 0 ' + this.diameter + ' ' + this.diameter;
  }

  getTransform() {
    return 'translate(' + this.translate[0] + ',' + this.translate[1] + ')';
  }

  targetTemperatureChange($event) {
    this.props.targetTemperature = this.targetTemperature2 / 2;
    this.render();
  }

  ambientTemperatureChange($event) {
    this.props.ambientTemperature = this.ambientTemperature2 / 2;
    this.render();
  }

  btnUp(ev) {
    console.log('btnUp', ev);
  }

  btnDown(ev) {
    console.log('btnDown', ev);
  }

  private getStyles() {
    return {
      svg: {
        'WebkitUserSelect': 'none',
        'MozUserSelect': 'none',
        'msUserSelect': 'none',
        'userSelect': 'none'
      },
      dial: {
        'fill': '#0a0c0d', // TODO ion-background-color bark/light
        'WebkitTransition': 'fill 0.5s',
        'transition': 'fill 0.5s',
      },
      description: {
        'fill': 'white',
        'text-anchor': 'middle',
        'text-transform': 'uppercase',
        //'font-family': 'Helvetica, sans-serif',
        'alignment-baseline': 'central',
        'font-size': '17px',
        'font-weight': 'normal',
        'visibility': (this.props.away ? 'hidden' : 'visible'),
      },
      targettemp: {
        'fill': 'white',
        'text-anchor': 'middle',
        'font-family': 'Helvetica, sans-serif',
        'alignment-baseline': 'central',
        'font-size': '100px',
        'letter-spacing': '0.01em',
        'font-weight': 'bold',
        'visibility': (this.props.away ? 'hidden' : 'visible'),
      },
      targettempdot: {
        'fill': 'white',
        'text-anchor': 'middle',
        'font-family': 'Helvetica, sans-serif',
        'alignment-baseline': 'central',
        'font-size': '40px',
        'font-weight': 'bold',
      },
      ambienttemp: {
        'fill': 'white',
        'text-anchor': 'middle',
        'font-family': 'Helvetica, sans-serif',
        'alignment-baseline': 'central',
        'font-size': '18px',
        'letter-spacing': '0.01em',
        'font-weight': 'bold',
      },
      away: {
        'fill': 'white',
        'text-anchor': 'middle',
        'font-family': 'Helvetica, sans-serif',
        'alignment-baseline': 'central',
        'font-size': '72px',
        'font-weight': 'bold',
        'opacity': (this.props.away ? '1' : '0'),
        'pointer-events': 'none',
      },
      leaf: {
        'fill': '#13EB13',
        'opacity': (this.props.leaf ? '1' : '0'),
        'visibility': (this.props.away ? 'hidden' : 'visible'),
        'WebkitTransition': 'opacity 0.5s',
        'transition': 'opacity 0.5s',
        'pointer-events': 'none',
      },
      leaf2: "fill: '#13EB13'"
    };
  }

  private pointsToPath(points) {
    return [points.map(
      (point, iPoint) => [(iPoint > 0 ? 'L' : 'M'), point[0], ' ', point[1]].join('')
    ).join(' '), 'Z'].join('');
  }

  private rotatePoint(point, angle, origin) {
    const radians = angle * Math.PI / 180;
    const x = point[0] - origin[0];
    const y = point[1] - origin[1];
    const x1 = x * Math.cos(radians) - y * Math.sin(radians) + origin[0];
    const y1 = x * Math.sin(radians) + y * Math.cos(radians) + origin[1];
    return [x1, y1];
  }

  private rotatePoints(points, angle, origin) {
    const _self = this;
    return points.map(
      (point) => _self.rotatePoint(point, angle, origin)
    );
  }

  private restrictToRange(val, min, max) {
    if (val < min) return min;
    if (val > max) return max;
    return val;
  }

  private mapLeafPoint(point, scale) {
    return isNaN(point) ? point : point * scale;
  }

  private createSVGElement(tag, attributes, appendTo) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    this.attr(element, attributes);
    if (appendTo) {
      appendTo.appendChild(element);
    }
    return element;
  }

  // Set attributes for an element
  private attr(element, attrs) {
    for (let key in attrs) {
      if (typeof attrs[key] === 'object' && attrs[key] !== null)
        this.attr(element, attrs[key]);
      else
        element.setAttribute(key, attrs[key]);
    }
  }

  private setMixMaxRange() {
    // Determine the maximum and minimum values to display.
    let actualMinValue;
    let actualMaxValue;
    if (this.props.away) {
      actualMinValue = this.props.ambientTemperature;
      actualMaxValue = actualMinValue;
    } else {
      actualMinValue = Math.min(this.props.ambientTemperature, this.props.targetTemperature);
      actualMaxValue = Math.max(this.props.ambientTemperature, this.props.targetTemperature);
    }
    this.min = this.restrictToRange(Math.round((actualMinValue - this.props.minValue)
      / this.rangeValue * this.props.numTicks), 0, this.props.numTicks - 1);
    this.max = this.restrictToRange(Math.round((actualMaxValue - this.props.minValue)
      / this.rangeValue * this.props.numTicks), 0, this.props.numTicks - 1);
  }

  private init() {
    const _self = this;
    this.setMixMaxRange();
    this.tickArray = [];

    // draw dial
    this.dial = this.createSVGElement('circle', {
      cx: this.radius,
      cy: this.radius,
      r: this.radius,
      style: this.styles.dial
    }, this.svgGroup.nativeElement);

    // draw ticks
    for (let iTick = 0; iTick < this.props.numTicks; iTick++) {
      const tickElement = this.createSVGElement('path', {
        key: ['tick-', iTick].join(''),
        d: this.pointsToPath(
          this.rotatePoints(
            this.tickPoints,
            iTick * this.theta - this.offsetDegrees,
            [this.radius, this.radius])),
        style: {
          fill: 'rgba(255, 255, 255, 0.3)'
        },
      }, this.svgGroup.nativeElement);
      this.tickArray.push(tickElement);
    }

    // Determines the positioning of the leaf, should it be displayed.
    const leafScale = this.radius / 5 / 100;
    this.leafDef = ['M', 3, 84, 'c', 24, 17, 51, 18, 73, -6, 'C', 100, 52, 100,
      22, 100, 4, 'c', -13, 15, -37, 9, -70, 19, 'C', 4, 32, 0, 63, 0, 76, 'c',
      6, -7, 18, -17, 33, -23, 24, -9, 34, -9, 48, -20, -9, 10, -20, 16, -43, 24,
      'C', 22, 63, 8, 78, 3, 84, 'z',
    ].map(
      (point) => _self.mapLeafPoint(point, leafScale)
    ).join(' ');
    this.translate = [this.radius - (leafScale * 100 * 0.5), this.radius * 1.3];
  }

  private render() {
    this.setMixMaxRange();
    this.tickArray.forEach((tick, iTick) => {
      let isMarkerTarget = (this.props.targetTemperature > this.props.ambientTemperature) ? iTick === this.max : iTick === this.min;
      let isMarkerAmbient = (this.props.targetTemperature > this.props.ambientTemperature) ? iTick === this.min : iTick === this.max;
      let isActive = iTick >= this.min && iTick <= this.max;
      this.attr(tick, {
        d: this.pointsToPath(
          this.rotatePoints(
            (isMarkerTarget || isMarkerAmbient) ? (isMarkerTarget ? this.tickPointsTarget : this.tickPointsAmbient) : this.tickPoints,
            iTick * this.theta - this.offsetDegrees,
            [this.radius, this.radius])),
        style: {
          fill: isActive ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
        },
      });
    });

    // Determines whether the ambient temperature label will be displayed
    // to the left or right of the tick range.
    const lblAmbientPosition = [
      this.radius,
      this.ticksOuterRadius - (this.ticksOuterRadius - this.ticksInnerRadius) / 2,
    ];

    const peggedValue = this.restrictToRange(
      this.props.ambientTemperature,
      this.props.minValue,
      this.props.maxValue);

    let degs = this.tickDegrees * (peggedValue - this.props.minValue) / this.rangeValue - this.offsetDegrees;

    if (peggedValue > this.props.targetTemperature) {
      degs += 8;
    } else {
      degs -= 8;
    }

    this.ambientPosition = this.rotatePoint(lblAmbientPosition, degs, [this.radius, this.radius]);

    // Update ambient and target Temperature and do rounding to 0.5
    this.ambientTemperatureStr = this.props.ambientTemperature.toFixed(1);

    this.targetTemperatureStr = String(Math.floor(this.props.targetTemperature));
    let dot = this.props.targetTemperature % 1;
    if (dot < 0.25)
      this.targetTemperatureDotStr = '';

    if (dot > 0.25 && dot < 0.75)
      this.targetTemperatureDotStr = '5';

    if (dot > 0.75) {
      this.targetTemperatureDotStr = '';
      this.targetTemperatureStr = String(Math.ceil(this.props.targetTemperature));
    }

    // Update heating / cooling dial color depending on temperatures
    if (this.props.hvacMode === 'heating' && this.props.targetTemperature > this.props.ambientTemperature) {
      console.log('heating!');
      this.attr(this.dial, {
        style: {
          fill: '#E36304'
        }
      });
    }
    else if (this.props.hvacMode === 'cooling' && this.props.targetTemperature < this.props.ambientTemperature) {
      console.log('cooling!');
      this.attr(this.dial, {
        style: {
          fill: '#007AF1'
        }
      });
    }
    else {
      console.log('normal');
      this.attr(this.dial, {
        style: {
          fill: '#0a0c0d' // TODO ion-background-color bark/light
        }
      });
    }
  }

  private eventPosition(ev) {
    let area = this.touchArea.nativeElement.getBoundingClientRect();
    let x0 = area.left + area.width / 2;
    let y0 = area.top + area.height / 2;
    if (ev.targetTouches && ev.targetTouches.length) {  //
      return [x0 - ev.targetTouches[0].clientX, y0 - ev.targetTouches[0].clientY];
    } else {
      return [x0 - ev.x, y0 - ev.y];
    };
  }

  private calcAngleDegrees(x, y) {
    let angle = Math.atan2(y, x) * 180 / Math.PI + (360 - this.tickDegrees);
    if (angle < 0) angle += 360;
    if (angle <= this.tickDegrees) {
      this.props.targetTemperature = (angle / this.tickDegrees) * (this.props.maxValue - this.props.minValue) + this.props.minValue;
      this.render();
    }
  }

  private dragEnd(ev) {
    let a = this.eventPosition(ev);
    this.calcAngleDegrees(a[0], a[1]);
  };

  private dragMove(ev) {
    ev.preventDefault();
    let a = this.eventPosition(ev);
    this.calcAngleDegrees(a[0], a[1]);
  }

}
