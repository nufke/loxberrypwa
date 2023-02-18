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

  @ViewChild('thermostat', { static: true }) thermostat: ElementRef;

  @Input() text_vm: TextVM;

  // TODO define ViewModel
  styles;
  ambientPosition;
  radius;
  diameter;
  translate;
  interval;

  ambientTemperatureStr = '';
  targetTemperatureStr = '';
  targetTemperatureDotStr = '';

  ticks = {
    points: [],
    pointsAmbient: [],
    pointsTarget: [],
    min: null,
    max: null,
    rangeValue: null,
    theta: null,
    degrees: null,
    offsetDegrees: null,
    outerRadius: null,
    innerRadius: null
  }

  svg = {
    root: null,
    group: null,
    dial: null,
    tickArray: [],
    ring: null,
    touchArea: null,
    txtState: null,
    txtSetTo: null,
    txtTargetTemp: null,
    txtTargetTempDot: null,
    txtAmbientTemp: null,
    leaf: null,
    txtAway: null,
    iconUp: null,
    iconDown: null,
    btnUp: null,
    btnDown: null
  }

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
    this.ticks.rangeValue = this.props.maxValue - this.props.minValue;

    this.ticks.outerRadius = this.diameter / 30;
    this.ticks.innerRadius = this.diameter / 8;

    this.ticks.degrees = 300;
    this.ticks.offsetDegrees = 180 - (360 - this.ticks.degrees) / 2;
    this.ticks.theta = this.ticks.degrees / this.props.numTicks;

    // Renders the degree ticks around the outside of the thermostat.
    this.ticks.points = [
      [this.radius - 1, this.ticks.outerRadius],
      [this.radius + 1, this.ticks.outerRadius],
      [this.radius + 1, this.ticks.innerRadius],
      [this.radius - 1, this.ticks.innerRadius],
    ];

    this.ticks.pointsTarget = [
      [this.radius - 2.5, this.ticks.outerRadius],
      [this.radius + 2.5, this.ticks.outerRadius],
      [this.radius + 2.5, this.ticks.innerRadius + 20],
      [this.radius - 2.5, this.ticks.innerRadius + 20],
    ];

    this.ticks.pointsAmbient = [
      [this.radius - 2.5, this.ticks.outerRadius],
      [this.radius + 2.5, this.ticks.outerRadius],
      [this.radius + 2.5, this.ticks.innerRadius],
      [this.radius - 2.5, this.ticks.innerRadius],
    ];

    // The styles change based on state.
    this.styles = this.getStyles();
  }

  ngOnInit() {
    this.init();
    this.render();

    // Add event listeners for temperate scolling
    this.svg.touchArea.addEventListener('mouseup', this.dragEnd.bind(this));
    this.svg.touchArea.addEventListener('mousedown', this.dragEnd.bind(this));
    this.svg.touchArea.addEventListener('mouseleave', this.dragEnd.bind(this));
    this.svg.touchArea.addEventListener('click', this.dragEnd.bind(this));
    this.svg.touchArea.addEventListener('touchend', this.dragEnd.bind(this));
    this.svg.touchArea.addEventListener('mousemove', this.dragMove.bind(this));
    this.svg.touchArea.addEventListener('touchmove', this.dragMove.bind(this));
    this.svg.touchArea.addEventListener('touchmove', this.dragMove.bind(this));

    // Add event listeners for buttons
    this.svg.btnDown.addEventListener('click', this.btnDown.bind(this));
    this.svg.btnDown.addEventListener('touchstart', this.btnDownStart.bind(this));
    this.svg.btnDown.addEventListener('touchend', this.btnDownEnd.bind(this));
    this.svg.btnUp.addEventListener('click', this.btnUp.bind(this));
    this.svg.btnUp.addEventListener('touchstart', this.btnUpStart.bind(this));
    this.svg.btnUp.addEventListener('touchend', this.btnUpEnd.bind(this));
  }

  btnUp($event) {
    this.props.targetTemperature += 0.5;
    if (this.props.targetTemperature > this.props.maxValue)
      this.props.targetTemperature = this.props.maxValue;
    this.render();
  }

  btnDown($event) {
    this.props.targetTemperature -= 0.5;
    if (this.props.targetTemperature < this.props.minValue)
      this.props.targetTemperature = this.props.minValue;
    this.render();
  }

  btnDownStart($event) {
    this.interval = setInterval(() => {
      this.btnDown($event)
      this.render();
    }, 80);
  }

  btnUpStart($event) {
    this.interval = setInterval(() => {
      this.btnUp($event)
      this.render();
    }, 80);
  }

  btnDownEnd($event) {
    clearInterval(this.interval);
  }

  btnUpEnd($event) {
    clearInterval(this.interval);
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
      ring: {
        'fill': 'transparent',
        'stroke': 'rgba(255, 255, 255, 0.1)',
        'stroke-width': '40',
      },
      description: {
        'fill': 'white',
        'text-anchor': 'middle',
        'font-family': 'Helvetica, sans-serif',
        'alignment-baseline': 'central',
        'font-size': '14px',
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
      }
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

  private createSVGTextElement(text, attributes, appendTo) {
    let element = this.createSVGElement('text', attributes, appendTo);
    element.appendChild(document.createTextNode(text));
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
    this.ticks.min= this.restrictToRange(Math.round((actualMinValue - this.props.minValue)
      / this.ticks.rangeValue * this.props.numTicks), 0, this.props.numTicks - 1);
    this.ticks.max= this.restrictToRange(Math.round((actualMaxValue - this.props.minValue)
      / this.ticks.rangeValue * this.props.numTicks), 0, this.props.numTicks - 1);
  }

  private init() {
    const _self = this;
    this.setMixMaxRange();
    this.svg.tickArray = [];

    // draw svg root component
    this.svg.root = this.createSVGElement('svg', {
      width: this.props.width,
      height: this.props.height,
      viewBox: '0 0 ' + this.diameter + ' ' + this.diameter,
      style: this.styles.svg,
    }, this.thermostat.nativeElement);

    // draw dial
    this.svg.dial = this.createSVGElement('circle', {
      cx: this.radius,
      cy: this.radius,
      r: this.radius,
      style: this.styles.dial
    }, this.svg.root);

    // draw svg group
    this.svg.group = this.createSVGElement('g', {
    }, this.svg.root);

    // draw ticks
    for (let iTick = 0; iTick < this.props.numTicks; iTick++) {
      const tickElement = this.createSVGElement('path', {
        key: ['tick-', iTick].join(''),
        d: this.pointsToPath(
          this.rotatePoints(
            this.ticks.points,
            iTick * this.ticks.theta - this.ticks.offsetDegrees,
            [this.radius, this.radius])),
        style: {
          fill: 'rgba(255, 255, 255, 0.3)'
        },
      }, this.svg.group);
      this.svg.tickArray.push(tickElement);
    }

    // draw ring
    this.svg.ring = this.createSVGElement('circle', {
      cx: this.radius,
      cy: this.radius,
      r: this.radius * 0.842,
      style: this.styles.ring
    }, this.svg.root);

    // draw toucharea
    this.svg.touchArea = this.createSVGElement('circle', {
      cx: this.radius,
      cy: this.radius,
      r: this.radius,
      style: {
        fill: 'transparent'
      },
    }, this.svg.root);

    // draw text 'heating' or 'cooling'
    this.svg.txtState = this.createSVGTextElement(this.props.hvacMode.toUpperCase(), {
      x: this.radius,
      y: this.radius - this.radius / 2.2,
      style: this.styles.description,
    }, this.svg.root);

    // draw text 'set to'
    this.svg.txtSetTo = this.createSVGTextElement(('set to').toUpperCase(), {
      x: this.radius,
      y: this.radius - this.radius / 3,
      style: this.styles.description,
    }, this.svg.root);

    // draw text targetTemperature
    this.svg.txtTargetTemp = this.createSVGTextElement(this.targetTemperatureStr, {
      x: this.radius,
      y: this.radius,
      style: this.styles.targettemp,
    }, this.svg.root);

    // draw text targetTemperature dot
    this.svg.txtTargetTempDot = this.createSVGTextElement(this.targetTemperatureDotStr, {
      x: this.radius + this.radius / 2.5,
      y: this.radius - this.radius / 8.5,
      style: this.styles.targettempdot,
    }, this.svg.root);

    // draw text ambientTemperature
    this.svg.txtAmbientTemp = this.createSVGTextElement(this.ambientTemperatureStr, {
      x: (this.ambientPosition && this.ambientPosition[0]) ? this.ambientPosition[0] : '',
      y: (this.ambientPosition && this.ambientPosition[1]) ? this.ambientPosition[1] : '',
      style: this.styles.ambienttemp,
    }, this.svg.root);

    // draw text 'AWAY'
    this.svg.txtAway = this.createSVGTextElement('AWAY', {
      x: this.radius,
      y: this.radius,
      style: this.styles.away,
    }, this.svg.root);

    // Determines the positioning of the leaf, should it be displayed.
    const leafScale = this.radius / 5 / 100;
    let leafSVG = ['M', 3, 84, 'c', 24, 17, 51, 18, 73, -6, 'C', 100, 52, 100,
      22, 100, 4, 'c', -13, 15, -37, 9, -70, 19, 'C', 4, 32, 0, 63, 0, 76, 'c',
      6, -7, 18, -17, 33, -23, 24, -9, 34, -9, 48, -20, -9, 10, -20, 16, -43, 24,
      'C', 22, 63, 8, 78, 3, 84, 'z',
    ].map(
      (point) => _self.mapLeafPoint(point, leafScale)
    ).join(' ');

    this.translate = [this.radius - (leafScale * 100 * 0.5), this.radius * 1.3];

    // draw leaf
    this.svg.leaf = this.createSVGElement('path', {
      d: leafSVG,
      style: this.styles.leaf,
      transform: 'translate(' + this.translate[0] + ',' + this.translate[1] + ')'
    }, this.svg.root);

    // draw icon down
    this.svg.iconDown = this.createSVGElement('path', {
      d: 'M 7 12 l 9 9 9-9',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '3',
      'stroke': '#fff',
      'fill': 'transparent',
      transform: 'translate(125, 299)'
    }, this.svg.root);

    // draw icon up
    this.svg.iconUp = this.createSVGElement('path', {
      d: 'M 7 12 l 9-9 9 9',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      'stroke-width': '3',
      'stroke': '#fff',
      'fill': 'transparent',
      transform: 'translate(200, 307)'
    }, this.svg.root);

    // draw invisible area for button down
    this.svg.btnDown = this.createSVGElement('circle', {
      cx: 140,
      cy: 315,
      r: 30,
      style: {
        fill: 'transparent'
      }
    }, this.svg.root);

    // draw invisible area for button up
    this.svg.btnUp = this.createSVGElement('circle', {
      cx: 215,
      cy: 315,
      r: 30,
      style: {
        fill: 'transparent'
      }
    }, this.svg.root);
  }

  private render() {
    this.setMixMaxRange();
    this.svg.tickArray.forEach((tick, iTick) => {
      let isMarkerTarget = (this.props.targetTemperature > this.props.ambientTemperature) ? iTick === this.ticks.max: iTick === this.ticks.min;
      let isMarkerAmbient = (this.props.targetTemperature > this.props.ambientTemperature) ? iTick === this.ticks.min: iTick === this.ticks.max;
      let isActive = iTick >= this.ticks.min&& iTick <= this.ticks.max;
      this.attr(tick, {
        d: this.pointsToPath(
          this.rotatePoints(
            (isMarkerTarget || isMarkerAmbient) ? (isMarkerTarget ? this.ticks.pointsTarget : this.ticks.pointsAmbient) : this.ticks.points,
            iTick * this.ticks.theta - this.ticks.offsetDegrees,
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
      this.ticks.outerRadius - (this.ticks.outerRadius - this.ticks.innerRadius) / 2,
    ];

    const peggedValue = this.restrictToRange(
      this.props.ambientTemperature,
      this.props.minValue,
      this.props.maxValue);

    let degs = this.ticks.degrees * (peggedValue - this.props.minValue) / this.ticks.rangeValue - this.ticks.offsetDegrees;

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

    // render target and ambient temperature
    this.svg.txtTargetTemp.textContent = this.targetTemperatureStr;
    this.svg.txtTargetTempDot.textContent = this.targetTemperatureDotStr;
    this.svg.txtAmbientTemp.textContent = this.ambientTemperatureStr;

    this.attr(this.svg.txtAmbientTemp, {
      x: (this.ambientPosition && this.ambientPosition[0]) ? this.ambientPosition[0] : '',
      y: (this.ambientPosition && this.ambientPosition[1]) ? this.ambientPosition[1] : '',
      style: this.styles.ambienttemp,
    });

    // align .5 temperature notation with base temperature
    let textArea = this.getTextSize(this.svg.txtTargetTemp);
    this.attr(this.svg.txtTargetTempDot, {
      x: 175 + textArea.width / 2 + 12, // TODO variables for coordinates
      y: 175 - textArea.height / 2 + 39 // TODO variables for coordinates
    });

    // Update heating / cooling dial color depending on temperatures
    if (this.props.hvacMode === 'heating' && this.props.targetTemperature > this.props.ambientTemperature) {
      this.attr(this.svg.dial, {
        style: {
          fill: '#E36304'
        }
      });
    }
    else if (this.props.hvacMode === 'cooling' && this.props.targetTemperature < this.props.ambientTemperature) {
      this.attr(this.svg.dial, {
        style: {
          fill: '#007AF1'
        }
      });
    }
    else {
      this.attr(this.svg.dial, {
        style: {
          fill: '#0a0c0d' // TODO ion-background-color bark/light
        }
      });
    }
  }

  private eventPosition(ev) {
    let area = this.svg.touchArea.getBoundingClientRect();
    let x0 = area.left + area.width / 2;
    let y0 = area.top + area.height / 2;
    if (ev.targetTouches && ev.targetTouches.length) {  //
      return [x0 - ev.targetTouches[0].clientX, y0 - ev.targetTouches[0].clientY];
    } else {
      return [x0 - ev.x, y0 - ev.y];
    };
  }

  private calcAngleDegrees(x, y) {
    let angle = Math.atan2(y, x) * 180 / Math.PI + (360 - this.ticks.degrees);
    if (angle < 0) angle += 360;
    if (angle <= this.ticks.degrees) {
      this.props.targetTemperature = (angle / this.ticks.degrees) * (this.props.maxValue - this.props.minValue) + this.props.minValue;
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

  getSVGTextSize(str: string, style) {
    let element = this.createSVGTextElement(str, style, document.body);
    let bbox = element.getBBox();
    element.parentNode.removeChild(element);
    return bbox;
  }

  // workaround to compute text box before DOM rendering
  getTextSize(element) {
    const clonedElt = element.cloneNode(true)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.appendChild(clonedElt);
    document.body.appendChild(svg);
    const { x, y, width, height } = clonedElt.getBBox();
    document.body.removeChild(svg);
    return { x, y, width, height };
  }

}
