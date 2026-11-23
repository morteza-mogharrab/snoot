import { Coffee, GraduationCap, Mountain, PartyPopper, Scissors, ShoppingBag, Sparkles, Stethoscope, Trees, Trophy, Users, Waves, HeartHandshake, Medal } from 'lucide-react';
import type { EventCategory, PlaceCategory } from '../types';

export const PLACE_META: Record<PlaceCategory, { label: string; plural: string; color: string; icon: React.ReactNode; soft: string }> = {
  park: { label: 'Park', plural: 'Parks', color: '#1FBF94', soft: 'var(--mint-soft)', icon: <Trees size={16} strokeWidth={2.4} /> },
  trail: { label: 'Trail', plural: 'Trails', color: '#16A34A', soft: 'var(--mint-soft)', icon: <Mountain size={16} strokeWidth={2.4} /> },
  beach: { label: 'Beach', plural: 'Beaches', color: '#0EA5E9', soft: 'var(--sky-soft)', icon: <Waves size={16} strokeWidth={2.4} /> },
  vet: { label: 'Vet', plural: 'Vets', color: '#FF5B4A', soft: 'var(--coral-soft)', icon: <Stethoscope size={16} strokeWidth={2.4} /> },
  store: { label: 'Pet store', plural: 'Stores', color: '#8F6BFF', soft: 'var(--lilac-soft)', icon: <ShoppingBag size={16} strokeWidth={2.4} /> },
  groomer: { label: 'Groomer', plural: 'Groomers', color: '#FF5FA8', soft: 'var(--pink-soft)', icon: <Scissors size={16} strokeWidth={2.4} /> },
  cafe: { label: 'Café', plural: 'Cafés', color: '#F59E0B', soft: 'var(--honey-soft)', icon: <Coffee size={16} strokeWidth={2.4} /> },
  trainer: { label: 'Training', plural: 'Training', color: '#4F7CFF', soft: 'var(--sky-soft)', icon: <GraduationCap size={16} strokeWidth={2.4} /> },
};

export const EVENT_META: Record<EventCategory, { label: string; color: string; icon: React.ReactNode }> = {
  meetup: { label: 'Meetup', color: '#1FBF94', icon: <Users size={14} /> },
  adoption: { label: 'Adoption', color: '#22C55E', icon: <HeartHandshake size={14} /> },
  competition: { label: 'Competition', color: '#F59E0B', icon: <Trophy size={14} /> },
  training: { label: 'Training', color: '#4F7CFF', icon: <GraduationCap size={14} /> },
  show: { label: 'Show', color: '#8F6BFF', icon: <Medal size={14} /> },
  party: { label: 'Party', color: '#FF5FA8', icon: <PartyPopper size={14} /> },
};

export const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy' }, { id: 'zoomies', emoji: '⚡️', label: 'Zoomies' }, { id: 'sleepy', emoji: '😴', label: 'Sleepy' },
  { id: 'curious', emoji: '🧐', label: 'Curious' }, { id: 'loved', emoji: '🥰', label: 'Loved' }, { id: 'grumpy', emoji: '😤', label: 'Grumpy' },
] as const;

export const STAT_LABELS: Record<string, { label: string; emoji: string; color: string }> = {
  energy: { label: 'Energy', emoji: '⚡️', color: '#FFB935' },
  cuddles: { label: 'Cuddles', emoji: '🫶', color: '#FF5FA8' },
  mischief: { label: 'Mischief', emoji: '😈', color: '#8F6BFF' },
  appetite: { label: 'Appetite', emoji: '🍖', color: '#FF5B4A' },
  social: { label: 'Social', emoji: '🐾', color: '#1FBF94' },
};

export const SparkleIcon = Sparkles;
