export type BeautyTips = {
  id: number;
  title: string;
  image: string;
  description: string;
};

type ListBeautyTips = BeautyTips[];

export const listBeautyTips: ListBeautyTips = [
  {
    id: 1,
    title: 'Cách chăm sóc da mặt hàng ngày với 8 bước cơ bản',
    image: '@assets/images/beautyTips1.jpg',
    description: '123',
  },
];
