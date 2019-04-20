import React from 'react';

import { Container, Button } from './styles';

export default function Pagination({
  page = 1, lastPage = 1, total = 1, changePage,
}) {
  return (
    <Container>
      <Button onClick={() => changePage('prev')} disabled={page === 1} left>
        Anterior
      </Button>
      <span>{`Página ${page} de ${lastPage}`}</span>
      <Button onClick={() => changePage('next')} disabled={page === lastPage} right>
        Próxima
      </Button>
    </Container>
  );
}
