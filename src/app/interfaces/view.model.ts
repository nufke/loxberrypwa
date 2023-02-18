import { Control, Subcontrol, Room, Category } from './data.model';

/**
 * View Models used for Components to store UI specific properties and states
 */

export interface CategoryListVM {
  categories: Category[];
  categories_list: Category[];
  categories_favs: Category[];
}

export interface RoomListVM {
  rooms: Room[];
  rooms_list: Room[];
  rooms_favs: Room[];
}

export interface ControlListVM {
  controls: Control[];
  favorites: Control[];
  labels?: Room[] | Category[];
  page?: Room | Category | { name: string };
}

export interface ColorPickerVM {
  control: Control;
  subcontrol: Subcontrol;
  rgb: {
    r: number;
    g: number;
    b: number;
  }
  position: number;
}

export interface DimmerVM {
  control: Control;
  subcontrol: Subcontrol;
  ui: {
    name: string;
    btn_color: string;
    slider: {
      position: number;
      min: number;
      max: number;
      step: number;
      color: string;
    }
  }
  rgb?: number[];
}

export interface RadioListItem {
  id: number;
  name: string;
}

export interface RadioVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    radio_list: RadioListItem[];
    selected_id: number;
    icon?: {
      temp_base: string;
      temp_dec: string
    }
    status: {
      text: string;
      color: string;
    }
    toggle?: boolean;
  }
  subcontrols?: Subcontrol[];
}

export interface IRCVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    temp_target: number,
    temp_actual: number,
    mode_list: RadioListItem[];
    mode: number;
    preset_list: RadioListItem[];
    preset: number;
    icon: {
      temp_base: string;
      temp_dec: string
    }
    status: {
      text: string;
      color: string;
    }
  }
}

export interface SliderVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    slider:  {
      position: number;
    }
    status: {
      text: string;
      color: string;
    }
  }
}

export interface SwitchVM {
  control: Control;
  subcontrol: Subcontrol;
  ui: {
    name: string;
    status: {
      text: string;
      color: string;
    }
    toggle: boolean;
  }
}

export interface TextVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    icon?: {
      temp_base: string;
      temp_dec: string
    }
    status: {
      text: string;
      color: string;
    }
  }
}

export interface AlarmVM {
  control: Control;
  ui: {
    name: string;
    room: string;
    category: string;
    icon?: {
      temp_base: string;
      temp_dec: string
    }
    status: {
      text: string;
      color: string;
    }
    button: {
      armedTxt: string;
    }
    armed: boolean;
  }
}