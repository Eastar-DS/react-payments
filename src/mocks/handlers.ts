import { http, HttpResponse } from 'msw';
interface Card {
  id: string;
  issuerCode: string;
  number: string;
  expirationDate: string;
}

let cards: Card[] = [];

export const handlers = [
  http.get('/cards', () => {
    return HttpResponse.json(cards);
  }),
];
