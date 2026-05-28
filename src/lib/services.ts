import type { StaticImageData } from 'next/image';
import {
  Scissors,
  Sprout,
  Trees,
  Leaf,
  Landmark,
  Grid3x3,
  Trash2,
  Wind,
  type LucideIcon,
} from 'lucide-react';
import LawnMowingImg from '../../public/images/lawn-mowing.jpg';
import HedgeTrimmingImg from '../../public/images/hedge-trimming.jpg';
import WeedControlImg from '../../public/images/weed-control.jpg';
import TreeRemovalImg from '../../public/images/tree-removal.jpg';
import LandscapingImg from '../../public/images/landscaping.jpg';
import ArtificialLawnImg from '../../public/images/artificial-lawn.jpg';
import StumpGrindingImg from '../../public/images/stump-grinding.jpg';
import GardenFoliageImg from '../../public/images/garden-foliage.jpg';

export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  image: StaticImageData;
  icon: LucideIcon;
  price: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'lawn-mowing',
    title: 'Lawn Mowing',
    description: 'Keeping your lawn neat, healthy and green.',
    image: LawnMowingImg,
    icon: Scissors,
    price: 'From $35',
  },
  {
    slug: 'hedge-trimming',
    title: 'Hedge Trimming',
    description:
      'Shaping and trimming hedges for a clean and tidy look.',
    image: HedgeTrimmingImg,
    icon: Sprout,
    price: 'From $45',
  },
  {
    slug: 'weed-control',
    title: 'Weed Control',
    description: 'Effective weed control for a weed-free garden.',
    image: WeedControlImg,
    icon: Leaf,
    price: 'From $35',
  },
  {
    slug: 'tree-removal',
    title: 'Small Tree Removal / Pruning',
    description:
      'Safe removal or pruning of small trees and overgrown branches.',
    image: TreeRemovalImg,
    icon: Trees,
    price: 'From $90',
  },
  {
    slug: 'landscaping',
    title: 'Garden Landscaping',
    description:
      'Custom landscaping solutions to enhance your outdoor space.',
    image: LandscapingImg,
    icon: Landmark,
    price: 'From $150',
  },
  {
    slug: 'artificial-lawns',
    title: 'Artificial Lawns',
    description:
      'High quality artificial lawns for a perfect green look all year round.',
    image: ArtificialLawnImg,
    icon: Grid3x3,
    price: 'From $120',
  },
  {
    slug: 'stump-grinding',
    title: 'Stump Grinding',
    description: 'Remove tree stumps quickly and safely.',
    image: StumpGrindingImg,
    icon: Wind,
    price: 'From $110',
  },
  {
    slug: 'clean-ups',
    title: 'Garden Clean-Ups',
    description: 'We clean up leaves, branches and garden waste.',
    image: GardenFoliageImg,
    icon: Trash2,
    price: 'From $80',
  },
];
