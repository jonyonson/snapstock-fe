import React from 'react';
import Container from '../Layout/Container';
import { STRINGS } from '../../config/constants';
import './Footer.scss';

function Footer() {
  return (
    <div className="Footer">
      <Container>
        <div className="Footer-container">
          <div>
            <a
              href={STRINGS.URL.PRIVACY_POLICY}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
          </div>
          <div>
            <span>
              Market data provided by{' '}
              <a href={STRINGS.URL.IEX_CLOUD}>IEX Cloud</a>
            </span>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
