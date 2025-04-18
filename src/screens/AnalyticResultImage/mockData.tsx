export enum SeverityType {
  Light,
  Medium,
  Heavy,
  VeryHeavy,
}

export type AcneType = {
  name: string;
  info: string;
  id: string;
  count?: number;
  severity?: SeverityType;
  conclusion?: string;
  suggest?: string[];
};

export const descriptionAcne: AcneType[] = [
  {
    name: 'acne.acne_scars',
    info: 'acne.descAcneScars',
    conclusion: 'acne.consolutionAcneScars',
    id: 'acne_scars',
    severity: SeverityType.VeryHeavy,
    suggest: [
      'acne.suggestAcneScars1',
      'acne.suggestAcneScars2',
      'acne.suggestAcneScars3',
      'acne.suggestAcneScars4',
      'acne.suggestAcneScars5',
    ],
  },
  {
    name: 'acne.blackhead',
    info: 'acne.descBlackhead',
    conclusion: 'acne.consolutionBlackhead',
    severity: SeverityType.Light,
    id: 'blackhead',
    suggest: [
      'acne.suggestBlackhead1',
      'acne.suggestBlackhead2',
      'acne.suggestBlackhead3',
    ],
  },
  {
    name: 'acne.cystic',
    info: 'acne.descCystic',
    conclusion: 'acne.consolutionCystic',
    severity: SeverityType.VeryHeavy,
    id: 'cystic',
    suggest: [
      'acne.suggestCystic1',
      'acne.suggestCystic2',
      'acne.suggestCystic3',
    ],
  },
  {
    name: 'acne.flat_wart',
    info: 'acne.descFlatWart',
    conclusion: 'acne.consolutionFlatWart',
    severity: SeverityType.Medium,
    id: 'flat_wart',
    suggest: [
      'acne.suggestFlatWart1',
      'acne.suggestFlatWart2',
      'acne.suggestFlatWart3',
    ],
  },
  {
    name: 'acne.folliculitis',
    info: 'acne.descFolliculitis',
    conclusion: 'acne.consolutionFolliculitis',
    id: 'folliculitis',
    severity: SeverityType.Medium,
    suggest: [
      'acne.suggestFolliculitis1',
      'acne.suggestFolliculitis2',
      'acne.suggestFolliculitis3',
    ],
  },
  {
    name: 'acne.keloid',
    info: 'acne.descKeloid',
    conclusion: 'acne.consolutionKeloid',
    severity: SeverityType.Heavy,
    id: 'keloid',
    suggest: [
      'acne.suggestKeloid1',
      'acne.suggestKeloid2',
      'acne.suggestKeloid3',
    ],
  },
  {
    name: 'acne.milium',
    info: 'acne.descMilium',
    id: 'milium',
    conclusion: 'acne.consolutionMilium',
    severity: SeverityType.Light,
    suggest: [
      'acne.suggestMilium1',
      'acne.suggestMilium2',
      'acne.suggestMilium3',
    ],
  },
  {
    name: 'acne.papular',
    info: 'acne.descPapular',
    id: 'papular',
    conclusion: 'acne.consolutionPapular',
    severity: SeverityType.Medium,
    suggest: [
      'acne.suggestPapular1',
      'acne.suggestPapular2',
      'acne.suggestPapular3',
    ],
  },
  {
    name: 'acne.purulent',
    info: 'acne.descPurulent',
    conclusion: 'acne.consolutionPurulent',
    id: 'purulent',
    severity: SeverityType.Heavy,
    suggest: [
      'acne.suggestPurulent1',
      'acne.suggestPurulent2',
      'acne.suggestPurulent3',
    ],
  },
  {
    name: 'acne.sebo-crystan-conglo',
    info: 'acne.descSeboCrystanConglo',
    conclusion: 'acne.consolutionSeboCrystanConglo',
    id: 'sebo-crystan-conglo',
    severity: SeverityType.Heavy,
    suggest: [
      'acne.suggestSeboCrystanConglo1',
      'acne.suggestSeboCrystanConglo2',
      'acne.suggestSeboCrystanConglo3',
    ],
  },
  {
    name: 'acne.syringoma',
    info: 'acne.descSyringoma',
    conclusion: 'acne.consolutionSyringoma',
    id: 'syringoma',
    severity: SeverityType.Light,
    suggest: ['acne.suggestSyringoma1', 'acne.suggestSyringoma2'],
  },
  {
    name: 'acne.whitehead',
    info: 'acne.descWhitehead',
    conclusion: 'acne.consolutionWhitehead',
    id: 'whitehead',
    severity: SeverityType.Light,
    suggest: [
      'acne.suggestWhitehead1',
      'acne.suggestWhitehead2',
      'acne.suggestWhitehead3',
    ],
  },
];
