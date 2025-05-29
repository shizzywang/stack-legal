import { Link } from 'react-router-dom';

export default function Legal() {
  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif', lineHeight: 1.6, color: '#333', maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #eee', paddingBottom: 10 }}>Legal Documents</h1>
      <p>Welcome to Stack Productivity's legal documentation. Please review our terms and policies below.</p>
      <div style={{ marginTop: 30 }}>
        <Link to="/legal/terms" style={docLinkStyle} className="doc-link">
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: 5 }}>Terms of Service</div>
          <div style={{ color: '#666', fontSize: '0.9em' }}>Effective Date: 8th May 2025</div>
        </Link>
        <Link to="/legal/privacy" style={docLinkStyle} className="doc-link">
          <div style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: 5 }}>Privacy Policy</div>
          <div style={{ color: '#666', fontSize: '0.9em' }}>Effective Date: 8th May 2025</div>
        </Link>
      </div>
    </div>
  );
}

const docLinkStyle = {
  display: 'block',
  padding: 20,
  marginBottom: 20,
  backgroundColor: '#f8f9fa',
  borderRadius: 5,
  textDecoration: 'none',
  color: '#2c3e50',
  transition: 'background-color 0.2s',
}; 