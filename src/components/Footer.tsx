export default function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© {new Date().getFullYear()} Malika Choubri. Tous droits réservés.</p>
    </footer>
  );
}

import type { CSSProperties } from 'react';

const styles: { footer: CSSProperties } = {
  footer: {
    textAlign: 'center',
    padding: '1rem',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    marginTop: 'auto',
  },
};
