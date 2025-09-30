import type { Debt } from './types';

const ROOT_URL = 'https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/';

export const getTopDebts = async (): Promise<Debt[]> => {
  const response = await fetch(`${ROOT_URL}/GetTopDebts`);

  const data = await response.json();

  return data;
};

export const getFilteredDebts = async (query: string): Promise<Debt[]> => {
  const response = await fetch(`${ROOT_URL}/GetFilteredDebts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phrase: query,
    }),
  });

  if (!response.ok) {
    if (response.status === 405) {
      throw new Error('Wymagane conajmniej 3 znaki w szukanym kryterium');
    } else {
      throw new Error('Wystąpił błąd');
    }
  }

  const data = await response.json();

  return data;
};
