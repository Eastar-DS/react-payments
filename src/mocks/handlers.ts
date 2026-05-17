import { http, HttpResponse } from 'msw';
import { Card } from '../types';

let cards: Card[] = [];

export const handlers = [
  http.get('/cards', () => {
    return HttpResponse.json(cards);
  }),
];
