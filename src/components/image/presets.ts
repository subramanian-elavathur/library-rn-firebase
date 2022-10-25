import HP_1 from '../../../assets/hp1.jpg';
import HP_2 from '../../../assets/hp2.jpg';
import HP_3 from '../../../assets/hp3.jpg';
import HP_4 from '../../../assets/hp4.png';
import HP_5 from '../../../assets/hp5.jpg';
import HP_6 from '../../../assets/hp6.png';
import HP_7 from '../../../assets/hp7.jpg';
import {ImageSourcePropType} from 'react-native';

export interface Preset {
  id: Presets;
  source: ImageSourcePropType;
}

export enum Presets {
  HP1 = 'hp-1',
  HP2 = 'hp-2',
  HP3 = 'hp-3',
  HP4 = 'hp-4',
  HP5 = 'hp-5',
  HP6 = 'hp-6',
  HP7 = 'hp-7',
}

export const PRESETS: Record<Presets, Preset> = {
  [Presets.HP1]: {
    id: Presets.HP1,
    source: HP_1,
  },
  [Presets.HP2]: {
    id: Presets.HP2,
    source: HP_2,
  },
  [Presets.HP3]: {
    id: Presets.HP3,
    source: HP_3,
  },
  [Presets.HP4]: {
    id: Presets.HP4,
    source: HP_4,
  },
  [Presets.HP5]: {
    id: Presets.HP5,
    source: HP_5,
  },
  [Presets.HP6]: {
    id: Presets.HP6,
    source: HP_6,
  },
  [Presets.HP7]: {
    id: Presets.HP7,
    source: HP_7,
  },
};
